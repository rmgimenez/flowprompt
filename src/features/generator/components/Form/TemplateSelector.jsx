import { useMemo } from 'react';
import { LayoutTemplate } from 'lucide-react';
import { TEMPLATES } from '../../constants/templates';
import styles from './TemplateSelector.module.css';

const TemplateSelector = ({ currentModeId, onSelectTemplate }) => {
  // Load templates from the curated library with fallback resolutions
  const availablePresets = useMemo(() => {
    if (TEMPLATES[currentModeId]) {
      return TEMPLATES[currentModeId];
    }
    // Fallbacks for similar modes
    if (currentModeId?.startsWith('video-')) {
      return TEMPLATES['video-new'];
    }
    if (currentModeId?.startsWith('photo-')) {
      return TEMPLATES['photo-new'];
    }
    return null;
  }, [currentModeId]);

  if (!availablePresets || availablePresets.length === 0) return null;

  return (
    <div className={styles.presetsContainer}>
      <div className={styles.presetsHeader}>
        <div className={styles.headerTitleGroup}>
          <LayoutTemplate size={16} className={styles.presetsIcon} />
          <span className={styles.presetsLabel}>Biblioteca de Templates Curados</span>
        </div>
        <span className={styles.presetsBadge}>Offline Mode</span>
      </div>
      <div className={styles.presetsGrid}>
        {availablePresets.map((preset) => (
          <button
            key={preset.name}
            type="button"
            className={styles.presetBtn}
            onClick={() => onSelectTemplate(preset)}
            title={preset.desc}
          >
            <div className={styles.presetIconBg}>
              <span className={styles.presetEmoji}>{preset.emoji}</span>
            </div>
            <div className={styles.presetTextContainer}>
              <span className={styles.presetName}>{preset.name}</span>
              <span className={styles.presetDesc}>{preset.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
