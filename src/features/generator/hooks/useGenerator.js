import { useState, useMemo, useEffect } from 'react';
import { MODES } from '../constants/modes';

export const useGenerator = (initialMode = 'video-new') => {
  const [currentModeId, setCurrentModeId] = useState(initialMode);
  const [formValues, setFormValues] = useState({});

  const currentMode = useMemo(() => MODES[currentModeId], [currentModeId]);

  // Reset form when mode changes
  useEffect(() => {
    const initialValues = {};
    if (currentMode.fields) {
      currentMode.fields.forEach(field => {
        initialValues[field.id] = '';
      });
    }
    setFormValues(initialValues);
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
    if (currentMode.isAbout || !currentMode.formula) return '';
    
    const displayValues = {};
    currentMode.fields.forEach(field => {
      displayValues[field.id] = formValues[field.id]?.trim() || `[${field.label}]`;
    });
    
    return currentMode.formula(displayValues);
  }, [currentMode, formValues]);

  return {
    currentMode,
    currentModeId,
    setCurrentModeId,
    formValues,
    updateField,
    addSuggestion,
    generatedPrompt
  };
};
