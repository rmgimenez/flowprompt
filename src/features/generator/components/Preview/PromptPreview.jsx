import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import styles from './PromptPreview.module.css';
import { GlassCard } from '../../../../components/ui/GlassCard';

const PromptPreview = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className={styles.previewCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>Prompt Gerado</h3>
        <button 
          className={copied ? styles.copyBtnSuccess : styles.copyBtn} 
          onClick={handleCopy}
          disabled={!prompt || prompt.includes('[')}
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

      <div className={styles.promptArea}>
        <code className={styles.promptText}>
          {prompt || 'Aguardando entrada...'}
        </code>
      </div>

      <div className={styles.footer}>
        <Info size={14} className={styles.infoIcon} />
        <p className={styles.tip}>
          Dica: Use termos cinematográficos para melhores resultados.
        </p>
      </div>
    </GlassCard>
  );
};

export default PromptPreview;
