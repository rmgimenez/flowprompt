import { useMemo, useCallback } from 'react';
import { useFormState } from './useFormState';
import { usePersistence } from './usePersistence';

export const useGenerator = (externalModeId = 'tiktok-collections') => {
  const formState = useFormState(externalModeId);
  const persistence = usePersistence();

  const {
    currentMode,
    formValues,
    setFormValues,
    updateField,
    addSuggestion,
    generatedPrompt,
    randomize,
    clearFields,
    applyPreset
  } = formState;

  const {
    history,
    favorites,
    pushHistory,
    toggleFavorite
  } = persistence;

  const addToHistory = useCallback(() => {
    if (!generatedPrompt || generatedPrompt.includes('<<<')) return;

    const newItem = {
      id: Date.now(),
      modeId: externalModeId,
      timestamp: new Date().toISOString(),
      values: { ...formValues },
      prompt: generatedPrompt
    };

    pushHistory(newItem);
  }, [externalModeId, formValues, generatedPrompt, pushHistory]);

  const value = useMemo(() => ({
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
  }), [
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
  ]);

  return value;
};
