import { useMemo } from 'react';
import { Activity } from 'lucide-react';
import { calculateViralScore } from '../../utils/utils';
import styles from '../../TikTokCollections.module.css';

export const ViralScore = ({ theme, quantity, selectedStyle, selectedVibe, selectedTarget, portugueseText, notes }) => {
  const config = useMemo(() => ({ theme, quantity, selectedStyle, selectedVibe, selectedTarget, portugueseText, notes }),
    [theme, quantity, selectedStyle, selectedVibe, selectedTarget, portugueseText, notes]);
  const result = useMemo(() => calculateViralScore(config), [config]);

  const filledColor = result.score >= 85 ? '#10b981' :
    result.score >= 70 ? '#f59e0b' :
    result.score >= 50 ? '#f97316' : '#ef4444';

  return (
    <div className={styles.viralScore}>
      <div className={styles.viralScoreHeader}>
        <Activity size={16} style={{ color: filledColor }} />
        <span className={styles.viralScoreTitle}>Viral Score</span>
        <span className={styles.viralScoreValue} style={{ color: filledColor }}>
          {result.score}%
        </span>
      </div>

      <div className={styles.viralScoreBarBg}>
        <div
          className={styles.viralScoreBarFill}
          style={{ width: `${result.score}%`, background: filledColor }}
        />
      </div>

      <span className={styles.viralScoreLabel} style={{ color: filledColor }}>
        {result.label}
      </span>

      <p className={styles.viralScoreFeedback}>{result.feedback}</p>

      <div className={styles.viralScoreBreakdown}>
        {result.breakdown.map((b, i) => (
          <div key={i} className={styles.viralScoreBreakdownItem}>
            <div className={styles.viralScoreBreakdownHeader}>
              <span className={styles.viralScoreBreakdownFactor}>{b.factor}</span>
              <span className={styles.viralScoreBreakdownPct}>
                {b.score}/{b.max}
              </span>
            </div>
            <div className={styles.viralScoreBreakdownBarBg}>
              <div
                className={styles.viralScoreBreakdownBarFill}
                style={{ width: `${(b.score / b.max) * 100}%` }}
              />
            </div>
            <span className={styles.viralScoreBreakdownDetail}>{b.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViralScore;
