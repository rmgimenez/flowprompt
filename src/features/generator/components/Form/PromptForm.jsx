import { useMemo, useState, useEffect } from 'react';
import styles from './PromptForm.module.css';
import { Wand2, Eraser, MessageSquare, Volume2, VolumeX, Sparkles, Check, History, Settings, Camera, User, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import TemplateSelector from './TemplateSelector';

const VIRAL_PROMPTS = {
  'video-from-frames': {
    speech: `{
  "cinematography": {
    "camera_type": "handheld",
    "movement": {
      "type": "orbit_cw",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "medium"
  },
  "subject": {
    "primary": {
      "type": "guided_by_frames",
      "description": "seamless high-fidelity transition optimized for vertical social media with high-energy retention hook",
      "action": "reacting with high energy within the first 2 seconds, performing dynamic actions to maximize retention"
    }
  },
  "environment": {
    "lighting": "maintain_from_frames",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "fluid_and_consistent",
    "transitions": {
      "from_start_frame": "match_cut",
      "to_end_frame": "smooth_interpolation"
    }
  },
  "audio": {
    "dialogue": [
      {
        "character": "personagem",
        "speech": "fala inteligente, cativante e altamente identificável para redes sociais"
      }
    ],
    "language": "pt-BR",
    "lip_sync": "perfect"
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`,
    sfx: `{
  "cinematography": {
    "camera_type": "handheld",
    "movement": {
      "type": "orbit_cw",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "medium"
  },
  "subject": {
    "primary": {
      "type": "guided_by_frames",
      "description": "seamless high-fidelity transition optimized for vertical social media with high-energy retention hook",
      "action": "reacting with high energy within the first 2 seconds, performing dynamic actions to maximize retention"
    }
  },
  "environment": {
    "lighting": "maintain_from_frames",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "fluid_and_consistent",
    "transitions": {
      "from_start_frame": "match_cut",
      "to_end_frame": "smooth_interpolation"
    }
  },
  "audio": {
    "sound_effects": "enriched with immersive sound effects, realistic ambient audio cues, and an engaging cinematic background soundtrack to match the action perfectly",
    "voice_dialogue": "none"
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`,
    silent: `{
  "cinematography": {
    "camera_type": "handheld",
    "movement": {
      "type": "orbit_cw",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "medium"
  },
  "subject": {
    "primary": {
      "type": "guided_by_frames",
      "description": "seamless high-fidelity transition optimized for vertical social media with high-energy retention hook",
      "action": "reacting with high energy within the first 2 seconds, performing dynamic actions to maximize retention"
    }
  },
  "environment": {
    "lighting": "maintain_from_frames",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "fluid_and_consistent",
    "transitions": {
      "from_start_frame": "match_cut",
      "to_end_frame": "smooth_interpolation"
    }
  },
  "audio": {
    "sound_effects": "none",
    "voice_dialogue": "none",
    "silent": true
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`
  },
  'video-from-img': {
    speech: `{
  "cinematography": {
    "camera_type": "gimbal",
    "movement": {
      "type": "push_in",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "maintain_from_image"
  },
  "subject": {
    "primary": {
      "type": "based_on_image",
      "description": "highly engaging viral video sequence using the base image as foundation",
      "action": "starting with a strong visual hook in the first 2 seconds, flowing towards a surprising high-retention climax"
    }
  },
  "environment": {
    "lighting": "maintain_from_image",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "realistic_fluid"
  },
  "audio": {
    "dialogue": [
      {
        "character": "personagem",
        "speech": "diálogo rápido, espirituoso e divertido"
      }
    ],
    "language": "pt-BR",
    "lip_sync": "perfect"
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`,
    sfx: `{
  "cinematography": {
    "camera_type": "gimbal",
    "movement": {
      "type": "push_in",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "maintain_from_image"
  },
  "subject": {
    "primary": {
      "type": "based_on_image",
      "description": "highly engaging viral video sequence using the base image as foundation",
      "action": "starting with a strong visual hook in the first 2 seconds, flowing towards a surprising high-retention climax"
    }
  },
  "environment": {
    "lighting": "maintain_from_image",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "realistic_fluid"
  },
  "audio": {
    "sound_effects": "enriched with immersive sound effects, realistic ambient audio cues, and an engaging cinematic background soundtrack to match the action perfectly",
    "voice_dialogue": "none"
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`,
    silent: `{
  "cinematography": {
    "camera_type": "gimbal",
    "movement": {
      "type": "push_in",
      "speed": "fast",
      "easing": "ease_in_out"
    },
    "framing": "maintain_from_image"
  },
  "subject": {
    "primary": {
      "type": "based_on_image",
      "description": "highly engaging viral video sequence using the base image as foundation",
      "action": "starting with a strong visual hook in the first 2 seconds, flowing towards a surprising high-retention climax"
    }
  },
  "environment": {
    "lighting": "maintain_from_image",
    "style_quality": "hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed"
  },
  "motion": {
    "temporal_logic": "continuous",
    "physics": "realistic_fluid"
  },
  "audio": {
    "sound_effects": "none",
    "voice_dialogue": "none",
    "silent": true
  },
  "negative_prompts": [
    "glitch", "deformed details", "sudden cuts", "abrupt transition", "unstable frames"
  ]
}`
  }
};

// Templates are now imported from constants/templates.js for a curated library

const PromptForm = ({ currentModeId, fields, values, onUpdate, onAddSuggestion, onRandomize, onClear, onApplyPreset }) => {
  const [copiedSpeech, setCopiedSpeech] = useState(false);
  const [copiedSfx, setCopiedSfx] = useState(false);
  const [copiedSilent, setCopiedSilent] = useState(false);
  const [copiedRestore, setCopiedRestore] = useState(false);
  const [activeTab, setActiveTab] = useState('principal');



  // Filter categories dynamically based on fields actually present in current mode
  const availableTabs = useMemo(() => {
    const tabs = [{ id: 'principal', label: 'Principal' }];
    
    const hasStyle = fields.some(f => 
      ['style', 'style_ambiance', 'composition', 'cinematography', 'image_type', 'transformation', 'environment'].includes(f.id)
    );
    const hasCharacters = fields.some(f => 
      ['characters_definition', 'dialogue'].includes(f.id)
    );
    const hasHelp = fields.some(f => f.type === 'info');
    
    if (hasStyle) tabs.push({ id: 'style', label: 'Estilo e Câmera' });
    if (hasCharacters) tabs.push({ id: 'characters', label: 'Personagens' });
    if (hasHelp) tabs.push({ id: 'help', label: 'Instruções' });
    
    return tabs;
  }, [fields]);

  // Adjust active tab if it's not present in the new mode's tabs
  useEffect(() => {
    if (!availableTabs.some(t => t.id === activeTab)) {
      const timer = setTimeout(() => {
        setActiveTab('principal');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [availableTabs, activeTab]);

  const handleApplyPreset = (preset) => {
    onApplyPreset(preset);
  };

  const handleCopyAuxPrompt = (type) => {
    if (type === 'restore') {
      const restorePrompt = `{
  "transformation": {
    "reference_mode": "structural_composition_fidelity",
    "relationship_to_source": "high-fidelity restoration and precise colorization of the historical archive photograph, absolute structure and portrait line preservation",
    "target_scenario": "flawlessly restored and realistically colorized version of the original image, removing scratches, fading, grain, noise, dust, and stains"
  },
  "environment": {
    "context": "as captured in the original frame, but in realistic true-to-life colors",
    "time_of_day": "natural daylight",
    "lighting": {
      "key_light": "balanced photographic key light",
      "fill_light": "soft natural fill to eliminate harsh shadows",
      "rim_light": "none"
    },
    "atmosphere": {
      "weather": "clear",
      "mood": "nostalgic, warm, high-fidelity memory"
    }
  },
  "style_and_quality": {
    "medium": "photograph",
    "rendering_engine": "none",
    "color_grading": "realistic full color spectrum, warm lifelike skin tones, vibrant natural environments",
    "golden_tokens": [
      "professional restoration",
      "scratch-free",
      "colorized masterpiece",
      "micro-details preserved",
      "sharp focus",
      "8k resolution"
    ]
  },
  "negative_prompts": [
    "black and white", "sepia", "grayscale", "scratches", "noise", "dust", 
    "cracks", "stains", "blurry", "faded colors", "oversaturated", "artifacts"
  ]
}`;
      navigator.clipboard.writeText(restorePrompt);
      setCopiedRestore(true);
      setTimeout(() => setCopiedRestore(false), 2000);
      return;
    }

    const modePrompts = VIRAL_PROMPTS[currentModeId];
    if (!modePrompts) return;

    const promptText = modePrompts[type];
    navigator.clipboard.writeText(promptText);

    if (type === 'speech') {
      setCopiedSpeech(true);
      setTimeout(() => setCopiedSpeech(false), 2000);
    } else if (type === 'sfx') {
      setCopiedSfx(true);
      setTimeout(() => setCopiedSfx(false), 2000);
    } else if (type === 'silent') {
      setCopiedSilent(true);
      setTimeout(() => setCopiedSilent(false), 2000);
    }
  };

  // Memoize random suggestions so they don't change while typing
  const displaySuggestions = useMemo(() => {
    const map = {};
    fields.forEach(field => {
      if (field.suggestions) {
        if (field.type !== 'textarea') {
          // Pick 5 random suggestions for datalist fields
          map[field.id] = [...field.suggestions]
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);
        } else {
          // Show all for textareas (or we could limit them too, but instruction specifies datalist fields)
          map[field.id] = field.suggestions;
        }
      }
    });
    return map;
  }, [fields]);

  // Filtered fields based on active tab
  const filteredFields = useMemo(() => {
    return fields.filter(field => {
      if (activeTab === 'principal') {
        return !['style', 'style_ambiance', 'composition', 'cinematography', 'image_type', 'transformation', 'environment', 'characters_definition', 'dialogue'].includes(field.id) && field.type !== 'info';
      }
      if (activeTab === 'style') {
        return ['style', 'style_ambiance', 'composition', 'cinematography', 'image_type', 'transformation', 'environment'].includes(field.id);
      }
      if (activeTab === 'characters') {
        return ['characters_definition', 'dialogue'].includes(field.id);
      }
      if (activeTab === 'help') {
        return field.type === 'info';
      }
      return false;
    });
  }, [fields, activeTab]);

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

      {/* Biblioteca de Templates Curados */}
      <TemplateSelector 
        currentModeId={currentModeId} 
        onSelectTemplate={handleApplyPreset} 
      />

      {/* Abas de Configuração */}
      <div className={styles.tabsContainer}>
        {availableTabs.map((tab) => {
          let Icon = Settings;
          if (tab.id === 'style') Icon = Camera;
          if (tab.id === 'characters') Icon = User;
          if (tab.id === 'help') Icon = HelpCircle;
          
          return (
            <button
              key={tab.id}
              type="button"
              className={clsx(styles.tabBtn, activeTab === tab.id && styles.activeTab)}
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
                  {(values[field.id] && Array.isArray(values[field.id]) ? values[field.id] : []).map((char, index) => (
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
                        <select
                          className={styles.charSelect}
                          value={char.motion || 'composed_natural'}
                          onChange={(e) => {
                            const newChars = [...values[field.id]];
                            newChars[index] = { ...newChars[index], motion: e.target.value };
                            onUpdate(field.id, newChars);
                          }}
                        >
                          <option value="composed_natural">Natural Composto</option>
                          <option value="high_energy_expressive">TikTok (Muito Expressivo)</option>
                        </select>
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
                  {(values[field.id] && Array.isArray(values[field.id]) ? values[field.id] : []).length === 0 && (
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
              {field.id === 'dialogue' && Array.isArray(values['characters_definition']) && values['characters_definition'].length > 0 && (
                <div className={styles.dialogueShortcuts}>
                  <span className={styles.shortcutLabel}>Atalhos rápidos de Fala:</span>
                  <div className={styles.shortcutChips}>
                    {values['characters_definition'].filter(c => c.name).map((char) => (
                      <button
                        key={char.name}
                        type="button"
                        className={styles.shortcutChip}
                        onClick={() => {
                          const textarea = document.getElementById('dialogue');
                          if (!textarea) return;
                          const text = values['dialogue'] || '';
                          const start = textarea.selectionStart || 0;
                          const end = textarea.selectionEnd || 0;
                          const insertStr = `[${char.name}] (excited): []`;
                          const newText = text.substring(0, start) + insertStr + text.substring(end);
                          onUpdate('dialogue', newText);
                          
                          setTimeout(() => {
                            textarea.focus();
                            const newCursorPos = start + insertStr.length - 1;
                            textarea.setSelectionRange(newCursorPos, newCursorPos);
                          }, 50);
                        }}
                        title={`Inserir fala de [${char.name}] no cursor`}
                      >
                        💬 {char.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {field.id !== 'dialogue' && Array.isArray(values['characters_definition']) && values['characters_definition'].length > 0 && (
                <div className={styles.dialogueShortcuts}>
                  <span className={styles.shortcutLabel}>Inserir Personagem:</span>
                  <div className={styles.shortcutChips}>
                    {values['characters_definition'].filter(c => c.name).map((char) => (
                      <span key={char.name} className={styles.shortcutGroup}>
                        <button
                          type="button"
                          className={styles.shortcutChip}
                          onClick={() => {
                            const input = document.getElementById(field.id);
                            if (!input) return;
                            const text = values[field.id] || '';
                            const start = input.selectionStart || 0;
                            const end = input.selectionEnd || 0;
                            const insertStr = char.name;
                            const newText = text.substring(0, start) + insertStr + text.substring(end);
                            onUpdate(field.id, newText);
                            setTimeout(() => {
                              input.focus();
                              const newPos = start + insertStr.length;
                              input.setSelectionRange(newPos, newPos);
                            }, 50);
                          }}
                          title={`Inserir nome [${char.name}] no cursor`}
                        >
                          👤 {char.name}
                        </button>
                        <button
                          type="button"
                          className={`${styles.shortcutChip} ${styles.shortcutChipSecondary}`}
                          onClick={() => {
                            const input = document.getElementById(field.id);
                            if (!input) return;
                            const text = values[field.id] || '';
                            const start = input.selectionStart || 0;
                            const end = input.selectionEnd || 0;
                            const desc = `${char.appearance || ''}${char.clothing ? `, wearing ${char.clothing}` : ''}`;
                            const insertStr = desc;
                            const newText = text.substring(0, start) + insertStr + text.substring(end);
                            onUpdate(field.id, newText);
                            setTimeout(() => {
                              input.focus();
                              const newPos = start + insertStr.length;
                              input.setSelectionRange(newPos, newPos);
                            }, 50);
                          }}
                          title={`Inserir descrição completa de [${char.name}] no cursor`}
                        >
                          📝 Descrição
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
              {Array.isArray(values['characters_definition']) && values['characters_definition'].length > 0 && (
                <div className={styles.dialogueShortcuts}>
                  <span className={styles.shortcutLabel}>Inserir Personagem:</span>
                  <div className={styles.shortcutChips}>
                    {values['characters_definition'].filter(c => c.name).map((char) => (
                      <span key={char.name} className={styles.shortcutGroup}>
                        <button
                          type="button"
                          className={styles.shortcutChip}
                          onClick={() => {
                            const input = document.getElementById(field.id);
                            if (!input) return;
                            const text = values[field.id] || '';
                            const start = input.selectionStart || 0;
                            const end = input.selectionEnd || 0;
                            const insertStr = char.name;
                            const newText = text.substring(0, start) + insertStr + text.substring(end);
                            onUpdate(field.id, newText);
                            setTimeout(() => {
                              input.focus();
                              const newPos = start + insertStr.length;
                              input.setSelectionRange(newPos, newPos);
                            }, 50);
                          }}
                          title={`Inserir nome [${char.name}] no cursor`}
                        >
                          👤 {char.name}
                        </button>
                        <button
                          type="button"
                          className={`${styles.shortcutChip} ${styles.shortcutChipSecondary}`}
                          onClick={() => {
                            const input = document.getElementById(field.id);
                            if (!input) return;
                            const text = values[field.id] || '';
                            const start = input.selectionStart || 0;
                            const end = input.selectionEnd || 0;
                            const desc = `${char.appearance || ''}${char.clothing ? `, wearing ${char.clothing}` : ''}`;
                            const insertStr = desc;
                            const newText = text.substring(0, start) + insertStr + text.substring(end);
                            onUpdate(field.id, newText);
                            setTimeout(() => {
                              input.focus();
                              const newPos = start + insertStr.length;
                              input.setSelectionRange(newPos, newPos);
                            }, 50);
                          }}
                          title={`Inserir descrição completa de [${char.name}] no cursor`}
                        >
                          📝 Descrição
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
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

      {/* Auxiliary/Quick-generate buttons for Video modes */}
      {(currentModeId === 'video-from-frames' || currentModeId === 'video-from-img') && (
        <div className={styles.auxiliarySection}>
          <h5 className={styles.auxiliaryTitle}>
            <Sparkles size={14} className={styles.auxiliaryIcon} />
            <span>Prompts Rápidos Virais (TikTok/Reels)</span>
          </h5>
          <p className={styles.auxiliaryDesc}>
            Copie prompts otimizados independentes das seleções acima, onde a IA tem total liberdade criativa para guiar a cena e viralizar.
          </p>
          <div className={styles.auxiliaryButtons}>
            <button
              type="button"
              className={styles.auxBtnSpeech}
              onClick={() => handleCopyAuxPrompt('speech')}
              title="Copiar prompt viral com fala nativa em português e lip-sync"
            >
              {copiedSpeech ? <Check size={16} /> : <MessageSquare size={16} />}
              <span>{copiedSpeech ? 'Copiado!' : 'IA Decide + Falas (pt-BR)'}</span>
            </button>
            <button
              type="button"
              className={styles.auxBtnSfx}
              onClick={() => handleCopyAuxPrompt('sfx')}
              title="Copiar prompt viral sem fala, mas com efeitos sonoros (SFX) e ambiente"
            >
              {copiedSfx ? <Check size={16} /> : <Volume2 size={16} />}
              <span>{copiedSfx ? 'Copiado!' : 'IA Decide + Efeitos (SFX)'}</span>
            </button>
            <button
              type="button"
              className={styles.auxBtnSilent}
              onClick={() => handleCopyAuxPrompt('silent')}
              title="Copiar prompt viral puramente silencioso, sem áudio"
            >
              {copiedSilent ? <Check size={16} /> : <VolumeX size={16} />}
              <span>{copiedSilent ? 'Copiado!' : 'IA Decide + Sem Áudio'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Auxiliary button for photo-transform restoration */}
      {currentModeId === 'photo-transform' && (
        <div className={styles.auxiliarySection}>
          <h5 className={styles.auxiliaryTitle}>
            <History size={14} className={styles.auxiliaryIcon} />
            <span>Restauração e Colorização Profissional</span>
          </h5>
          <p className={styles.auxiliaryDesc}>
            Copie um prompt JSON pronto, otimizado para restaurar a nitidez, colorir com realismo e remover arranhões de fotos antigas sem perder a fidelidade do sujeito.
          </p>
          <div className={styles.auxiliaryButtons}>
            <button
              type="button"
              className={styles.auxBtnSpeech}
              onClick={() => handleCopyAuxPrompt('restore')}
              title="Copiar prompt JSON pronto para restauração e colorização"
            >
              {copiedRestore ? <Check size={16} /> : <History size={16} />}
              <span>{copiedRestore ? 'Copiado!' : 'Copiar Prompt de Restauração'}</span>
            </button>
          </div>
        </div>
      )}


    </form>
  );
};

export default PromptForm;
