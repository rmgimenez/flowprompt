import { useState, useEffect, useCallback } from 'react';

const HISTORY_LIMIT = 20;

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function usePersistence() {
  const [history, setHistory] = useState(() =>
    loadFromStorage('flowprompt_history', [])
  );

  const [favorites, setFavorites] = useState(() =>
    loadFromStorage('flowprompt_favorites', [])
  );

  useEffect(() => {
    localStorage.setItem('flowprompt_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('flowprompt_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const pushHistory = useCallback((newItem) => {
    if (!newItem || !newItem.prompt || newItem.prompt.includes('<<<')) return;

    setHistory(prev => {
      if (prev.length > 0 && prev[0].prompt === newItem.prompt) return prev;
      return [newItem, ...prev].slice(0, HISTORY_LIMIT);
    });
  }, []);

  const toggleFavorite = useCallback((item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.prompt === item.prompt);
      if (exists) {
        return prev.filter(f => f.prompt !== item.prompt);
      }
      return [{ ...item, id: Date.now(), isFavorite: true }, ...prev];
    });
  }, []);

  return {
    history,
    favorites,
    pushHistory,
    toggleFavorite
  };
}
