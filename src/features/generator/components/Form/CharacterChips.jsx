import styles from './PromptForm.module.css';

function insertAtCursor(fieldId, insertStr, onUpdate, values) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  const text = values[fieldId] || '';
  const start = field.selectionStart || 0;
  const end = field.selectionEnd || 0;
  const newText = text.substring(0, start) + insertStr + text.substring(end);
  onUpdate(fieldId, newText);

  setTimeout(() => {
    field.focus();
    const newPos = start + insertStr.length;
    field.setSelectionRange(newPos, newPos);
  }, 50);
}

export function CharacterChips({ fieldId, characters, onUpdate, values }) {
  if (!characters || characters.length === 0) return null;

  const filteredChars = characters.filter(c => c.name);
  if (filteredChars.length === 0) return null;

  if (fieldId === 'dialogue') {
    return (
      <div className={styles.dialogueShortcuts}>
        <span className={styles.shortcutLabel}>Atalhos rápidos de Fala:</span>
        <div className={styles.shortcutChips}>
          {filteredChars.map((char) => (
            <button
              key={char.name}
              type="button"
              className={styles.shortcutChip}
              onClick={() => {
                const insertStr = `[${char.name}] (excited): []`;
                insertAtCursor(fieldId, insertStr, onUpdate, values);
              }}
              title={`Inserir fala de [${char.name}] no cursor`}
            >
              💬 {char.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dialogueShortcuts}>
      <span className={styles.shortcutLabel}>Inserir Personagem:</span>
      <div className={styles.shortcutChips}>
        {filteredChars.map((char) => (
          <span key={char.name} className={styles.shortcutGroup}>
            <button
              type="button"
              className={styles.shortcutChip}
              onClick={() => {
                insertAtCursor(fieldId, char.name, onUpdate, values);
              }}
              title={`Inserir nome [${char.name}] no cursor`}
            >
              👤 {char.name}
            </button>
            <button
              type="button"
              className={`${styles.shortcutChip} ${styles.shortcutChipSecondary}`}
              onClick={() => {
                const desc = `${char.appearance || ''}${char.clothing ? `, wearing ${char.clothing}` : ''}`;
                insertAtCursor(fieldId, desc, onUpdate, values);
              }}
              title={`Inserir descrição completa de [${char.name}] no cursor`}
            >
              📝 Descrição
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
