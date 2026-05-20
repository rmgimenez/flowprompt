import React, { useState } from 'react';
import { Copy, Check, Info, Star, Zap, TrendingUp } from 'lucide-react';
import styles from './PromptPreview.module.css';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { clsx } from 'clsx';
import { calculatePromptScore } from '../../utils/promptScore';

const PromptPreview = ({ prompt, onCopy, isFavorite, onToggleFavorite, formValues, currentModeId }) => {
  const [copied, setCopied] = useState(false);
  const [showScoreDetails, setShowScoreDetails] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  const isPlaceholder = !prompt || prompt.includes('<<<');

  // Calculate quality score
  const scoreData = React.useMemo(
    () => calculatePromptScore(prompt, formValues, currentModeId),
    [prompt, formValues, currentModeId]
  );

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

      {/* Quality Score Section */}
      {prompt && (
        <div className={styles.scoreSection}>
          <button
            type="button"
            className={styles.scoreHeader}
            onClick={() => setShowScoreDetails(!showScoreDetails)}
            title="Clique para ver dicas de melhoria"
          >
            <div className={styles.scoreLeft}>
              <Zap size={14} style={{ color: scoreData.color }} />
              <span className={styles.scoreLabel}>Qualidade do Prompt</span>
            </div>
            <div className={styles.scoreRight}>
              <span className={styles.scoreValue} style={{ color: scoreData.color }}>
                {scoreData.score}/100
              </span>
              <span className={styles.scoreBadge} style={{ background: scoreData.color + '20', color: scoreData.color, borderColor: scoreData.color + '40' }}>
                {scoreData.label}
              </span>
              <TrendingUp
                size={14}
                className={clsx(styles.scoreToggleIcon, showScoreDetails && styles.scoreToggleIconOpen)}
                style={{ color: scoreData.color }}
              />
            </div>
          </button>

          <div className={styles.scoreBarBg}>
            <div
              className={styles.scoreBarFill}
              style={{
                width: `${scoreData.score}%`,
                background: `linear-gradient(90deg, ${scoreData.color}88, ${scoreData.color})`
              }}
            />
          </div>

          {showScoreDetails && scoreData.tips.length > 0 && (
            <div className={styles.scoreTips}>
              {scoreData.tips.map((tip, idx) => (
                <div key={idx} className={styles.scoreTipItem}>
                  <span className={styles.scoreTipDot} style={{ background: scoreData.color }} />
                  <span className={styles.scoreTipText}>{tip}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
