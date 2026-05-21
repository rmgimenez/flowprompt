import { useState, useMemo, useCallback } from 'react';
import { MODES } from '../constants/modes';
import { MOTIVATIONAL_SCENES, BOOK_QUOTES } from '../constants/templates';

export function useFormState(externalModeId) {
  const [formValues, setFormValues] = useState({});

  const currentMode = useMemo(() => MODES[externalModeId], [externalModeId]);

  const initialValues = useMemo(() => {
    if (!currentMode.fields) return {};
    const values = {};
    currentMode.fields.forEach(field => {
      values[field.id] = '';
    });
    return values;
  }, [currentMode.fields]);

  const effectiveValues = Object.keys(formValues).length === 0
    ? initialValues
    : formValues;

  const updateField = useCallback((id, value) => {
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

  const addSuggestion = useCallback((id, suggestion) => {
    setFormValues(prev => {
      const currentVal = prev[id] || '';
      const newVal = currentVal === ''
        ? suggestion
        : currentVal.toLowerCase().includes(suggestion.toLowerCase())
          ? currentVal
          : `${currentVal}, ${suggestion}`;
      return { ...prev, [id]: newVal };
    });
  }, []);

  const generatedPrompt = useMemo(() => {
    if (currentMode.isAbout || !currentMode.formula || !currentMode.fields) return '';

    const displayValues = {};
    currentMode.fields.forEach(field => {
      const val = effectiveValues[field.id];
      if (typeof val === 'string') {
        displayValues[field.id] = val.trim() || `<<< ${field.label} >>>`;
      } else if (field.type === 'characters-table') {
        displayValues[field.id] = Array.isArray(val) ? val : [];
      } else {
        displayValues[field.id] = `<<< ${field.label} >>>`;
      }
    });

    return currentMode.formula(displayValues);
  }, [currentMode, effectiveValues]);

  const randomize = useCallback(() => {
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
  }, [currentMode.fields]);

  const clearFields = useCallback(() => {
    setFormValues({});
  }, []);

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
  }, [currentMode.fields]);

  return {
    currentMode,
    formValues: effectiveValues,
    setFormValues,
    updateField,
    addSuggestion,
    generatedPrompt,
    randomize,
    clearFields,
    applyPreset
  };
}
