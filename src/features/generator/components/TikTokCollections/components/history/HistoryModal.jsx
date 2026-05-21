import { useState } from 'react';
import { History, X, Sparkles, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../TikTokCollections.module.css';

const HistoryEmptyState = () => (
  <div className={styles.historyEmptyState}>
    <History size={48} className={styles.historyEmptyIcon} />
    <p>Nenhum histórico encontrado</p>
    <span>As gerações aparecerão aqui quando você copiar o prompt</span>
  </div>
);

const HistoryListItem = ({ item, onSelect, onDelete }) => (
  <div
    className={styles.historyItem}
    onClick={() => onSelect(item)}
  >
    <div className={styles.historyItemInfo}>
      <span className={styles.historyItemTheme}>{item.theme || 'Sem tema'}</span>
      <span className={styles.historyItemDate}>
        {new Date(item.timestamp).toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    </div>
    <div className={styles.historyItemMeta}>
      <span className={styles.historyItemQty}>{item.quantity} imgs</span>
      {item.isFromAI && (
        <span className={styles.historyItemAI}>🤖 IA</span>
      )}
      <button
        type="button"
        className={styles.historyItemDeleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm('Excluir este item do histórico?')) {
            onDelete(item.id);
          }
        }}
        title="Excluir item"
      >
        <Trash2 size={14} />
      </button>
    </div>
  </div>
);

const HistoryDetailView = ({ item, onBack, onLoad, onDelete }) => (
  <div className={styles.historyDetailView}>
    <button
      type="button"
      className={styles.historyBackBtn}
      onClick={onBack}
    >
      ← Voltar à lista
    </button>
    <div className={styles.historyDetailContent}>
      <div className={styles.historyDetailHeader}>
        <h4>Detalhes da Geração</h4>
        <span className={styles.historyDetailDate}>
          {new Date(item.timestamp).toLocaleString('pt-BR')}
        </span>
      </div>

      <div className={styles.historyDetailGrid}>
        <div className={styles.historyDetailItem}>
          <label>Tema</label>
          <span>{item.theme || '-'}</span>
        </div>
        <div className={styles.historyDetailItem}>
          <label>Quantidade</label>
          <span>{item.quantity}</span>
        </div>
        <div className={styles.historyDetailItem}>
          <label>Estilo</label>
          <span>{item.selectedStyle}</span>
        </div>
        <div className={styles.historyDetailItem}>
          <label>Vibe</label>
          <span>{item.selectedVibe}</span>
        </div>
        <div className={styles.historyDetailItem}>
          <label>Cores</label>
          <span>{item.selectedColors}</span>
        </div>
        <div className={styles.historyDetailItem}>
          <label>Público-Alvo</label>
          <span>{item.selectedTarget}</span>
        </div>
        <div className={styles.historyDetailItem}>
          <label>Texto em Português</label>
          <span>{item.portugueseText ? 'Sim' : 'Não'}</span>
        </div>
        <div className={styles.historyDetailItem}>
          <label>Gerado por IA</label>
          <span>{item.isFromAI ? 'Sim' : 'Não'}</span>
        </div>
      </div>

      {item.aiPrompt && (
        <div className={styles.historyDetailFull}>
          <label>Prompt para IA</label>
          <div className={styles.historyPromptBox}>
            {item.aiPrompt}
          </div>
        </div>
      )}

      {item.notes && (
        <div className={styles.historyDetailFull}>
          <label>Observações</label>
          <span>{item.notes}</span>
        </div>
      )}

      <div className={styles.historyDetailFull}>
        <label>Prompt Gerado</label>
        <pre className={styles.historyPromptBox}>
          {item.generatedPrompt}
        </pre>
      </div>

      <div className={styles.historyDetailActions}>
        <button
          type="button"
          className={styles.historyLoadBtn}
          onClick={() => onLoad(item)}
        >
          <Sparkles size={16} />
          Usar esta Configuração
        </button>
        <button
          type="button"
          className={styles.historyDeleteBtn}
          onClick={() => {
            onDelete(item.id);
            onBack();
          }}
        >
          <Trash2 size={16} />
          Excluir
        </button>
      </div>
    </div>
  </div>
);

export const HistoryModal = ({
  isOpen,
  onClose,
  history,
  onDeleteItem,
  onClearHistory,
  onLoadFromHistory
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClose = () => {
    onClose();
    setSelectedItem(null);
  };

  const handleLoad = (item) => {
    onLoadFromHistory(item);
    setSelectedItem(null);
  };

  const handleDelete = (id) => {
    onDeleteItem(id);
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.historyModalOverlay}>
          <motion.div
            className={styles.historyModalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className={styles.historyModalContent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            <div className={styles.historyModalHeader}>
              <div className={styles.historyModalTitle}>
                <History size={20} />
                <h3>Histórico de Gerações</h3>
              </div>
              <button
                type="button"
                className={styles.historyModalCloseBtn}
                onClick={handleClose}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.historyModalBody}>
              {history.length === 0 ? (
                <HistoryEmptyState />
              ) : (
                selectedItem ? (
                  <HistoryDetailView
                    item={selectedItem}
                    onBack={() => setSelectedItem(null)}
                    onLoad={handleLoad}
                    onDelete={handleDelete}
                  />
                ) : (
                  <div className={styles.historyList}>
                    {history.map((item) => (
                      <HistoryListItem
                        key={item.id}
                        item={item}
                        onSelect={setSelectedItem}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )
              )}
            </div>

            {history.length > 0 && !selectedItem && (
              <div className={styles.historyModalFooter}>
                <button
                  type="button"
                  className={styles.historyClearBtn}
                  onClick={() => {
                    if (window.confirm('Tem certeza que deseja limpar todo o histórico?')) {
                      onClearHistory();
                    }
                  }}
                >
                  <Trash2 size={16} />
                  Limpar Todo Histórico
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
