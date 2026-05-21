import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import PromptForm from '../features/generator/components/Form/PromptForm';
import PromptPreview from '../features/generator/components/Preview/PromptPreview';
import AIModal from '../features/generator/components/Form/AIModal';
import { useGeneratorContext } from '../contexts/useGeneratorContext';

export default function FormulaPage() {
  const { modeId } = useParams();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const {
    currentMode,
    formValues,
    updateField,
    addSuggestion,
    generatedPrompt,
    addToHistory,
    favorites,
    toggleFavorite,
    randomize,
    clearFields,
    applyPreset,
  } = useGeneratorContext();

  const isFavorite = favorites.some(f => f.prompt === generatedPrompt);

  return (
    <div className="content-grid">
      <div className="main-grid">
        <div className="form-column">
          <AnimatePresence mode="wait">
            <motion.div
              key={modeId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-8">
                <PromptForm
                  currentModeId={modeId}
                  fields={currentMode.fields}
                  values={formValues}
                  onUpdate={updateField}
                  onAddSuggestion={addSuggestion}
                  onRandomize={randomize}
                  onClear={clearFields}
                  onApplyPreset={applyPreset}
                />
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="preview-column">
          <PromptPreview
            prompt={generatedPrompt}
            onCopy={addToHistory}
            isFavorite={isFavorite}
            onToggleFavorite={() => toggleFavorite({
              modeId,
              values: formValues,
              prompt: generatedPrompt
            })}
            formValues={formValues}
            currentModeId={modeId}
          />
        </div>
      </div>

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
    </div>
  );
}
