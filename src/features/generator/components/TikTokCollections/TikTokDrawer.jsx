import { useState, useEffect } from 'react';
import {
  X, Sparkles, Heart, MessageCircle, Bookmark, Share2,
  ArrowLeft, ArrowRight, Check, Copy, AlertTriangle,
  AlertCircle, CheckCircle, RefreshCw
} from 'lucide-react';
import styles from './TikTokDrawer.module.css';
import { parseAIResponse, buildParserFeedback } from './utils/parseAIResponse';

export const TikTokDrawer = ({
  isOpen,
  onClose,
  config,
  STYLE_PRESETS,
  COLOR_PRESETS
}) => {
  const {
    theme = '',
    quantity = 5,
    selectedStyle = 'normal',
    selectedColors = 'normal'
  } = config || {};

  const [activeSlide, setActiveSlide] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [rawText, setRawText] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [parserFeedback, setParserFeedback] = useState(null);
  const [copiedSlideIndex, setCopiedSlideIndex] = useState(null);
  const [captionExpanded, setCaptionExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsImportOpen(false);
        setRawText('');
        setParserFeedback(null);
      } else {
        setActiveSlide(0);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleProcessImport = () => {
    if (!rawText.trim()) {
      setParserFeedback({
        type: 'error',
        message: 'Por favor, cole o texto de resposta da IA.'
      });
      return;
    }

    try {
      const data = parseAIResponse(rawText, theme);
      const feedback = buildParserFeedback(data.slides, !!data.title, !!data.caption);

      if (data.slides.length === 0) {
        setParserFeedback(feedback);
        return;
      }

      setParsedData(data);
      setActiveSlide(0);
      setParserFeedback(feedback);

      if (feedback.type === 'success') {
        setTimeout(() => {
          setIsImportOpen(false);
          setParserFeedback(null);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setParserFeedback({
        type: 'error',
        message: 'Ocorreu um erro inesperado ao analisar o texto colado. Verifique o formato.'
      });
    }
  };

  const handleClearImport = () => {
    setRawText('');
    setParserFeedback(null);
  };

  const handleResetToSimulation = () => {
    setParsedData(null);
    setParserFeedback(null);
    setRawText('');
    setActiveSlide(0);
  };

  const handleCopySlideJson = (slideJsonString, index) => {
    navigator.clipboard.writeText(slideJsonString);
    setCopiedSlideIndex(index);
    setTimeout(() => setCopiedSlideIndex(null), 2000);
  };

  const handlePrevSlide = () => {
    const total = parsedData ? parsedData.slides.length : quantity;
    setActiveSlide((prev) => {
      const current = prev >= total ? 0 : prev;
      return current === 0 ? total - 1 : current - 1;
    });
  };

  const handleNextSlide = () => {
    const total = parsedData ? parsedData.slides.length : quantity;
    setActiveSlide((prev) => {
      const current = prev >= total ? 0 : prev;
      return current === total - 1 ? 0 : current + 1;
    });
  };

  const styleObj = STYLE_PRESETS.find(s => s.id === selectedStyle);
  const colorObj = COLOR_PRESETS.find(c => c.id === selectedColors);

  const totalSlides = parsedData ? parsedData.slides.length : quantity;
  const displaySlideIndex = activeSlide >= totalSlides ? 0 : activeSlide;
  const gradientClass = styles[`gradient_${selectedColors}`] || styles.gradient_normal;

  return (
    <>
      <div
        className={`${styles.drawerOverlay} ${isOpen ? styles.drawerOverlayActive : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.drawerContent} ${isOpen ? styles.drawerContentActive : ''}`}>

        <div className={styles.drawerHeader}>
          <div className={styles.drawerHeaderInfo}>
            <h3>
              <Sparkles size={16} style={{ color: '#ec4899' }} />
              Visualização de Carrossel
            </h3>
            <p>Simule a atitude e estética do seu post no feed do TikTok</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} title="Fechar Visualização">
            <X size={18} />
          </button>
        </div>

        <div className={styles.drawerBody}>

          <div className={styles.phoneWrapper}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneDynamicIsland} />

              <div className={styles.phoneScreen}>

                <div className={styles.phoneScreenHeader}>
                  <span className={styles.phoneTime}>08:08</span>
                  <div className={styles.phoneStatusIcons}>
                    <span>5G</span>
                    <div style={{ width: '16px', height: '8px', border: '1px solid #ffffff', borderRadius: '2px', display: 'inline-block' }} />
                  </div>
                </div>

                <div className={styles.phoneTikTokNav}>
                  <span>Seguindo</span>
                  <span className={styles.phoneTikTokNavActive}>Para Você</span>
                </div>

                <div className={styles.progressIndicatorBar}>
                  {displaySlideIndex + 1} / {totalSlides}
                </div>

                {totalSlides > 1 && (
                  <>
                    <button className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`} onClick={handlePrevSlide}>
                      <ArrowLeft size={16} />
                    </button>
                    <button className={`${styles.carouselArrow} ${styles.carouselArrowRight}`} onClick={handleNextSlide}>
                      <ArrowRight size={16} />
                    </button>
                  </>
                )}

                <div className={styles.phoneRightOverlay}>
                  <div className={styles.rightOverlayItem}>
                    <div className={styles.avatarRing}>
                      <span style={{ fontSize: '10px' }}>🎬</span>
                      <div className={styles.avatarPlus}>+</div>
                    </div>
                  </div>
                  <div className={styles.rightOverlayItem} onClick={() => setIsLiked(!isLiked)}>
                    <Heart size={26} fill={isLiked ? '#ff3b30' : 'none'} stroke={isLiked ? '#ff3b30' : '#ffffff'} />
                    <span>{isLiked ? '1.2M' : '1.1M'}</span>
                  </div>
                  <div className={styles.rightOverlayItem}>
                    <MessageCircle size={26} fill="none" stroke="#ffffff" />
                    <span>4,832</span>
                  </div>
                  <div className={styles.rightOverlayItem}>
                    <Bookmark size={26} fill="none" stroke="#ffffff" />
                    <span>245K</span>
                  </div>
                  <div className={styles.rightOverlayItem}>
                    <Share2 size={26} fill="none" stroke="#ffffff" />
                    <span>68K</span>
                  </div>
                </div>

                <div className={styles.phoneBottomOverlay}>
                  <span className={styles.bottomUser}>@flowprompt</span>

                  {parsedData ? (
                    <div className={`${styles.bottomCaption} ${captionExpanded ? styles.bottomCaptionExpanded : ''}`}>
                      <strong>{parsedData.title}</strong> — {parsedData.caption} {parsedData.hashtags}
                      {parsedData.caption.length > 50 && (
                        <button
                          className={styles.captionMoreBtn}
                          onClick={() => setCaptionExpanded(!captionExpanded)}
                        >
                          {captionExpanded ? ' menos' : '... mais'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className={styles.bottomCaption}>
                      <strong>{theme || 'Sem Tema Definido'}</strong> — Cole seu retorno da IA para atualizar a legenda e obter ganchos e hashtags reais ajustados para o público. #viral #flowprompt
                    </div>
                  )}

                  <div className={styles.musicRow}>
                    <span style={{ fontSize: '10px' }}>🎵</span>
                    <span>Som Original - flowprompt</span>
                  </div>
                  <div className={styles.spinningVinyl}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ec4899' }} />
                  </div>
                </div>

                <div className={styles.carouselContainer}>
                  {parsedData ? (
                    parsedData.slides.map((slide, index) => {
                      const subjectText = slide.parsed?.subject?.primary?.description || 'Descrição da cena não identificada';
                      const actionText = slide.parsed?.subject?.primary?.action || 'Ação não identificada';
                      const framing = slide.parsed?.composition?.framing || 'Média';
                      const keyLight = slide.parsed?.environment?.lighting?.key_light || 'Luz natural';
                      const styleVal = slide.parsed?.style_and_quality?.medium || 'Fotografia';

                      return (
                        <div
                          key={index}
                          className={`${styles.slide} ${gradientClass} ${displaySlideIndex === index ? styles.slideActive : ''}`}
                        >
                          <div className={styles.slideGlassCard}>
                            <span className={styles.slideBadge}>
                              Slide {index + 1}
                            </span>
                            <h4 className={styles.slideTitle}>
                              Cena Coesa
                            </h4>
                            <p className={styles.slideText} title={`${subjectText} - ${actionText}`}>
                              <strong>Assunto:</strong> {subjectText} ({actionText})
                            </p>

                            <div className={styles.promptDetails}>
                              <span className={styles.promptDetailItem}>
                                <strong>Enquadramento:</strong> {framing}
                              </span>
                              <span className={styles.promptDetailItem}>
                                <strong>Iluminação:</strong> {keyLight}
                              </span>
                              <span className={styles.promptDetailItem}>
                                <strong>Mídia/Estilo:</strong> {styleVal}
                              </span>
                            </div>

                            <button
                              className={`${styles.copySlideJsonBtn} ${copiedSlideIndex === index ? styles.copySlideJsonBtnSuccess : ''}`}
                              onClick={() => handleCopySlideJson(slide.raw, index)}
                              title="Copiar JSON desse slide para a Foto Nova"
                            >
                              {copiedSlideIndex === index ? <Check size={12} /> : <Copy size={12} />}
                              {copiedSlideIndex === index ? 'Prompt Copiado!' : 'Copiar JSON do Slide'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    Array.from({ length: quantity }).map((_, index) => {
                      let hookTitle = `📈 Desenvolvimento #${index}`;
                      let hookDesc = `Narrativa lógica que aprofunda o tema com o estilo "${styleObj?.label || 'Padrão'}". Mantém o usuário deslizando.`;

                      if (index === 0) {
                        hookTitle = `🚨 O Gancho (Hook)`;
                        hookDesc = `O primeiro segundo crucial! Aparição com impacto visual extremo para impedir que o espectador passe o feed.`;
                      } else if (index === quantity - 1) {
                        hookTitle = `🔥 Clímax / Desfecho`;
                        hookDesc = `O ápice da curiosidade revelada! Conclusão, lição final ou um twist cômico surpreendente com CTA de engajamento.`;
                      }

                      return (
                        <div
                          key={index}
                          className={`${styles.slide} ${gradientClass} ${displaySlideIndex === index ? styles.slideActive : ''}`}
                        >
                          <div className={styles.slidePlaceholder}>
                            <div className={styles.slideGlassCard}>
                              <span className={styles.slideBadge}>
                                Planejado
                              </span>
                              <h4 className={styles.slideTitle}>
                                {hookTitle}
                              </h4>
                              <p className={styles.slideText}>
                                {hookDesc}
                              </p>
                              <div className={styles.promptDetails} style={{ borderTop: 'none' }}>
                                <span className={styles.promptDetailItem} style={{ color: 'rgba(255,255,255,0.4)' }}>
                                  Estilo: {styleObj?.label || 'Sem Filtro'}
                                </span>
                                <span className={styles.promptDetailItem} style={{ color: 'rgba(255,255,255,0.4)' }}>
                                  Paleta: {colorObj?.label || 'Natural'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className={`${styles.importOverlay} ${isImportOpen ? styles.importOverlayActive : ''}`}>
                  <div className={styles.importHeader}>
                    <h4>
                      <Sparkles size={14} style={{ color: '#ec4899' }} />
                      Importar Resposta da IA
                    </h4>
                    <button
                      className={styles.importHeaderCloseBtn}
                      onClick={() => setIsImportOpen(false)}
                      title="Voltar ao mockup"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <p className={styles.importDesc}>
                    Cole abaixo a resposta bruta gerada pelo seu Chat GPT ou Claude (contendo o título, legenda e os blocos de código JSON dos slides).
                  </p>

                  <textarea
                    className={styles.importTextarea}
                    placeholder="Cole aqui o texto..."
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                  />

                  {parserFeedback && (
                    <div className={`${styles.importFeedback} ${
                      parserFeedback.type === 'error' ? styles.importFeedbackError :
                      parserFeedback.type === 'warning' ? styles.importFeedbackWarning :
                      styles.importFeedbackSuccess
                    }`}>
                      {parserFeedback.type === 'error' ? <AlertCircle size={14} /> :
                       parserFeedback.type === 'warning' ? <AlertTriangle size={14} /> :
                       <CheckCircle size={14} />}
                      <span>{parserFeedback.message}</span>
                    </div>
                  )}

                  <div className={styles.importActionRow}>
                    <button className={styles.importClearBtn} onClick={handleClearImport}>
                      Limpar
                    </button>
                    <button
                      className={styles.importProcessBtn}
                      onClick={handleProcessImport}
                      disabled={!rawText.trim()}
                    >
                      Processar Prompts
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {!parsedData ? (
            <button
              className={styles.importPanelToggleBtn}
              onClick={() => setIsImportOpen(true)}
              title="Colar legenda e JSONs gerados pela IA"
            >
              <Sparkles size={14} />
              Importar Retorno da IA
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'center' }}>
              <button
                className={`${styles.importPanelToggleBtn} ${styles.importPanelToggleBtnActive}`}
                onClick={handleResetToSimulation}
                title="Voltar ao modo simulador de rascunho"
              >
                <RefreshCw size={14} />
                Resetar para Rascunho
              </button>
              <button
                className={styles.importPanelToggleBtn}
                onClick={() => setIsImportOpen(true)}
                title="Colar legenda e JSONs atualizados"
              >
                <Sparkles size={14} />
                Re-Importar IA
              </button>
            </div>
          )}

          <div className={styles.drawerInstructions}>
            <h4 className={styles.drawerInstructionsTitle}>
              💡 Dica de Fluxo Rápido
            </h4>
            <p className={styles.drawerInstructionsText}>
              Copie o Prompt Mestre gerado na tela principal e envie para a IA. Assim que ela te der os resultados, clique em <strong>"Importar Retorno da IA"</strong> acima, cole tudo aqui dentro e extraia facilmente a legenda e cada um dos JSONs de imagem com um clique!
            </p>
          </div>

        </div>

      </div>
    </>
  );
};

export default TikTokDrawer;
