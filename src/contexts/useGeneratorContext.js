import { useContext } from 'react';
import { GeneratorContext } from './GeneratorContext';

export function useGeneratorContext() {
  const ctx = useContext(GeneratorContext);
  if (!ctx) {
    throw new Error('useGeneratorContext must be used within GeneratorProvider');
  }
  return ctx;
}
