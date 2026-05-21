import { useState } from 'react';
import { MessageSquare, Volume2, VolumeX, Sparkles, History, Check } from 'lucide-react';
import styles from './PromptForm.module.css';
import { VIRAL_PROMPTS } from '../../constants/viralPrompts';

const RESTORE_PROMPT = `{
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

export function VideoQuickPrompts({ currentModeId }) {
  const [copiedType, setCopiedType] = useState(null);

  if (currentModeId !== 'video-from-frames' && currentModeId !== 'video-from-img') {
    return null;
  }

  const handleCopy = (type) => {
    const modePrompts = VIRAL_PROMPTS[currentModeId];
    if (!modePrompts) return;

    navigator.clipboard.writeText(modePrompts[type]);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
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
          onClick={() => handleCopy('speech')}
          title="Copiar prompt viral com fala nativa em português e lip-sync"
        >
          {copiedType === 'speech' ? <Check size={16} /> : <MessageSquare size={16} />}
          <span>{copiedType === 'speech' ? 'Copiado!' : 'IA Decide + Falas (pt-BR)'}</span>
        </button>
        <button
          type="button"
          className={styles.auxBtnSfx}
          onClick={() => handleCopy('sfx')}
          title="Copiar prompt viral sem fala, mas com efeitos sonoros (SFX) e ambiente"
        >
          {copiedType === 'sfx' ? <Check size={16} /> : <Volume2 size={16} />}
          <span>{copiedType === 'sfx' ? 'Copiado!' : 'IA Decide + Efeitos (SFX)'}</span>
        </button>
        <button
          type="button"
          className={styles.auxBtnSilent}
          onClick={() => handleCopy('silent')}
          title="Copiar prompt viral puramente silencioso, sem áudio"
        >
          {copiedType === 'silent' ? <Check size={16} /> : <VolumeX size={16} />}
          <span>{copiedType === 'silent' ? 'Copiado!' : 'IA Decide + Sem Áudio'}</span>
        </button>
      </div>
    </div>
  );
}

export function RestorePromptButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(RESTORE_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
          onClick={handleCopy}
          title="Copiar prompt JSON pronto para restauração e colorização"
        >
          {copied ? <Check size={16} /> : <History size={16} />}
          <span>{copied ? 'Copiado!' : 'Copiar Prompt de Restauração'}</span>
        </button>
      </div>
    </div>
  );
}
