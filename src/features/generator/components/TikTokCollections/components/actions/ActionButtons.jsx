import { RotateCcw, Shuffle } from 'lucide-react';
import styles from '../../TikTokCollections.module.css';

export const ActionButtons = ({ onClear, onRandomize }) => {
  return (
    <div className={styles.actionButtonsRow}>
      <button
        type="button"
        className={styles.resetBtn}
        onClick={onClear}
        title="Resetar todos os campos"
      >
        <RotateCcw size={16} />
        Limpar Campos
      </button>
      <button
        type="button"
        className={styles.randBtn}
        onClick={onRandomize}
        title="Gerar sugestões criativas"
      >
        <Shuffle size={16} />
        Idéia Aleatória
      </button>
    </div>
  );
};
