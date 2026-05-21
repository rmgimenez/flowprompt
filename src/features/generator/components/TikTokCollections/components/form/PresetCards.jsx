import { Sparkles } from 'lucide-react';
import { COLLECTION_PRESETS } from '../../constants/constants';
import styles from '../../TikTokCollections.module.css';

export const PresetCards = ({ activePresetId, onSelect }) => {
  return (
    <div className={styles.presetsSection}>
      <span className={styles.presetsSectionLabel}>
        <Sparkles size={14} style={{ color: '#ec4899' }} />
        Combos de Alta Conversão (Preenchimento Rápido)
      </span>
      <div className={styles.presetsGrid}>
        {COLLECTION_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`${styles.presetCard} ${activePresetId === preset.id ? styles.presetCardActive : ''}`}
            onClick={() => onSelect(preset)}
            title={`Clique para aplicar as configurações recomendadas para ${preset.label}`}
          >
            <span className={styles.presetCardEmoji}>{preset.emoji}</span>
            <div className={styles.presetCardContent}>
              <span className={styles.presetCardLabel}>{preset.label}</span>
              <span className={styles.presetCardDesc}>{preset.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
