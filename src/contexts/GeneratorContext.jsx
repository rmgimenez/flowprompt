import { createContext, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGenerator } from '../features/generator/hooks/useGenerator';

// eslint-disable-next-line react-refresh/only-export-components
export const GeneratorContext = createContext(null);



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

  return (
    <GeneratorContext.Provider value={{
      ...generator,
      currentModeId: modeId,
      loadSavedItem,
      handleModeChange,
    }}>
      {children}
    </GeneratorContext.Provider>
  );
}
