import { useState } from 'react';
import { Star, Copy, RotateCcw, Check } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './Sidebar.module.css';
import { MODES } from '../../constants/modes';

export function SavedItem({ item, onToggleFavorite, onLoadItem, onClose }) {
  const mode = MODES[item.modeId] || { title: 'Desconhecido' };
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.savedItem}>
      <div className={styles.savedHeader}>
        <span className={styles.savedMode}>{mode.title}</span>
        <div className={styles.savedActions}>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(item); }}
            className={clsx(styles.actionBtn, item.isFavorite && styles.isFavorite)}
          >
            <Star size={14} fill={item.isFavorite ? "currentColor" : "none"} />
          </button>
          <button onClick={handleCopy} className={styles.actionBtn}>
            {copied ? <Check size={14} className={styles.successIcon} /> : <Copy size={14} />}
          </button>
          <button
            onClick={() => {
              onLoadItem(item);
              if (onClose) onClose();
            }}
            className={styles.actionBtn}
            title="Restaurar Campos"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
      <p className={styles.savedPrompt}>{item.prompt}</p>
      <span className={styles.savedTime}>
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}
