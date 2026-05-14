import React from 'react';
import Sidebar from './features/generator/components/Sidebar/Sidebar';
import MainLayout from './layouts/MainLayout';
import PromptForm from './features/generator/components/Form/PromptForm';
import PromptPreview from './features/generator/components/Preview/PromptPreview';
import About from './features/generator/components/About/About';
import { useGenerator } from './features/generator/hooks/useGenerator';
import { GlassCard } from './components/ui/GlassCard';
import { HelpBox } from './components/ui/HelpBox';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const {
    currentMode,
    currentModeId,
    setCurrentModeId,
    formValues,
    updateField,
    addSuggestion,
    generatedPrompt
  } = useGenerator();

  const renderContent = () => {
    return (
      <div className="content-grid">
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
                      fields={currentMode.fields}
                      values={formValues}
                      onUpdate={updateField}
                      onAddSuggestion={addSuggestion}
                    />
                  </GlassCard>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {!currentMode.isAbout && (
            <div className="preview-column">
              <PromptPreview prompt={generatedPrompt} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <MainLayout 
        sidebar={<Sidebar currentModeId={currentModeId} onModeChange={setCurrentModeId} />}
        content={renderContent()}
      />
      <Analytics />
    </>
  );
}

export default App;
