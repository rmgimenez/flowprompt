import React, { useMemo, useState } from 'react';
import styles from './PromptForm.module.css';
import { Wand2, Eraser, MessageSquare, Volume2, VolumeX, Sparkles, Check, History } from 'lucide-react';
import { clsx } from 'clsx';

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

const PromptForm = ({ currentModeId, fields, values, onUpdate, onAddSuggestion, onRandomize, onClear }) => {
  const [copiedSpeech, setCopiedSpeech] = useState(false);
  const [copiedSfx, setCopiedSfx] = useState(false);
  const [copiedSilent, setCopiedSilent] = useState(false);
  const [copiedRestore, setCopiedRestore] = useState(false);

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

          {field.type === 'info' ? (
            <div className={styles.infoField}>
              <p>{field.content}</p>
            </div>
          ) : field.type === 'textarea' ? (
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
