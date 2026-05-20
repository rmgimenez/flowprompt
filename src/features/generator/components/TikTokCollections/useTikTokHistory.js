import { useState, useCallback } from 'react';

const STORAGE_KEY = 'tiktok_collections_history';
const MAX_HISTORY_ITEMS = 50;

const loadInitialHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
  }
  return [];
};

export const useTikTokHistory = () => {
  const [history, setHistory] = useState(loadInitialHistory);

  const saveToHistory = useCallback((data) => {
    const historyItem = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      theme: data.theme,
      quantity: data.quantity,
      selectedStyle: data.selectedStyle,
      selectedVibe: data.selectedVibe,
      selectedColors: data.selectedColors,
      selectedTarget: data.selectedTarget,
      notes: data.notes,
      portugueseText: data.portugueseText,
      generatedPrompt: data.generatedPrompt,
      aiPrompt: data.aiPrompt || null,
      isFromAI: !!data.aiPrompt
    };

    setHistory(prev => {
      const newHistory = [historyItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Erro ao salvar histórico:', error);
      }
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  }, []);

  const deleteHistoryItem = useCallback((id) => {
    setHistory(prev => {
      const newHistory = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Erro ao deletar item:', error);
      }
      return newHistory;
    });
  }, []);

  const loadFromHistory = useCallback((item) => {
    return {
      theme: item.theme,
      quantity: item.quantity,
      selectedStyle: item.selectedStyle,
      selectedVibe: item.selectedVibe,
      selectedColors: item.selectedColors,
      selectedTarget: item.selectedTarget,
      notes: item.notes,
      portugueseText: item.portugueseText
    };
  }, []);

  return {
    history,
    saveToHistory,
    clearHistory,
    deleteHistoryItem,
    loadFromHistory
  };
};