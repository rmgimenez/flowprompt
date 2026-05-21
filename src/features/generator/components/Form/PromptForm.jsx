import { useMemo, useState } from 'react';
import styles from './PromptForm.module.css';
import { Wand2, Eraser, Settings, Camera, User, HelpCircle, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import TemplateSelector from './TemplateSelector';
import SearchableSelect from '../../../../components/ui/SearchableSelect';
import { CharacterChips } from './CharacterChips';
import { VideoQuickPrompts, RestorePromptButton } from './AuxiliaryPrompts';

const TAB_ICONS = {
  style: Camera,
  characters: User,
  motion: Activity,
  help: HelpCircle
};

function pickSuggestions(suggestions, count) {
  if (!suggestions || suggestions.length <= count) return suggestions || [];
  const pool = [...suggestions];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

const PromptForm = ({ currentModeId, fields, values, onUpdate, onAddSuggestion, onRandomize, onClear, onApplyPreset }) => {
  const [activeTab, setActiveTab] = useState('principal');

  const availableTabs = useMemo(() => {
    const tabs = [{ id: 'principal', label: 'Principal' }];

    const hasStyle = fields.some(f =>
      ['style', 'style_ambiance', 'composition', 'cinematography', 'image_type', 'transformation', 'environment'].includes(f.id)
    );
    const hasCharacters = fields.some(f =>
      ['characters_definition', 'dialogue'].includes(f.id)
    );
    const hasMotion = fields.some(f =>
      ['motion_fluidity', 'motion_stability'].includes(f.id)
    );
    const hasHelp = fields.some(f => f.type === 'info');

    if (hasStyle) tabs.push({ id: 'style', label: 'Estilo e Câmera' });
    if (hasCharacters) tabs.push({ id: 'characters', label: 'Personagens' });
    if (hasMotion) tabs.push({ id: 'motion', label: 'Movimento & Física' });
    if (hasHelp) tabs.push({ id: 'help', label: 'Instruções' });

    return tabs;
  }, [fields]);

  const effectiveTab = useMemo(() => {
    if (availableTabs.some(t => t.id === activeTab)) return activeTab;
    return 'principal';
  }, [availableTabs, activeTab]);

  const displaySuggestions = useMemo(() => {
    const map = {};
    fields.forEach(field => {
      if (field.suggestions) {
        if (field.type !== 'textarea') {
          map[field.id] = pickSuggestions(field.suggestions, 5);
        } else {
          map[field.id] = field.suggestions;
        }
      }
    });
    return map;
  }, [fields]);

  const filteredFields = useMemo(() => {
    const tabFieldIds = {
      principal: ['style', 'style_ambiance', 'composition', 'cinematography', 'image_type', 'transformation', 'environment', 'characters_definition', 'dialogue', 'motion_fluidity', 'motion_stability'],
      style: ['style', 'style_ambiance', 'composition', 'cinematography', 'image_type', 'transformation', 'environment'],
      characters: ['characters_definition', 'dialogue'],
      motion: ['motion_fluidity', 'motion_stability']
    };

    const excludedIds = tabFieldIds.principal;
    const includedIds = tabFieldIds[effectiveTab];

    if (effectiveTab === 'principal') {
      return fields.filter(f => !excludedIds.includes(f.id) && f.type !== 'info');
    }
    if (effectiveTab === 'help') {
      return fields.filter(f => f.type === 'info');
    }
    return fields.filter(f => includedIds.includes(f.id));
  }, [fields, effectiveTab]);

  const characters = Array.isArray(values.characters_definition)
    ? values.characters_definition
    : [];

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

      <TemplateSelector
        currentModeId={currentModeId}
        onSelectTemplate={onApplyPreset}
      />

      <div className={styles.tabsContainer}>
        {availableTabs.map((tab) => {
          const Icon = TAB_ICONS[tab.id] || Settings;
          return (
            <button
              key={tab.id}
              type="button"
              className={clsx(styles.tabBtn, effectiveTab === tab.id && styles.activeTab)}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} className={styles.tabIcon} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {filteredFields.map((field) => (
        <div key={field.id} className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label htmlFor={field.id} className={styles.label}>
              {field.label}
            </label>
            {field.hint && <span className={styles.hint}>{field.hint}</span>}
          </div>

          {field.type === 'info' ? (
            <div className={styles.infoField}>
              <p>{field.content}</p>
            </div>
          ) : field.type === 'characters-table' ? (
            <div className={styles.charactersTableContainer}>
              <table className={styles.charTable}>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Aparência (Inglês)</th>
                    <th>Vestimenta (Inglês)</th>
                    <th>Movimento</th>
                    <th>Voz / Tom (Inglês)</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(values[field.id]) ? values[field.id] : []).map((char, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          className={styles.charInput}
                          placeholder="Ex: worker"
                          value={char.name || ''}
                          onChange={(e) => {
                            const newChars = [...values[field.id]];
                            newChars[index] = { ...newChars[index], name: e.target.value };
                            onUpdate(field.id, newChars);
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className={styles.charInput}
                          placeholder="Ex: young man..."
                          value={char.appearance || ''}
                          onChange={(e) => {
                            const newChars = [...values[field.id]];
                            newChars[index] = { ...newChars[index], appearance: e.target.value };
                            onUpdate(field.id, newChars);
                          }}
                          list="appearance-suggestions"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className={styles.charInput}
                          placeholder="Ex: linen kilt..."
                          value={char.clothing || ''}
                          onChange={(e) => {
                            const newChars = [...values[field.id]];
                            newChars[index] = { ...newChars[index], clothing: e.target.value };
                            onUpdate(field.id, newChars);
                          }}
                          list="clothing-suggestions"
                        />
                      </td>
                      <td>
                        <SearchableSelect
                          options={[
                            { label: 'Natural Composto', value: 'composed_natural' },
                            { label: 'TikTok (Muito Expressivo)', value: 'high_energy_expressive' }
                          ]}
                          value={char.motion || 'composed_natural'}
                          onChange={(val) => {
                            const newChars = [...values[field.id]];
                            newChars[index] = { ...newChars[index], motion: val };
                            onUpdate(field.id, newChars);
                          }}
                          placeholder="Movimento"
                          className={styles.charSelect}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className={styles.charInput}
                          placeholder="Ex: comedic voice..."
                          value={char.voice || ''}
                          onChange={(e) => {
                            const newChars = [...values[field.id]];
                            newChars[index] = { ...newChars[index], voice: e.target.value };
                            onUpdate(field.id, newChars);
                          }}
                          list="voice-suggestions"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className={styles.removeCharBtn}
                          onClick={() => {
                            const newChars = values[field.id].filter((_, i) => i !== index);
                            onUpdate(field.id, newChars);
                          }}
                          title="Remover personagem"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(Array.isArray(values[field.id]) ? values[field.id] : []).length === 0 && (
                    <tr>
                      <td colSpan="6" className={styles.emptyTable}>
                        Nenhum personagem adicionado. Use as sugestões abaixo ou clique em "Adicionar Personagem".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button
                type="button"
                className={styles.addCharBtn}
                onClick={() => {
                  const currentList = Array.isArray(values[field.id]) ? values[field.id] : [];
                  const newChars = [
                    ...currentList,
                    { name: '', appearance: '', clothing: '', motion: 'composed_natural', voice: '' }
                  ];
                  onUpdate(field.id, newChars);
                }}
              >
                ＋ Adicionar Personagem
              </button>

              <datalist id="appearance-suggestions">
                <option value="charismatic young Egyptian worker, sun-tanned skin" />
                <option value="serious pharaoh guard, striped nemes headdress" />
                <option value="cute red fruit character with strawberry face" />
                <option value="relaxed yellow fruit character with pineapple crown" />
                <option value="cyberpunk street racer, glowing neon tattoos" />
                <option value="wise elderly wizard with a long silver beard" />
                <option value="charismatic teenage boy wearing headphones" />
                <option value="adorable robot with big glowing blue digital eyes" />
              </datalist>

              <datalist id="clothing-suggestions">
                <option value="historically inspired simple white linen kilt" />
                <option value="ornate traditional royal guard armor" />
                <option value="tiny green leaf collar" />
                <option value="sunglasses and colorful tropical Hawaiian shirt" />
                <option value="oversized glowing cyberpunk leather hoodie" />
                <option value="elegant velvet royal wizard robes" />
                <option value="futuristic metallic sleek plating" />
                <option value="casual modern streetwear jacket and jeans" />
              </datalist>

              <datalist id="voice-suggestions">
                <option value="energetic comedic TikTok vlog voice" />
                <option value="deep angry authority voice" />
                <option value="sweet high-pitched cartoon voice" />
                <option value="calm deep laidback voice" />
                <option value="excited young expressive voice" />
                <option value="raspy whispery mysterious voice" />
                <option value="glowing high-tech robotic digital voice" />
              </datalist>
            </div>
          ) : field.type === 'textarea' ? (
            <>
              <CharacterChips
                fieldId={field.id}
                characters={characters}
                onUpdate={onUpdate}
                values={values}
              />
              <textarea
                id={field.id}
                className={styles.textarea}
                placeholder={field.placeholder}
                value={values[field.id] || ''}
                onChange={(e) => onUpdate(field.id, e.target.value)}
                rows={3}
              />
            </>
          ) : (
            <>
              <CharacterChips
                fieldId={field.id}
                characters={characters}
                onUpdate={onUpdate}
                values={values}
              />
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
                  key={sug.label}
                  type="button"
                  className={styles.chip}
                  onClick={() => {
                    if (field.type === 'characters-table') {
                      onUpdate(field.id, sug.value);
                    } else {
                      onAddSuggestion(field.id, sug.value);
                    }
                  }}
                  title={typeof sug.value === 'string' ? sug.value : JSON.stringify(sug.value)}
                >
                  {sug.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <VideoQuickPrompts currentModeId={currentModeId} />
      {currentModeId === 'photo-transform' && <RestorePromptButton />}
    </form>
  );
};

export default PromptForm;
