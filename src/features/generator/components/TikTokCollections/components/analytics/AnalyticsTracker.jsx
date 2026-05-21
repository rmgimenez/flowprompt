import { useState } from 'react';
import {
  BarChart3, X, TrendingUp, Eye, Heart, MessageCircle,
  Share2, Bookmark, Trophy, ArrowUp, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../TikTokCollections.module.css';

const ANALYTICS_FIELDS = [
  { id: 'views', label: 'Visualizações', icon: Eye, color: '#3b82f6' },
  { id: 'likes', label: 'Curtidas', icon: Heart, color: '#ef4444' },
  { id: 'comments', label: 'Comentários', icon: MessageCircle, color: '#10b981' },
  { id: 'shares', label: 'Compartilhamentos', icon: Share2, color: '#8b5cf6' },
  { id: 'saves', label: 'Salvos', icon: Bookmark, color: '#f59e0b' }
];

export const AnalyticsTracker = ({ isOpen, onClose, history, updateAnalytics, getAnalyticsSummary }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    views: '', likes: '', comments: '', shares: '', saves: ''
  });
  const [saved, setSaved] = useState(false);

  const summary = getAnalyticsSummary();

  const postedItems = history.filter(h => h.analytics);
  const unpostedItems = history.filter(h => !h.analytics).slice(0, 20);

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      views: item.analytics?.views?.toString() || '',
      likes: item.analytics?.likes?.toString() || '',
      comments: item.analytics?.comments?.toString() || '',
      shares: item.analytics?.shares?.toString() || '',
      saves: item.analytics?.saves?.toString() || ''
    });
    setSaved(false);
  };

  const handleSave = () => {
    if (!editingId) return;
    const analyticsData = {};
    ANALYTICS_FIELDS.forEach(f => {
      const val = parseInt(formData[f.id]);
      analyticsData[f.id] = isNaN(val) ? 0 : val;
    });
    updateAnalytics(editingId, analyticsData);
    setSaved(true);
    setTimeout(() => {
      setEditingId(null);
      setFormData({ views: '', likes: '', comments: '', shares: '', saves: '' });
    }, 1200);
  };

  const handleChange = (id, value) => {
    if (/^\d*$/.test(value)) {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.analyticsOverlay}>
          <motion.div
            className={styles.analyticsBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.analyticsModal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            <div className={styles.analyticsModalHeader}>
              <div className={styles.analyticsModalTitle}>
                <BarChart3 size={20} style={{ color: '#10b981' }} />
                <h3>Analytics de Desempenho</h3>
              </div>
              <button type="button" className={styles.analyticsCloseBtn} onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            <div className={styles.analyticsModalBody}>
              {summary && (
                <div className={styles.analyticsSummary}>
                  <div className={styles.analyticsSummaryHeader}>
                    <TrendingUp size={16} style={{ color: '#10b981' }} />
                    <span>Resumo de Performance</span>
                  </div>
                  <div className={styles.analyticsSummaryGrid}>
                    <div className={styles.analyticsSummaryCard}>
                      <span className={styles.analyticsSummaryValue}>{summary.totalPosted}</span>
                      <span className={styles.analyticsSummaryLabel}>Posts</span>
                    </div>
                    <div className={styles.analyticsSummaryCard}>
                      <span className={styles.analyticsSummaryValue}>
                        {summary.totalViews >= 1000 ? `${(summary.totalViews / 1000).toFixed(1)}K` : summary.totalViews}
                      </span>
                      <span className={styles.analyticsSummaryLabel}>Total Views</span>
                    </div>
                    <div className={styles.analyticsSummaryCard}>
                      <span className={styles.analyticsSummaryValue}>
                        {summary.totalLikes >= 1000 ? `${(summary.totalLikes / 1000).toFixed(1)}K` : summary.totalLikes}
                      </span>
                      <span className={styles.analyticsSummaryLabel}>Total Likes</span>
                    </div>
                    <div className={styles.analyticsSummaryCard}>
                      <span className={styles.analyticsSummaryValue}>
                        {summary.totalShares >= 1000 ? `${(summary.totalShares / 1000).toFixed(1)}K` : summary.totalShares}
                      </span>
                      <span className={styles.analyticsSummaryLabel}>Total Shares</span>
                    </div>
                  </div>

                  {summary.topPost && (
                    <div className={styles.analyticsTopPost}>
                      <Trophy size={16} style={{ color: '#f59e0b' }} />
                      <div className={styles.analyticsTopPostContent}>
                        <span className={styles.analyticsTopPostLabel}>Melhor Post</span>
                        <span className={styles.analyticsTopPostTheme}>
                          {summary.topPost.theme || 'Sem tema'}
                        </span>
                        <span className={styles.analyticsTopPostStats}>
                          {summary.topPost.analytics.views} views · {summary.topPost.analytics.likes} likes
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!summary && (
                <div className={styles.analyticsEmpty}>
                  <Star size={48} style={{ color: 'rgba(16, 185, 129, 0.4)' }} />
                  <p>Nenhum analytics registrado ainda</p>
                  <span>
                    Selecione um post do histórico, registre as métricas e acompanhe seu desempenho aqui.
                  </span>
                </div>
              )}

              {postedItems.length > 0 && (
                <div className={styles.analyticsSection}>
                  <span className={styles.analyticsSectionTitle}>
                    <ArrowUp size={14} style={{ color: '#10b981' }} />
                    Posts com Analytics
                  </span>
                  {postedItems.map(item => (
                    <div key={item.id} className={styles.analyticsItem}>
                      <div className={styles.analyticsItemInfo}>
                        <span className={styles.analyticsItemTheme}>{item.theme || 'Sem tema'}</span>
                        <div className={styles.analyticsItemStats}>
                          <span><Eye size={12} /> {item.analytics.views}</span>
                          <span><Heart size={12} /> {item.analytics.likes}</span>
                          <span><MessageCircle size={12} /> {item.analytics.comments}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={styles.analyticsEditBtn}
                        onClick={() => startEdit(item)}
                      >
                        Editar
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {editingId && (
                <div className={styles.analyticsEditForm}>
                  <span className={styles.analyticsEditFormTitle}>
                    Registrar Analytics
                  </span>
                  <div className={styles.analyticsEditFormGrid}>
                    {ANALYTICS_FIELDS.map(field => (
                      <div key={field.id} className={styles.analyticsField}>
                        <label htmlFor={`analytics-${field.id}`}>
                          <field.icon size={14} style={{ color: field.color }} />
                          {field.label}
                        </label>
                        <input
                          id={`analytics-${field.id}`}
                          type="text"
                          inputMode="numeric"
                          className={styles.analyticsFieldInput}
                          value={formData[field.id]}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.analyticsEditFormActions}>
                    <button
                      type="button"
                      className={styles.analyticsCancelBtn}
                      onClick={() => setEditingId(null)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className={`${styles.analyticsSaveBtn} ${saved ? styles.analyticsSaveSuccess : ''}`}
                      onClick={handleSave}
                    >
                      {saved ? 'Salvo!' : 'Salvar Analytics'}
                    </button>
                  </div>
                </div>
              )}

              {unpostedItems.length > 0 && !editingId && (
                <div className={styles.analyticsSection}>
                  <span className={styles.analyticsSectionTitle}>
                    Últimos sem Analytics
                  </span>
                  {unpostedItems.slice(0, 5).map(item => (
                    <div key={item.id} className={styles.analyticsItem}>
                      <div className={styles.analyticsItemInfo}>
                        <span className={styles.analyticsItemTheme}>{item.theme || 'Sem tema'}</span>
                        <span className={styles.analyticsItemDate}>
                          {new Date(item.timestamp).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <button
                        type="button"
                        className={styles.analyticsTrackBtn}
                        onClick={() => startEdit(item)}
                      >
                        <Eye size={14} />
                        Registrar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AnalyticsTracker;
