import { Sparkles, History, Copy, Check, BarChart3 } from 'lucide-react';
import styles from '../../TikTokCollections.module.css';

export const FloatingActionButtons = ({
  onAIClick,
  onHistoryClick,
  onCopy,
  onAnalyticsClick,
  copied,
  isThemeEmpty
}) => {
  return (
    <>
      <button
        type="button"
        className="ai-fab-btn"
        onClick={onAIClick}
        title="Preencher com Inteligência Artificial"
      >
        <Sparkles size={18} />
        <span>Preencher com IA</span>
      </button>

      <button
        type="button"
        className={styles.historyFabBtn}
        onClick={onHistoryClick}
        title="Ver Histórico de Gerações"
      >
        <History size={18} />
        <span>Histórico</span>
      </button>

      <button
        type="button"
        className={`${styles.copyFabBtn} ${copied ? styles.copyFabSuccess : ''}`}
        onClick={onCopy}
        disabled={isThemeEmpty}
        title={isThemeEmpty ? "Preencha o tema para habilitar" : "Copiar prompt completo"}
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        <span>{copied ? 'Copiado!' : 'Copiar Prompt'}</span>
      </button>

      <button
        type="button"
        className={styles.analyticsFabBtn}
        onClick={onAnalyticsClick}
        title="Analytics de Desempenho"
      >
        <BarChart3 size={18} />
        <span>Analytics</span>
      </button>
    </>
  );
};
