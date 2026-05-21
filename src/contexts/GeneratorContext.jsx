import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGenerator } from '../features/generator/hooks/useGenerator';
import { FormContext } from './FormContext';
import { PersistenceContext } from './PersistenceContext';

export function GeneratorProvider({ modeId, children }) {
  const navigate = useNavigate();
  const generator = useGenerator(modeId);
  const pendingValuesRef = useRef(null);
  const prevModeRef = useRef(modeId);

  const { setFormValues, currentMode } = generator;

  useEffect(() => {
    if (pendingValuesRef.current && modeId !== prevModeRef.current) {
      const savedValues = pendingValuesRef.current;
      pendingValuesRef.current = null;

      const merged = {};
      if (currentMode.fields) {
        currentMode.fields.forEach(f => {
          merged[f.id] = savedValues[f.id] !== undefined ? savedValues[f.id] : '';
        });
      }
      setFormValues(merged);
    }
    prevModeRef.current = modeId;
  }, [modeId, currentMode.fields, setFormValues]);

  const loadSavedItem = useCallback((item) => {
    pendingValuesRef.current = item.values;
    navigate(`/${item.modeId}`);
  }, [navigate]);

  const handleModeChange = useCallback((id) => {
    navigate(`/${id}`);
  }, [navigate]);

  const {
    formValues,
    updateField,
    addSuggestion,
    generatedPrompt,
    randomize,
    clearFields,
    applyPreset,
    history,
    favorites,
    addToHistory,
    toggleFavorite,
    currentMode: mode
  } = generator;

  const formContextValue = {
    currentMode: mode,
    currentModeId: modeId,
    formValues,
    setFormValues,
    updateField,
    addSuggestion,
    generatedPrompt,
    randomize,
    clearFields,
    applyPreset,
    addToHistory
  };

  const persistenceContextValue = {
    history,
    favorites,
    toggleFavorite,
    loadSavedItem,
    handleModeChange
  };

  return (
    <PersistenceContext.Provider value={persistenceContextValue}>
      <FormContext.Provider value={formContextValue}>
        {children}
      </FormContext.Provider>
    </PersistenceContext.Provider>
  );
}
