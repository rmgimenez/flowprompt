import styles from '../../TikTokCollections.module.css';

export const PortugueseToggle = ({ checked, onChange }) => {
  return (
    <label className={styles.toggleRow} htmlFor="portugueseTextToggle">
      <input
        id="portugueseTextToggle"
        type="checkbox"
        className={styles.toggleInput}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={styles.toggleSwitch}></div>
      <div className={styles.toggleLabelText}>
        <span className={styles.toggleLabelTitle}>Forçar Texto das Imagens em Português</span>
        <span className={styles.toggleLabelDesc}>Caso as imagens contenham letreiros, placas ou camisas, força o texto em PT-BR.</span>
      </div>
    </label>
  );
};
