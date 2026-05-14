import React, { useMemo } from 'react';
import styles from './PromptForm.module.css';
import { Wand2, Eraser } from 'lucide-react';
import { clsx } from 'clsx';

const PromptForm = ({ fields, values, onUpdate, onAddSuggestion, onRandomize, onClear }) => {
  // Memoize random suggestions so they don't change while typing
  const displaySuggestions = useMemo(() => {
    const map = {};
    fields.forEach(field => {
      if (field.suggestions) {
        if (field.type !== 'textarea') {
          // Pick 3 random suggestions for datalist fields
          map[field.id] = [...field.suggestions]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        } else {
          // Show all for textareas (or we could limit them too, but instruction specifies datalist fields)
          map[field.id] = field.suggestions;
        }
      }
    });
    return map;
  }, [fields]);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.formHeader}>
        <h4 className={styles.formTitle}>Parâmetros do Modelo</h4>
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.clearBtn}
            onClick={onClear}
            title="Limpar todos os campos"
          >
            <Eraser size={14} />
            <span>Limpar</span>
          </button>
          <button 
            type="button" 
            className={styles.randomBtn}
            onClick={onRandomize}
            title="Preencher campos aleatoriamente"
          >
            <Wand2 size={14} />
            <span>Surpreenda-me</span>
          </button>
        </div>
      </div>
      
      {fields.map((field) => (
        <div key={field.id} className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label htmlFor={field.id} className={styles.label}>
              {field.label}
            </label>
            {field.hint && <span className={styles.hint}>{field.hint}</span>}
          </div>
          
          {field.type === 'textarea' ? (
            <textarea
              id={field.id}
              className={styles.textarea}
              placeholder={field.placeholder}
              value={values[field.id] || ''}
              onChange={(e) => onUpdate(field.id, e.target.value)}
              rows={3}
            />
          ) : (
            <>
              <input
                id={field.id}
                type="text"
                className={styles.input}
                placeholder={field.placeholder}
                value={values[field.id] || ''}
                onChange={(e) => onUpdate(field.id, e.target.value)}
                list={`list-${field.id}`}
              />
              {field.suggestions && (
                <datalist id={`list-${field.id}`}>
                  {field.suggestions.map((sug) => (
                    <option key={sug.value} value={sug.value}>
                      {sug.label}
                    </option>
                  ))}
                </datalist>
              )}
            </>
          )}

          {field.suggestions && (
            <div className={styles.suggestions}>
              {(displaySuggestions[field.id] || field.suggestions).map((sug) => (
                <button
                  key={sug.value}
                  type="button"
                  className={styles.chip}
                  onClick={() => onAddSuggestion(field.id, sug.value)}
                  title={sug.value}
                >
                  {sug.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </form>
  );
};

export default PromptForm;
