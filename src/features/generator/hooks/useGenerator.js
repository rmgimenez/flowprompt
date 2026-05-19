import { useState, useMemo, useEffect, useCallback } from 'react';
import { MODES } from '../constants/modes';

const HISTORY_LIMIT = 20;

export const useGenerator = (initialMode = 'video-new') => {
  const [currentModeId, setCurrentModeId] = useState(initialMode);
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

  const currentMode = useMemo(() => MODES[currentModeId], [currentModeId]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('flowprompt_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('flowprompt_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Reset form when mode changes (unless we are loading a saved item)
  useEffect(() => {
    // We only want to auto-reset if the formValues is currently empty or contains keys not in the new mode
    // To simplify, we'll keep the existing logic but allow loadSavedItem to override it
    if (Object.keys(formValues).length === 0) {
      const initialValues = {};
      if (currentMode.fields) {
        currentMode.fields.forEach(field => {
          initialValues[field.id] = '';
        });
      }
      setFormValues(initialValues);
    }
  }, [currentModeId, currentMode.fields]);

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
      modeId: currentModeId,
      timestamp: new Date().toISOString(),
      values: { ...formValues },
      prompt: generatedPrompt
    };

    setHistory(prev => {
      // Avoid duplicate consecutive entries
      if (prev.length > 0 && prev[0].prompt === newItem.prompt) return prev;
      return [newItem, ...prev].slice(0, HISTORY_LIMIT);
    });
  }, [currentModeId, formValues, generatedPrompt]);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.prompt === item.prompt);
      if (exists) {
        return prev.filter(f => f.prompt !== item.prompt);
      }
      return [{ ...item, id: Date.now(), isFavorite: true }, ...prev];
    });
  };

  const loadSavedItem = (item) => {
    setCurrentModeId(item.modeId);
    setFormValues(item.values);
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

  return {
    currentMode,
    currentModeId,
    setCurrentModeId,
    formValues,
    updateField,
    addSuggestion,
    generatedPrompt,
    // New exports
    history,
    favorites,
    addToHistory,
    toggleFavorite,
    loadSavedItem,
    randomize,
    clearFields
  };
};
