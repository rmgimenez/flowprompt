import { useState, useEffect, useMemo } from 'react';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { 
  Sparkles, Folders, Copy, Check, RotateCcw, Shuffle, Info, History, X, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TikTokCollections.module.css';
import AIModal from '../Form/AIModal';
import { TikTokDrawer } from './TikTokDrawer';
import { TikTokGuide } from './TikTokGuide';
import { useTikTokHistory } from './useTikTokHistory';
import {
  STYLE_PRESETS,
  VIBE_PRESETS,
  COLOR_PRESETS,
  TARGET_PRESETS,
  COLLECTION_PRESETS,
  THEME_SUBJECTS,
  THEME_ACTIONS,
  THEME_TWISTS,
  TIKTOK_FIELDS,
  groupByCategory
} from './constants';
import { generateTikTokPrompt } from './utils';

export const TikTokCollections = () => {
  const [theme, setTheme] = useState('');
  const [quantity, setQuantity] = useState(5);
  const [selectedStyle, setSelectedStyle] = useState('normal');
  const [selectedVibe, setSelectedVibe] = useState('normal');
  const [selectedColors, setSelectedColors] = useState('normal');
  const [selectedTarget, setSelectedTarget] = useState('normal');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [portugueseText, setPortugueseText] = useState(true);
  const [activePresetId, setActivePresetId] = useState(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [currentAIPrompt, setCurrentAIPrompt] = useState('');
  
  const { history, saveToHistory, deleteHistoryItem, clearHistory, loadFromHistory } = useTikTokHistory();

  // Sincroniza o preset selecionado com os campos individuais. Se o usuário mudar manualmente algum campo, limpa o preset ativo.
  useEffect(() => {
    if (!activePresetId) return;
    const currentPreset = COLLECTION_PRESETS.find(p => p.id === activePresetId);
    if (
      currentPreset &&
      (selectedStyle !== currentPreset.style ||
       selectedVibe !== currentPreset.vibe ||
       selectedColors !== currentPreset.color ||
       selectedTarget !== currentPreset.target ||
       quantity !== currentPreset.qty ||
       notes !== currentPreset.notes)
    ) {
      const timer = setTimeout(() => {
        setActivePresetId(null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedStyle, selectedVibe, selectedColors, selectedTarget, quantity, notes, activePresetId]);

  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setSelectedStyle(preset.style);
    setSelectedVibe(preset.vibe);
    setSelectedColors(preset.color);
    setSelectedTarget(preset.target);
    setQuantity(preset.qty);
    setNotes(preset.notes);
  };

  // Atualiza o prompt em tempo real sempre que qualquer dependência mudar
  const generatedPrompt = useMemo(() => {
    return generateTikTokPrompt({
      theme,
      quantity,
      selectedStyle,
      selectedVibe,
      selectedColors,
      selectedTarget,
      notes,
      portugueseText
    });
  }, [theme, quantity, selectedStyle, selectedVibe, selectedColors, selectedTarget, notes, portugueseText]);

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    saveToHistory({
      theme,
      quantity,
      selectedStyle,
      selectedVibe,
      selectedColors,
      selectedTarget,
      notes,
      portugueseText,
      generatedPrompt,
      aiPrompt: currentAIPrompt || null
    });
    setCurrentAIPrompt('');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateRandomTheme = () => {
    const subject = THEME_SUBJECTS[Math.floor(Math.random() * THEME_SUBJECTS.length)];
    const action = THEME_ACTIONS[Math.floor(Math.random() * THEME_ACTIONS.length)];
    const twist = THEME_TWISTS[Math.floor(Math.random() * THEME_TWISTS.length)];
    setTheme(`${subject} ${action} ${twist}`);
  };

  const handleRandomize = () => {
    // Escolhe um tema criativo aleatório usando a mashup engine
    const subject = THEME_SUBJECTS[Math.floor(Math.random() * THEME_SUBJECTS.length)];
    const action = THEME_ACTIONS[Math.floor(Math.random() * THEME_ACTIONS.length)];
    const twist = THEME_TWISTS[Math.floor(Math.random() * THEME_TWISTS.length)];
    setTheme(`${subject} ${action} ${twist}`);

    // Quantidade entre 3 e 7
    setQuantity(Math.floor(Math.random() * 5) + 3);

    // Randomiza presets
    const randomStyle = STYLE_PRESETS[Math.floor(Math.random() * STYLE_PRESETS.length)].id;
    const randomVibe = VIBE_PRESETS[Math.floor(Math.random() * VIBE_PRESETS.length)].id;
    const randomColor = COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)].id;
    const randomTarget = TARGET_PRESETS[Math.floor(Math.random() * TARGET_PRESETS.length)].id;

    setSelectedStyle(randomStyle);
    setSelectedVibe(randomVibe);
    setSelectedColors(randomColor);
    setSelectedTarget(randomTarget);
    setPortugueseText(Math.random() > 0.5);
    setActivePresetId(null);
  };

  const handleClear = () => {
    setTheme('');
    setQuantity(5);
    setSelectedStyle('normal');
    setSelectedVibe('normal');
    setSelectedColors('normal');
    setSelectedTarget('normal');
    setNotes('');
    setPortugueseText(true);
    setActivePresetId(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controlsColumn}>
        <GlassCard className="p-6">
          <h3 className={styles.sectionTitle}>
            <Folders size={18} className={styles.sectionTitleIcon} />
            Configuração da Coleção TikTok
          </h3>

          {/* Presets de Alta Conversão */}
          <div className={styles.presetsSection}>
            <span className={styles.presetsSectionLabel}>
              <Sparkles size={14} style={{ color: '#ec4899' }} />
              Combos de Alta Conversão (Preenchimento Rápido)
            </span>
            <div className={styles.presetsGrid}>
              {COLLECTION_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`${styles.presetCard} ${activePresetId === preset.id ? styles.presetCardActive : ''}`}
                  onClick={() => handleSelectPreset(preset)}
                  title={`Clique para aplicar as configurações recomendadas para ${preset.label}`}
                >
                  <span className={styles.presetCardEmoji}>{preset.emoji}</span>
                  <div className={styles.presetCardContent}>
                    <span className={styles.presetCardLabel}>{preset.label}</span>
                    <span className={styles.presetCardDesc}>{preset.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tema Principal */}
          <div className={styles.controlGroup}>
            <label htmlFor="themeInput">
              Tema Principal do Post
              <span>* Obrigatório</span>
            </label>
            <div className={styles.themeInputContainer}>
              <input 
                id="themeInput"
                type="text" 
                className={styles.inputFieldTheme} 
                placeholder="Ex: Legumes bombados na academia, Capivaras cyberpunk..." 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <button
                type="button"
                className={styles.themeMagicBtn}
                onClick={handleGenerateRandomTheme}
                title="Gerar Tema Aleatório Incrível"
              >
                <Sparkles size={16} />
              </button>
            </div>
          </div>

          {/* Quantidade de Imagens (Custom Stepper) */}
          <div className={styles.controlGroup}>
            <label>Quantidade de Slides (Sequência de Imagens)</label>
            <div className={styles.quantityPicker}>
              <button 
                type="button" 
                className={styles.qtyBtn} 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                title="Diminuir slides"
                disabled={quantity <= 1}
              >
                -
              </button>
              <div className={styles.qtyDisplay}>
                <span className={styles.qtyVal}>{quantity}</span>
                <span className={styles.qtyLabel}>{quantity === 1 ? 'imagem' : 'imagens'}</span>
              </div>
              <button 
                type="button" 
                className={styles.qtyBtn} 
                onClick={() => setQuantity(prev => Math.min(20, prev + 1))}
                title="Aumentar slides"
                disabled={quantity >= 20}
              >
                +
              </button>
            </div>
          </div>

          {/* Grid de Seleção Dual 1: Estilo e Público-Alvo */}
          <div className={styles.selectorsGrid}>
            {/* Preset de Estilo */}
            <div className={styles.controlGroup}>
              <label htmlFor="styleSelect">Estilo Principal (Fórmula Nano)</label>
              <select 
                id="styleSelect"
                className={styles.selectField}
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                {Object.entries(groupByCategory(STYLE_PRESETS)).map(([category, items]) => (
                  <optgroup key={category} label={category} className={styles.optGroup}>
                    {items.map(preset => (
                      <option key={preset.id} value={preset.id} title={preset.desc}>
                        {preset.emoji ? `${preset.emoji} ` : ''}{preset.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Público-Alvo */}
            <div className={styles.controlGroup}>
              <label htmlFor="targetSelect">Público-Alvo (Cópia/Roteiro)</label>
              <select 
                id="targetSelect"
                className={styles.selectField}
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
              >
                {Object.entries(groupByCategory(TARGET_PRESETS)).map(([category, items]) => (
                  <optgroup key={category} label={category} className={styles.optGroup}>
                    {items.map(preset => (
                      <option key={preset.id} value={preset.id} title={preset.desc}>
                        {preset.emoji ? `${preset.emoji} ` : ''}{preset.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Grid de Seleção Dual 2: Vibe e Paleta de Cores */}
          <div className={styles.selectorsGrid}>
            {/* Tom / Vibe */}
            <div className={styles.controlGroup}>
              <label htmlFor="vibeSelect">Tom / Vibe do Post</label>
              <select 
                id="vibeSelect"
                className={styles.selectField}
                value={selectedVibe}
                onChange={(e) => setSelectedVibe(e.target.value)}
              >
                {Object.entries(groupByCategory(VIBE_PRESETS)).map(([category, items]) => (
                  <optgroup key={category} label={category} className={styles.optGroup}>
                    {items.map(preset => (
                      <option key={preset.id} value={preset.id} title={preset.desc}>
                        {preset.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Paleta de Cores */}
            <div className={styles.controlGroup}>
              <label htmlFor="colorSelect">Paleta de Cores (Diretriz Visual)</label>
              <select 
                id="colorSelect"
                className={styles.selectField}
                value={selectedColors}
                onChange={(e) => setSelectedColors(e.target.value)}
              >
                {Object.entries(groupByCategory(COLOR_PRESETS)).map(([category, items]) => (
                  <optgroup key={category} label={category} className={styles.optGroup}>
                    {items.map(preset => (
                      <option key={preset.id} value={preset.id} title={preset.value}>
                        {preset.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Texto em Português Opcional */}
          <label className={styles.toggleRow} htmlFor="portugueseTextToggle">
            <input 
              id="portugueseTextToggle"
              type="checkbox"
              className={styles.toggleInput}
              checked={portugueseText}
              onChange={(e) => setPortugueseText(e.target.checked)}
            />
            <div className={styles.toggleSwitch}></div>
            <div className={styles.toggleLabelText}>
              <span className={styles.toggleLabelTitle}>Forçar Texto das Imagens em Português</span>
              <span className={styles.toggleLabelDesc}>Caso as imagens contenham letreiros, placas ou camisas, força o texto em PT-BR.</span>
            </div>
          </label>

          {/* Observações Opcionais */}
          <div className={styles.controlGroup}>
            <label htmlFor="notesInput">Observações ou Refinamentos Específicos</label>
            <textarea 
              id="notesInput"
              className={styles.textareaField} 
              placeholder="Ex: Adicionar uma uva roxa sarcástica nos slides 2 e 4. Garantir iluminação dramática no final..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Ações Criativas */}
          <div className={styles.actionButtonsRow}>
            <button 
              type="button" 
              className={styles.resetBtn} 
              onClick={handleClear}
              title="Resetar todos os campos"
            >
              <RotateCcw size={16} />
              Limpar Campos
            </button>
            <button 
              type="button" 
              className={styles.randBtn} 
              onClick={handleRandomize}
              title="Gerar sugestões criativas"
            >
              <Shuffle size={16} />
              Idéia Aleatória
            </button>
          </div>

          {/* Guia Prático & Dicas de Alta Conversão */}
          <TikTokGuide />
        </GlassCard>
      </div>

      {/* Preview e Cópia do Prompt */}
      <div className={styles.workspaceColumn}>
        <GlassCard className="p-0 overflow-hidden" style={{ background: 'rgba(10, 10, 18, 0.4)' }}>
          <div className={styles.editorContainer}>
            <div className={styles.editorHeader}>
              <div className={styles.macControls}>
                <span className={`${styles.macDot} ${styles.macDotRed}`}></span>
                <span className={`${styles.macDot} ${styles.macDotYellow}`}></span>
                <span className={`${styles.macDot} ${styles.macDotGreen}`}></span>
              </div>
              <div className={styles.editorTab}>
                <Sparkles size={12} className={styles.tabIcon} style={{ color: '#ec4899' }} />
                <span className={styles.tabName}>prompt_mestre.md</span>
              </div>
              <button 
                className={`${styles.editorCopyBtn} ${copied ? styles.editorCopySuccess : ''}`}
                onClick={handleCopy}
                disabled={!theme.trim()}
                title={theme.trim() ? "Copiar prompt completo" : "Preencha o tema para habilitar"}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copiado!' : 'Copiar Prompt'}</span>
              </button>
            </div>

            {theme.trim() ? (
              <pre className={styles.outputArea}>{generatedPrompt}</pre>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIconContainer}>
                  <Sparkles size={40} className={styles.emptyStateIcon} />
                </div>
                <p className={styles.emptyStateText}>
                  Preencha o **Tema Principal** na coluna esquerda para visualizar o prompt gerado em tempo real.
                </p>
              </div>
            )}
          </div>

          <div className="p-6 pt-0">
            <div className={styles.infoBox}>
              <Info size={16} className={styles.infoIcon} />
              <p className={styles.infoText}>
                <strong>Como usar:</strong> Cole o prompt copiado no seu chat de IA. Ele irá gerar a legenda do post e os JSONs individuais de cada imagem prontos em **artefatos separados**. Copie cada JSON gerado e use na <strong>Foto Nova (Nano Banana)</strong> aqui no FlowPrompt para gerar as imagens perfeitas!
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* AI Modal & FAB button for TikTok Collections screen */}
      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        fields={TIKTOK_FIELDS}
        currentModeTitle="Configuração da Coleção TikTok"
        onSuccess={(data, aiPrompt) => {
          setCurrentAIPrompt(aiPrompt);
          if (data && typeof data === 'object') {
            // Wipes previous form state clean
            setTheme('');
            setQuantity(5);
            setSelectedStyle('normal');
            setSelectedVibe('normal');
            setSelectedColors('normal');
            setSelectedTarget('normal');
            setPortugueseText(true);
            setNotes('');
            setActivePresetId(null);

            if (data.theme !== undefined) setTheme(data.theme);
            if (data.quantity !== undefined) setQuantity(Math.max(1, parseInt(data.quantity) || 5));
            if (data.selectedStyle !== undefined) setSelectedStyle(data.selectedStyle);
            if (data.selectedTarget !== undefined) setSelectedTarget(data.selectedTarget);
            if (data.selectedVibe !== undefined) setSelectedVibe(data.selectedVibe);
            if (data.selectedColors !== undefined) setSelectedColors(data.selectedColors);
            
            // Sempre forçar textos das imagens em português marcado ao preencher com IA
            setPortugueseText(true);
            
            if (data.notes !== undefined) setNotes(data.notes);
          }
        }}
      />

      {/* TikTok Carrossel Mockup Drawer */}
      <TikTokDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        config={{
          theme,
          quantity,
          selectedStyle,
          selectedColors
        }}
        STYLE_PRESETS={STYLE_PRESETS}
        COLOR_PRESETS={COLOR_PRESETS}
      />

      <button
        type="button"
        className={styles.tiktokFabBtn}
        onClick={() => setIsDrawerOpen(true)}
        title="Visualizar Mockup Interativo do TikTok"
      >
        <span style={{ fontSize: '18px' }}>📱</span>
        <span>Visualizar Carrossel</span>
      </button>

      <button
        type="button"
        className="ai-fab-btn"
        onClick={() => {
          setIsAIModalOpen(true);
          setPortugueseText(true);
        }}
        title="Preencher com Inteligência Artificial"
      >
        <Sparkles size={18} />
        <span>Preencher com IA</span>
      </button>

      <button
        type="button"
        className={styles.historyFabBtn}
        onClick={() => setIsHistoryModalOpen(true)}
        title="Ver Histórico de Gerações"
      >
        <History size={18} />
        <span>Histórico</span>
      </button>

      {/* History Modal */}
      <AnimatePresence>
        {isHistoryModalOpen && (
          <div className={styles.historyModalOverlay}>
            <motion.div
              className={styles.historyModalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsHistoryModalOpen(false);
                setSelectedHistoryItem(null);
              }}
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
                  onClick={() => {
                    setIsHistoryModalOpen(false);
                    setSelectedHistoryItem(null);
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {history.length === 0 ? (
                <div className={styles.historyEmptyState}>
                  <History size={48} className={styles.historyEmptyIcon} />
                  <p>Nenhum histórico encontrado</p>
                  <span>As gerações aparecerão aqui quando você copiar o prompt</span>
                </div>
              ) : (
                <div className={styles.historyModalBody}>
                  {selectedHistoryItem ? (
                    <div className={styles.historyDetailView}>
                      <button
                        type="button"
                        className={styles.historyBackBtn}
                        onClick={() => setSelectedHistoryItem(null)}
                      >
                        ← Voltar à lista
                      </button>
                      <div className={styles.historyDetailContent}>
                        <div className={styles.historyDetailHeader}>
                          <h4>Detalhes da Geração</h4>
                          <span className={styles.historyDetailDate}>
                            {new Date(selectedHistoryItem.timestamp).toLocaleString('pt-BR')}
                          </span>
                        </div>
                        
                        <div className={styles.historyDetailGrid}>
                          <div className={styles.historyDetailItem}>
                            <label>Tema</label>
                            <span>{selectedHistoryItem.theme || '-'}</span>
                          </div>
                          <div className={styles.historyDetailItem}>
                            <label>Quantidade</label>
                            <span>{selectedHistoryItem.quantity}</span>
                          </div>
                          <div className={styles.historyDetailItem}>
                            <label>Estilo</label>
                            <span>{selectedHistoryItem.selectedStyle}</span>
                          </div>
                          <div className={styles.historyDetailItem}>
                            <label>Vibe</label>
                            <span>{selectedHistoryItem.selectedVibe}</span>
                          </div>
                          <div className={styles.historyDetailItem}>
                            <label>Cores</label>
                            <span>{selectedHistoryItem.selectedColors}</span>
                          </div>
                          <div className={styles.historyDetailItem}>
                            <label>Público-Alvo</label>
                            <span>{selectedHistoryItem.selectedTarget}</span>
                          </div>
                          <div className={styles.historyDetailItem}>
                            <label>Texto em Português</label>
                            <span>{selectedHistoryItem.portugueseText ? 'Sim' : 'Não'}</span>
                          </div>
                          <div className={styles.historyDetailItem}>
                            <label>Gerado por IA</label>
                            <span>{selectedHistoryItem.isFromAI ? 'Sim' : 'Não'}</span>
                          </div>
                        </div>

                        {selectedHistoryItem.aiPrompt && (
                          <div className={styles.historyDetailFull}>
                            <label>Prompt para IA</label>
                            <div className={styles.historyPromptBox}>
                              {selectedHistoryItem.aiPrompt}
                            </div>
                          </div>
                        )}

                        {selectedHistoryItem.notes && (
                          <div className={styles.historyDetailFull}>
                            <label>Observações</label>
                            <span>{selectedHistoryItem.notes}</span>
                          </div>
                        )}

                        <div className={styles.historyDetailFull}>
                          <label>Prompt Gerado</label>
                          <pre className={styles.historyPromptBox}>
                            {selectedHistoryItem.generatedPrompt}
                          </pre>
                        </div>

                        <div className={styles.historyDetailActions}>
                          <button
                            type="button"
                            className={styles.historyLoadBtn}
                            onClick={() => {
                              const data = loadFromHistory(selectedHistoryItem);
                              setTheme(data.theme);
                              setQuantity(data.quantity);
                              setSelectedStyle(data.selectedStyle);
                              setSelectedVibe(data.selectedVibe);
                              setSelectedColors(data.selectedColors);
                              setSelectedTarget(data.selectedTarget);
                              setNotes(data.notes);
                              setPortugueseText(data.portugueseText);
                              setActivePresetId(null);
                              setCurrentAIPrompt(selectedHistoryItem.aiPrompt || '');
                              setIsHistoryModalOpen(false);
                              setSelectedHistoryItem(null);
                            }}
                          >
                            <Sparkles size={16} />
                            Usar esta Configuração
                          </button>
                          <button
                            type="button"
                            className={styles.historyDeleteBtn}
                            onClick={() => {
                              deleteHistoryItem(selectedHistoryItem.id);
                              setSelectedHistoryItem(null);
                            }}
                          >
                            <Trash2 size={16} />
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.historyList}>
                      {history.map((item) => (
                        <div
                          key={item.id}
                          className={styles.historyItem}
                          onClick={() => setSelectedHistoryItem(item)}
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
                                  deleteHistoryItem(item.id);
                                }
                              }}
                              title="Excluir item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {history.length > 0 && !selectedHistoryItem && (
                <div className={styles.historyModalFooter}>
                  <button
                    type="button"
                    className={styles.historyClearBtn}
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja limpar todo o histórico?')) {
                        clearHistory();
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
    </div>
  );
};

export default TikTokCollections;
