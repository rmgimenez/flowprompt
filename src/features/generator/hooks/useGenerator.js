import { useState, useMemo, useEffect, useCallback } from 'react';
import { MODES } from '../constants/modes';
import { MOTIVATIONAL_SCENES, BOOK_QUOTES } from '../constants/templates';

const HISTORY_LIMIT = 20;

export const useGenerator = (externalModeId = 'tiktok-collections') => {
  const [formValues, setFormValues] = useState({});

  // Persistence States
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('flowprompt_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('flowprompt_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const currentMode = useMemo(() => MODES[externalModeId], [externalModeId]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('flowprompt_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('flowprompt_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Reset form when mode changes (unless we are loading a saved item)
  useEffect(() => {
    if (Object.keys(formValues).length === 0) {
      const initialValues = {};
      if (currentMode.fields) {
        currentMode.fields.forEach(field => {
          initialValues[field.id] = '';
        });
      }
      const timer = setTimeout(() => {
        setFormValues(initialValues);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [externalModeId, currentMode.fields, formValues]);

  const updateField = (id, value) => {
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const addSuggestion = (id, suggestion) => {
    const currentVal = formValues[id] || '';
    const newVal = currentVal === '' 
      ? suggestion 
      : currentVal.toLowerCase().includes(suggestion.toLowerCase())
        ? currentVal
        : `${currentVal}, ${suggestion}`;
    
    updateField(id, newVal);
  };

  const generatedPrompt = useMemo(() => {
    if (currentMode.isAbout || !currentMode.formula || !currentMode.fields) return '';
    
    const displayValues = {};
    currentMode.fields.forEach(field => {
      const val = formValues[field.id];
      if (typeof val === 'string') {
        displayValues[field.id] = val.trim() || `<<< ${field.label} >>>`;
      } else if (field.type === 'characters-table') {
        displayValues[field.id] = Array.isArray(val) ? val : [];
      } else {
        displayValues[field.id] = `<<< ${field.label} >>>`;
      }
    });
    
    return currentMode.formula(displayValues);
  }, [currentMode, formValues]);

  // Persistence Actions
  const addToHistory = useCallback(() => {
    if (!generatedPrompt || generatedPrompt.includes('<<<')) return;
    
    const newItem = {
      id: Date.now(),
      modeId: externalModeId,
      timestamp: new Date().toISOString(),
      values: { ...formValues },
      prompt: generatedPrompt
    };

    setHistory(prev => {
      if (prev.length > 0 && prev[0].prompt === newItem.prompt) return prev;
      return [newItem, ...prev].slice(0, HISTORY_LIMIT);
    });
  }, [externalModeId, formValues, generatedPrompt]);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.prompt === item.prompt);
      if (exists) {
        return prev.filter(f => f.prompt !== item.prompt);
      }
      return [{ ...item, id: Date.now(), isFavorite: true }, ...prev];
    });
  };

  const randomize = () => {
    if (!currentMode.fields) return;
    
    const randomValues = {};
    currentMode.fields.forEach(field => {
      if (field.suggestions && field.suggestions.length > 0) {
        const randomSug = field.suggestions[Math.floor(Math.random() * field.suggestions.length)];
        randomValues[field.id] = randomSug.value;
      } else {
        randomValues[field.id] = '';
      }
    });
    setFormValues(randomValues);
  };

  const clearFields = () => {
    if (!currentMode.fields) return;
    const initialValues = {};
    currentMode.fields.forEach(field => {
      initialValues[field.id] = '';
    });
    setFormValues(initialValues);
  };

  const applyPreset = useCallback((preset) => {
    if (!preset || !preset.fields) return;
    
    let fieldsToApply = { ...preset.fields };

    if (preset.name === 'Motivacional (Apenas Imagem)') {
      const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_SCENES.length);
      fieldsToApply = MOTIVATIONAL_SCENES[randomIndex];
    } else if (preset.name === 'Citação de Livro Motivacional') {
      const randomIndex = Math.floor(Math.random() * BOOK_QUOTES.length);
      const chosenQuote = BOOK_QUOTES[randomIndex];
      fieldsToApply = {
        subject: chosenQuote.subject,
        action: chosenQuote.action,
        context: chosenQuote.context,
        composition: chosenQuote.composition,
        style: chosenQuote.style
      };
    }

    const newValues = {};
    if (currentMode.fields) {
      currentMode.fields.forEach(field => {
        newValues[field.id] = field.type === 'characters-table' ? [] : '';
      });
    }
    Object.entries(fieldsToApply).forEach(([key, val]) => {
      newValues[key] = val;
    });
    setFormValues(newValues);
  }, [currentMode]);

  return {
    currentMode,
    formValues,
    setFormValues,
    updateField,
    addSuggestion,
    generatedPrompt,
    history,
    favorites,
    addToHistory,
    toggleFavorite,
    randomize,
    clearFields,
    applyPreset
  };
};
