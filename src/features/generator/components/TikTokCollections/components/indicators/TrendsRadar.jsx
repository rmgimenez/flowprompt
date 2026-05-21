import { useState } from 'react';
import { Sparkles, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react';
import { TRENDING_THEMES } from '../../constants/constants';
import styles from '../../TikTokCollections.module.css';

export const TrendsRadar = ({ onSelectTheme }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className={styles.trendsRadar}>
      <div className={styles.trendsRadarHeader}>
        <TrendingUp size={16} style={{ color: '#10b981' }} />
        <span className={styles.trendsRadarTitle}>Trends Radar — Temas em Alta</span>
        <span className={styles.trendsRadarBadge}>AO VIVO</span>
      </div>

      {TRENDING_THEMES.map((group) => {
        const isExpanded = expandedCategories.includes(group.category);
        return (
          <div key={group.category} className={styles.trendsCategory}>
            <button
              type="button"
              className={styles.trendsCategoryBtn}
              onClick={() => toggleCategory(group.category)}
            >
              <span className={styles.trendsCategoryLabel}>
                <span>{group.emoji}</span>
                {group.category}
              </span>
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {isExpanded && (
              <div className={styles.trendsItemsContainer}>
                {group.items.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={styles.trendsItemBtn}
                    onClick={() => onSelectTheme(item.theme)}
                    title={`Usar tema: ${item.label}`}
                  >
                    <Sparkles size={12} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TrendsRadar;
