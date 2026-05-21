import styles from '../../TikTokCollections.module.css';

export const NotesTextarea = ({ value, onChange }) => {
  return (
    <div className={styles.controlGroup}>
      <label htmlFor="notesInput">Observações ou Refinamentos Específicos</label>
      <textarea
        id="notesInput"
        className={styles.textareaField}
        placeholder="Ex: Adicionar uma uva roxa sarcástica nos slides 2 e 4. Garantir iluminação dramática no final..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
