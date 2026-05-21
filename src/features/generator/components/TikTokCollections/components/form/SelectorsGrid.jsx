import SearchableSelect from '../../../../../../components/ui/SearchableSelect';
import {
  STYLE_PRESETS,
  COLOR_PRESETS,
  VIBE_PRESETS,
  TARGET_PRESETS
} from '../../constants/constants';
import styles from '../../TikTokCollections.module.css';

export const SelectorsGrid = ({
  selectedStyle,
  onStyleChange,
  selectedColors,
  onColorsChange,
  selectedVibe,
  onVibeChange,
  selectedTarget,
  onTargetChange
}) => {
  return (
    <>
      <div className={styles.selectorsGrid}>
        <div className={styles.controlGroup}>
          <label htmlFor="styleSelect">Estilo Principal (Fórmula Nano)</label>
          <SearchableSelect
            options={STYLE_PRESETS.map(p => ({ label: p.label, value: p.id, category: p.category, emoji: p.emoji, desc: p.desc }))}
            value={selectedStyle}
            onChange={onStyleChange}
            placeholder="Selecione um estilo..."
            className={styles.selectField}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="colorSelect">Paleta de Cores (Diretriz Visual)</label>
          <SearchableSelect
            options={COLOR_PRESETS.map(p => ({ label: p.label, value: p.id, category: p.category, desc: p.value }))}
            value={selectedColors}
            onChange={onColorsChange}
            placeholder="Selecione uma paleta..."
            className={styles.selectField}
          />
        </div>
      </div>

      <div className={styles.selectorsGrid}>
        <div className={styles.controlGroup}>
          <label htmlFor="vibeSelect">Tom / Vibe do Post</label>
          <SearchableSelect
            options={VIBE_PRESETS.map(p => ({ label: p.label, value: p.id, category: p.category, desc: p.desc }))}
            value={selectedVibe}
            onChange={onVibeChange}
            placeholder="Selecione um tom..."
            className={styles.selectField}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="targetSelect">Público-Alvo (Cópia/Roteiro)</label>
          <SearchableSelect
            options={TARGET_PRESETS.map(p => ({ label: p.label, value: p.id, category: p.category, emoji: p.emoji, desc: p.desc }))}
            value={selectedTarget}
            onChange={onTargetChange}
            placeholder="Selecione um público..."
            className={styles.selectField}
          />
        </div>
      </div>
    </>
  );
};
