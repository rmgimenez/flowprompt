import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertCircle, WandSparkles } from 'lucide-react';
import { fillFormWithAI } from '../../utils/aiFiller';
import styles from './AIModal.module.css';

const NO_IDEA_PROMPT = 'Crie algo criativo e aleatório para o TikTok, sem tema específico definido por mim. Use sua criatividade para sugerir algo único, original e com alto potencial viral. Escolha personagens, cenários, estilos visuais e narrativas que sejam surpreendentes e chamativos. Pode ser qualquer coisa: um dia a dia cômico de personagens inusitados, uma transformação visual impactante, um mini-documentário estilizado, ou uma trend fictícia. Me surpreenda!';

const AIModal = ({ isOpen, onClose, fields, currentModeTitle, onSuccess }) => {
  const [promptText, setPromptText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fillFormWithAI(promptText, fields, currentModeTitle);
      onSuccess(data, promptText);
      setPromptText('');
      onClose();
    } catch (err) {
      console.error('AI fill error:', err);
      if (err.message === 'API_KEY_MISSING') {
        setError('A chave da API do OpenRouter não foi configurada. Crie e preencha a variável VITE_OPENROUTER_API_KEY no arquivo .env.');
      } else {
        setError(err.message || 'Ocorreu um erro ao consultar a inteligência artificial.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoIdea = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fillFormWithAI(NO_IDEA_PROMPT, fields, currentModeTitle);
      onSuccess(data, '');
      onClose();
    } catch (err) {
      console.error('AI no-idea error:', err);
      if (err.message === 'API_KEY_MISSING') {
        setError('A chave da API do OpenRouter não foi configurada. Crie e preencha a variável VITE_OPENROUTER_API_KEY no arquivo .env.');
      } else {
        setError(err.message || 'Ocorreu um erro ao consultar a inteligência artificial.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalOverlay}>
          {/* Backdrop blur dynamic click-to-close */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isLoading ? onClose : undefined}
          />

          {/* Modal box */}
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            <div className={styles.modalHeader}>
              <div className={styles.titleGroup}>
                <Sparkles className={styles.titleIcon} size={20} />
                <h3 className={styles.modalTitle}>Preencher com Inteligência Artificial</h3>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                disabled={isLoading}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <p className={styles.modalDescription}>
                Escreva abaixo o que deseja que a IA gere para esta tela (<strong>{currentModeTitle}</strong>). 
                A IA interpretará a sua descrição e preencherá automaticamente todos os campos do formulário para você.
              </p>

              <div className={styles.textareaContainer}>
                <textarea
                  className={styles.textarea}
                  placeholder="Ex: vlog engraçado e enérgico no TikTok onde um morango assustado conversa de forma dramática com um abacaxi calmo..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  disabled={isLoading}
                  rows={5}
                  required
                  autoFocus
                />
              </div>

              {!promptText.trim() && !isLoading && !error && (
                <button
                  type="button"
                  className={styles.noIdeaBtn}
                  onClick={handleNoIdea}
                >
                  <WandSparkles size={16} />
                  <span>Sem ideias? Gere algo aleatório com IA</span>
                </button>
              )}

              {error && (
                <div className={styles.errorBox}>
                  <AlertCircle size={16} className={styles.errorIcon} />
                  <span className={styles.errorMessage}>{error}</span>
                </div>
              )}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading || !promptText.trim()}
                >
                  {isLoading ? (
                    <>
                      <div className={styles.spinner} />
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Preencher Tela</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AIModal;
