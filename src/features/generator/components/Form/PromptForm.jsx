import React from 'react';
import styles from './PromptForm.module.css';
import { clsx } from 'clsx';

const PromptForm = ({ fields, values, onUpdate, onAddSuggestion }) => {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      {fields.map((field) => (
        <div key={field.id} className={styles.fieldGroup}>
          <label htmlFor={field.id} className={styles.label}>
            {field.label}
          </label>
          
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
            <input
              id={field.id}
              type="text"
              className={styles.input}
              placeholder={field.placeholder}
              value={values[field.id] || ''}
              onChange={(e) => onUpdate(field.id, e.target.value)}
            />
          )}

          {field.suggestions && (
            <div className={styles.suggestions}>
              {field.suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  className={styles.chip}
                  onClick={() => onAddSuggestion(field.id, sug)}
                >
                  {sug}
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
