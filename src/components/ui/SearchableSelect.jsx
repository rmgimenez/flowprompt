import { useState, useRef, useEffect, useMemo } from 'react';
import { clsx } from 'clsx';
import styles from './SearchableSelect.module.css';

const SearchableSelect = ({
  options = [],
  value,
  onChange,
  placeholder = 'Selecione...',
  label,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const selectedLabel = useMemo(() => {
    const selected = options.find(opt => opt.value === value);
    return selected ? selected.label : '';
  }, [value, options]);

  const groupedOptions = useMemo(() => {
    if (!options.length) return {};

    const filtered = searchText
      ? options.filter(opt =>
          opt.label.toLowerCase().includes(searchText.toLowerCase())
        )
      : options;

    const grouped = {};
    filtered.forEach(opt => {
      const cat = opt.category || 'Geral';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(opt);
    });
    return grouped;
  }, [options, searchText]);

  const hasOptions = Object.keys(groupedOptions).length > 0;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchText('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    setSearchText('');
    setIsOpen(false);
    onChange(opt.value);
  };

  return (
    <div className={clsx(styles.wrapper, className)} ref={wrapperRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={isOpen ? searchText : selectedLabel}
          onFocus={() => {
            setIsOpen(true);
            setSearchText('');
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              setSearchText('');
            }
          }}
          autoComplete="off"
        />
        <span className={clsx(styles.arrow, isOpen && styles.arrowOpen)}>▾</span>
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {hasOptions ? (
            Object.entries(groupedOptions).map(([category, items]) => (
              <div key={category}>
                <div className={styles.categoryLabel}>{category}</div>
                {items.map(opt => (
                  <div
                    key={opt.value}
                    className={clsx(styles.option, opt.value === value && styles.selectedOption)}
                    onClick={() => handleSelect(opt)}
                    title={opt.desc || opt.label}
                  >
                    {opt.emoji && <span className={styles.emoji}>{opt.emoji}</span>}
                    <span className={styles.optionLabel}>{opt.label}</span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className={styles.noResults}>Nenhum resultado encontrado</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
