import React, { useState } from 'react';
import Sidebar from './features/generator/components/Sidebar/Sidebar';
import { Menu, Wand2, Sparkles } from 'lucide-react';
import MainLayout from './layouts/MainLayout';
import PromptForm from './features/generator/components/Form/PromptForm';
import AIModal from './features/generator/components/Form/AIModal';
import PromptPreview from './features/generator/components/Preview/PromptPreview';
import About from './features/generator/components/About/About';
import ImageStacker from './features/generator/components/ImageStacker/ImageStacker';
import ImageMontage from './features/generator/components/ImageMontage/ImageMontage';
import TikTokCollections from './features/generator/components/TikTokCollections/TikTokCollections';
import { useGenerator } from './features/generator/hooks/useGenerator';
import { GlassCard } from './components/ui/GlassCard';
import { HelpBox } from './components/ui/HelpBox';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const {
    currentMode,
    currentModeId,
    setCurrentModeId,
    formValues,
    updateField,
    addSuggestion,
    generatedPrompt,
    // New persistence features
    history,
    favorites,
    addToHistory,
    toggleFavorite,
    loadSavedItem,
    randomize,
    clearFields,
    applyPreset
  } = useGenerator();

  const isFavorite = favorites.some(f => f.prompt === generatedPrompt);

  const renderContent = () => {
    return (
      <div className={`content-grid ${currentMode.isCustom ? 'custom-full-width' : ''}`}>
        <header className="content-header">
          <motion.h1 
            key={`${currentModeId}-title`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-title"
          >
            {currentMode.title}
          </motion.h1>
          <motion.p 
            key={`${currentModeId}-desc`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="page-subtitle"
          >
            {currentMode.desc}
          </motion.p>
        </header>

        {currentMode.isCustom ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HelpBox text={currentMode.helpText} />
              {currentModeId === 'photo-montage' ? <ImageMontage /> :
               currentModeId === 'image-stacker' ? <ImageStacker /> :
               currentModeId === 'tiktok-collections' ? <TikTokCollections /> : null}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="main-grid">
            <div className="form-column">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentModeId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <HelpBox text={currentMode.helpText} />
                  {currentMode.isAbout ? (
                    <GlassCard className="p-8">
                      <About />
                    </GlassCard>
                  ) : (
                    <GlassCard className="p-8">
                      <PromptForm 
                        currentModeId={currentModeId}
                        fields={currentMode.fields}
                        values={formValues}
                        onUpdate={updateField}
                        onAddSuggestion={addSuggestion}
                        onRandomize={randomize}
                        onClear={clearFields}
                        onApplyPreset={applyPreset}
                      />
                    </GlassCard>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {!currentMode.isAbout && (
              <div className="preview-column">
                <PromptPreview 
                  prompt={generatedPrompt} 
                  onCopy={addToHistory}
                  isFavorite={isFavorite}
                  onToggleFavorite={() => toggleFavorite({
                    modeId: currentModeId,
                    values: formValues,
                    prompt: generatedPrompt
                  })}
                  formValues={formValues}
                  currentModeId={currentModeId}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Glassmorphic Header */}
      <header className="mobile-header">
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
        <div className="mobile-logo">
          <Wand2 className="mobile-logo-icon" size={24} />
          <span className="mobile-logo-text">Flow Prompt</span>
        </div>
      </header>

      <MainLayout 
        sidebar={
          <Sidebar 
            currentModeId={currentModeId} 
            onModeChange={setCurrentModeId} 
            history={history}
            favorites={favorites}
            onLoadItem={loadSavedItem}
            onToggleFavorite={toggleFavorite}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        }
        content={renderContent()}
      />
      <Analytics />

      {!currentMode.isCustom && !currentMode.isAbout && (
        <>
          <AIModal
            isOpen={isAIModalOpen}
            onClose={() => setIsAIModalOpen(false)}
            fields={currentMode.fields}
            currentModeTitle={currentMode.title}
            onSuccess={(data) => {
              if (data && typeof data === 'object') {
                clearFields();
                Object.entries(data).forEach(([key, val]) => {
                  if (currentMode.fields.some(f => f.id === key)) {
                    updateField(key, val);
                  }
                });
              }
            }}
          />

          <button
            type="button"
            className="ai-fab-btn"
            onClick={() => setIsAIModalOpen(true)}
            title="Preencher com Inteligência Artificial"
          >
            <Sparkles size={18} />
            <span>Preencher com IA</span>
          </button>
        </>
      )}
    </>
  );
}

export default App;
