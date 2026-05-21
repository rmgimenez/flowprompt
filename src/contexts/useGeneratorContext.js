import { useContext } from 'react';
import { FormContext } from './FormContext';
import { PersistenceContext } from './PersistenceContext';

export function useGeneratorContext() {
  const formCtx = useContext(FormContext);
  const persistenceCtx = useContext(PersistenceContext);

  if (!formCtx || !persistenceCtx) {
    throw new Error('useGeneratorContext must be used within GeneratorProvider');
  }

  return {
    ...formCtx,
    ...persistenceCtx
  };
}

export function useModeContext() {
  const formCtx = useContext(FormContext);
  if (!formCtx) {
    throw new Error('useModeContext must be used within GeneratorProvider');
  }
  return {
    currentMode: formCtx.currentMode,
    currentModeId: formCtx.currentModeId
  };
}
