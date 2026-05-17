import React, { useMemo, useState } from 'react';
import styles from './PromptForm.module.css';
import { Wand2, Eraser, MessageSquare, Volume2, VolumeX, Sparkles, Check } from 'lucide-react';
import { clsx } from 'clsx';

const VIRAL_PROMPTS = {
  'video-from-frames': {
    speech: `Using the provided start frame and end frame as absolute structural guides, generate a highly engaging, viral 9:16 vertical video transition optimized for TikTok and Reels. The AI has absolute creative freedom to animate the transition in the most dynamic, visually stunning, and creative way possible to maximize audience retention. \nTechnical quality: hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed, smooth fluid physics, and flawless temporal consistency.\nHook & Camera: Start the sequence with a high-energy camera snap-zoom or orbit to capture immediate attention within the first 2 seconds, maintaining intense pacing.\nAudio & Dialogue: If there is any speaking or character dialogue in the video, the characters must speak natively in Brazilian Portuguese (pt-BR) with perfect lip-sync, using the [character]: [speech] dubbing format (e.g., [personagem]: [fala]). The dialogue should be witty, engaging, and highly relatable for social media.\nEnsure no sudden cuts, artifacting, or morphing glitches.`,
    sfx: `Using the provided start frame and end frame as absolute structural guides, generate a highly engaging, viral 9:16 vertical video transition optimized for TikTok and Reels. The AI has absolute creative freedom to animate the transition in the most dynamic, visually stunning, and creative way possible to maximize audience retention. \nTechnical quality: hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed, smooth fluid physics, and flawless temporal consistency.\nHook & Camera: Start the sequence with a high-energy camera snap-zoom or orbit to capture immediate attention within the first 2 seconds, maintaining intense pacing.\nAudio & Dialogue: This video sequence must contain absolutely no spoken words, voiceover, or character dialogue. However, the scene must be enriched with immersive sound effects (SFX), realistic ambient audio cues, and an engaging cinematic background soundtrack to match the action perfectly, creating a rich auditory experience.\nEnsure no sudden cuts, artifacting, or morphing glitches.`,
    silent: `Using the provided start frame and end frame as absolute structural guides, generate a highly engaging, viral 9:16 vertical video transition optimized for TikTok and Reels. The AI has absolute creative freedom to animate the transition in the most dynamic, visually stunning, and creative way possible to maximize audience retention. \nTechnical quality: hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed, smooth fluid physics, and flawless temporal consistency.\nHook & Camera: Start the sequence with a high-energy camera snap-zoom or orbit to capture immediate attention within the first 2 seconds, maintaining intense pacing.\nAudio & Dialogue: This must be a purely visual, silent video sequence with no dialogue or speech. Focus completely on rich visual storytelling, dynamic physical interactions, and sound effects/music cues if applicable, with absolutely no spoken words.\nEnsure no sudden cuts, artifacting, or morphing glitches.`
  },
  'video-from-img': {
    speech: `Using the provided high-quality base image as a foundation, initiate a highly engaging, viral 9:16 vertical video sequence optimized for TikTok and Reels. The AI has absolute creative freedom to animate the scene and decide the ending of the video in the most unexpected, dynamic, and visually stunning way to maximize audience retention.\nTechnical quality: hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed, smooth fluid physics, and flawless temporal consistency.\nHook & Camera: Begin with a strong visual hook in the first 2 seconds, utilizing a dynamic camera movement such as a dolly zoom or rapid pan to capture immediate attention.\nAudio & Dialogue: If there is any speaking or character dialogue in the video, the characters must speak natively in Brazilian Portuguese (pt-BR) with perfect lip-sync, using the [character]: [speech] dubbing format (e.g., [personagem]: [fala]). The dialogue should be witty, engaging, and highly relatable for social media.\nEnsure the animation flows naturally towards a surprising, high-retention climax and ending.`,
    sfx: `Using the provided high-quality base image as a foundation, initiate a highly engaging, viral 9:16 vertical video sequence optimized for TikTok and Reels. The AI has absolute creative freedom to animate the scene and decide the ending of the video in the most unexpected, dynamic, and visually stunning way to maximize audience retention.\nTechnical quality: hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed, smooth fluid physics, and flawless temporal consistency.\nHook & Camera: Begin with a strong visual hook in the first 2 seconds, utilizing a dynamic camera movement such as a dolly zoom or rapid pan to capture immediate attention.\nAudio & Dialogue: This video sequence must contain absolutely no spoken words, voiceover, or character dialogue. However, the scene must be enriched with immersive sound effects (SFX), realistic ambient audio cues, and an engaging cinematic background soundtrack to match the action perfectly, creating a rich auditory experience.\nEnsure the animation flows naturally towards a surprising, high-retention climax and ending.`,
    silent: `Using the provided high-quality base image as a foundation, initiate a highly engaging, viral 9:16 vertical video sequence optimized for TikTok and Reels. The AI has absolute creative freedom to animate the scene and decide the ending of the video in the most unexpected, dynamic, and visually stunning way to maximize audience retention.\nTechnical quality: hyper-realistic, 8k resolution, cinematic lighting, unreal engine 5 style, masterfully executed, smooth fluid physics, and flawless temporal consistency.\nHook & Camera: Begin with a strong visual hook in the first 2 seconds, utilizing a dynamic camera movement such as a dolly zoom or rapid pan to capture immediate attention.\nAudio & Dialogue: This must be a purely visual, silent video sequence with no dialogue or speech. Focus completely on rich visual storytelling, dynamic physical interactions, and sound effects/music cues if applicable, with absolutely no spoken words.\nEnsure the animation flows naturally towards a surprising, high-retention climax and ending.`
  }
};

const PromptForm = ({ currentModeId, fields, values, onUpdate, onAddSuggestion, onRandomize, onClear }) => {
  const [copiedSpeech, setCopiedSpeech] = useState(false);
  const [copiedSfx, setCopiedSfx] = useState(false);
  const [copiedSilent, setCopiedSilent] = useState(false);

  const handleCopyAuxPrompt = (type) => {
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
    </form>
  );
};

export default PromptForm;
