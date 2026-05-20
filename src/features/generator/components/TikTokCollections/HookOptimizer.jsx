import { useState, useMemo } from 'react';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { generateHooks } from './utils';
import styles from './TikTokCollections.module.css';

export const HookOptimizer = ({ theme }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const hookGroups = useMemo(() => {
    return generateHooks(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, refreshKey]);

  const handleCopyHook = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!theme || !theme.trim()) return null;

  return (
    <div className={styles.hookOptimizer}>
      <div className={styles.hookOptimizerHeader}>
        <Sparkles size={16} style={{ color: '#f59e0b' }} />
        <span className={styles.hookOptimizerTitle}>Ganchos Virais para o Slide 1</span>
        <button
          type="button"
          className={styles.hookRefreshBtn}
          onClick={() => setRefreshKey(k => k + 1)}
          title="Gerar novas variações"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {hookGroups.length === 0 ? (
        <div className={styles.hookOptimizerEmpty}>
          <span>Tema muito curto — digite mais palavras para gerar ganchos</span>
        </div>
      ) : (
        <div className={styles.hookGroupsContainer}>
          {hookGroups.map((group, gi) => (
            <div key={group.category} className={styles.hookGroup}>
              <span className={styles.hookGroupLabel}>
                {group.emoji} {group.category}
              </span>
              <div className={styles.hookItemsContainer}>
                {group.hooks.map((hook, hi) => {
                  const globalIdx = `${gi}-${hi}`;
                  return (
                    <button
                      key={hi}
                      type="button"
                      className={`${styles.hookItemBtn} ${copiedIndex === globalIdx ? styles.hookItemBtnCopied : ''}`}
                      onClick={() => handleCopyHook(hook, globalIdx)}
                      title="Copiar gancho"
                    >
                      <span className={styles.hookItemText}>{hook}</span>
                      {copiedIndex === globalIdx ? (
                        <Check size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                      ) : (
                        <Copy size={14} style={{ flexShrink: 0, opacity: 0.5 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.hookOptimizerTip}>
        <span>💡 Cole o gancho escolhido no campo "Observações" para virar diretriz do Slide 1</span>
      </div>
    </div>
  );
};

export default HookOptimizer;
