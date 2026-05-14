import React, { useState } from 'react';
import { Copy, Check, Info, Star } from 'lucide-react';
import styles from './PromptPreview.module.css';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { clsx } from 'clsx';

const PromptPreview = ({ prompt, onCopy, isFavorite, onToggleFavorite }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  const isPlaceholder = !prompt || prompt.includes('[');

  return (
    <GlassCard className={styles.previewCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Prompt Gerado</h3>
        <div className={styles.actions}>
          <button
            className={clsx(styles.favoriteBtn, isFavorite && styles.isFavorite)}
            onClick={onToggleFavorite}
            disabled={isPlaceholder}
            title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            className={copied ? styles.copyBtnSuccess : styles.copyBtn} 
            onClick={handleCopy}
            disabled={isPlaceholder}
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className={styles.promptArea}>
        <code className={styles.promptText}>
          {prompt || 'Aguardando entrada...'}
        </code>
      </div>

      <div className={styles.footer}>
        <Info size={14} className={styles.infoIcon} />
        <p className={styles.tip}>
          Dica: Copie o prompt acima e utilize-o no Google AI Studio ou Vertex AI para melhores resultados.
        </p>
      </div>
    </GlassCard>
  );
};

export default PromptPreview;
