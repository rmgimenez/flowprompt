import styles from '../../TikTokCollections.module.css';

export const QuantityStepper = ({ quantity, onChange }) => {
  return (
    <div className={styles.controlGroup}>
      <label>Quantidade de Slides (Sequência de Imagens)</label>
      <div className={styles.quantityPicker}>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => onChange(Math.max(1, quantity - 1))}
          title="Diminuir slides"
          disabled={quantity <= 1}
        >
          -
        </button>
        <div className={styles.qtyDisplay}>
          <span className={styles.qtyVal}>{quantity}</span>
          <span className={styles.qtyLabel}>{quantity === 1 ? 'imagem' : 'imagens'}</span>
        </div>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => onChange(Math.min(20, quantity + 1))}
          title="Aumentar slides"
          disabled={quantity >= 20}
        >
          +
        </button>
      </div>
    </div>
  );
};
