import { Sparkles } from 'lucide-react';
import styles from '../../TikTokCollections.module.css';

export const ThemeInput = ({ theme, onChange, onRandom }) => {
  return (
    <div className={styles.controlGroup}>
      <label htmlFor="themeInput">
        Tema Principal do Post
        <span>* Obrigatório</span>
      </label>
      <div className={styles.themeInputContainer}>
        <input
          id="themeInput"
          type="text"
          className={styles.inputFieldTheme}
          placeholder="Ex: Legumes bombados na academia, Capivaras cyberpunk..."
          value={theme}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className={styles.themeMagicBtn}
          onClick={onRandom}
          title="Gerar Tema Aleatório Incrível"
        >
          <Sparkles size={16} />
        </button>
      </div>
    </div>
  );
};
