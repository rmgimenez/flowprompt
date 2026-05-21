import { createContext, useContext } from 'react';

export const PersistenceContext = createContext(null);

export function usePersistenceContext() {
  const ctx = useContext(PersistenceContext);
  if (!ctx) {
    throw new Error('usePersistenceContext must be used within GeneratorProvider');
  }
  return ctx;
}
