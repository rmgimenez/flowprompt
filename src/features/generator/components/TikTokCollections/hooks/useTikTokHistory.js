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
      id: crypto.randomUUID(),
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
      isFromAI: !!data.aiPrompt,
      analytics: null
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

  const updateAnalytics = useCallback((id, analyticsData) => {
    setHistory(prev => {
      const newHistory = prev.map(item =>
        item.id === id ? { ...item, analytics: analyticsData } : item
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Erro ao atualizar analytics:', error);
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

  const getAnalyticsSummary = useCallback(() => {
    const withAnalytics = history.filter(h => h.analytics);
    if (withAnalytics.length === 0) return null;

    const totalViews = withAnalytics.reduce((s, h) => s + (h.analytics.views || 0), 0);
    const totalLikes = withAnalytics.reduce((s, h) => s + (h.analytics.likes || 0), 0);
    const totalComments = withAnalytics.reduce((s, h) => s + (h.analytics.comments || 0), 0);
    const totalShares = withAnalytics.reduce((s, h) => s + (h.analytics.shares || 0), 0);
    const totalSaves = withAnalytics.reduce((s, h) => s + (h.analytics.saves || 0), 0);

    const sorted = [...withAnalytics].sort((a, b) => (b.analytics?.views || 0) - (a.analytics?.views || 0));
    const topPost = sorted[0];

    return {
      totalPosted: withAnalytics.length,
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      totalSaves,
      topPost
    };
  }, [history]);

  return {
    history,
    saveToHistory,
    updateAnalytics,
    clearHistory,
    deleteHistoryItem,
    loadFromHistory,
    getAnalyticsSummary
  };
};
