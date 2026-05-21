import { useState, useEffect, useMemo, useCallback } from 'react';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { Folders } from 'lucide-react';
import styles from './TikTokCollections.module.css';
import AIModal from '../Form/AIModal';
import { TikTokGuide } from './components/indicators/TikTokGuide';
import { useTikTokHistory } from './hooks/useTikTokHistory';
import { TrendsRadar } from './components/indicators/TrendsRadar';
import { HookOptimizer } from './components/indicators/HookOptimizer';
import { ViralScore } from './components/indicators/ViralScore';
import { AnalyticsTracker } from './components/analytics/AnalyticsTracker';
import {
  STYLE_PRESETS,
  VIBE_PRESETS,
  COLOR_PRESETS,
  TARGET_PRESETS,
  COLLECTION_PRESETS,
  THEME_SUBJECTS,
  THEME_ACTIONS,
  THEME_TWISTS,
  TIKTOK_FIELDS
} from './constants/constants';
import { generateTikTokPrompt } from './utils/utils';
import { ThemeInput } from './components/form/ThemeInput';
import { QuantityStepper } from './components/form/QuantityStepper';
import { SelectorsGrid } from './components/form/SelectorsGrid';
import { PortugueseToggle } from './components/form/PortugueseToggle';
import { NotesTextarea } from './components/form/NotesTextarea';
import { PresetCards } from './components/form/PresetCards';
import { ActionButtons } from './components/actions/ActionButtons';
import { HistoryModal } from './components/history/HistoryModal';
import { FloatingActionButtons } from './components/actions/FloatingActionButtons';

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
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [currentAIPrompt, setCurrentAIPrompt] = useState('');
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  
  const { history, saveToHistory, updateAnalytics, clearHistory, deleteHistoryItem, loadFromHistory, getAnalyticsSummary } = useTikTokHistory();

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

  const handleSelectPreset = useCallback((preset) => {
    setActivePresetId(preset.id);
    setSelectedStyle(preset.style);
    setSelectedVibe(preset.vibe);
    setSelectedColors(preset.color);
    setSelectedTarget(preset.target);
    setQuantity(preset.qty);
    setNotes(preset.notes);
  }, []);

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

  const handleCopy = useCallback(() => {
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
  }, [generatedPrompt, theme, quantity, selectedStyle, selectedVibe, selectedColors, selectedTarget, notes, portugueseText, currentAIPrompt, saveToHistory]);

  const handleGenerateRandomTheme = useCallback(() => {
    const subject = THEME_SUBJECTS[Math.floor(Math.random() * THEME_SUBJECTS.length)];
    const action = THEME_ACTIONS[Math.floor(Math.random() * THEME_ACTIONS.length)];
    const twist = THEME_TWISTS[Math.floor(Math.random() * THEME_TWISTS.length)];
    setTheme(`${subject} ${action} ${twist}`);
  }, []);

  const handleRandomize = useCallback(() => {
    const subject = THEME_SUBJECTS[Math.floor(Math.random() * THEME_SUBJECTS.length)];
    const action = THEME_ACTIONS[Math.floor(Math.random() * THEME_ACTIONS.length)];
    const twist = THEME_TWISTS[Math.floor(Math.random() * THEME_TWISTS.length)];
    setTheme(`${subject} ${action} ${twist}`);

    setQuantity(Math.floor(Math.random() * 5) + 3);

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
  }, []);

  const handleClear = useCallback(() => {
    setTheme('');
    setQuantity(5);
    setSelectedStyle('normal');
    setSelectedVibe('normal');
    setSelectedColors('normal');
    setSelectedTarget('normal');
    setNotes('');
    setPortugueseText(true);
    setActivePresetId(null);
  }, []);

  const handleHistoryLoad = useCallback((item) => {
    const data = loadFromHistory(item);
    setTheme(data.theme);
    setQuantity(data.quantity);
    setSelectedStyle(data.selectedStyle);
    setSelectedVibe(data.selectedVibe);
    setSelectedColors(data.selectedColors);
    setSelectedTarget(data.selectedTarget);
    setNotes(data.notes);
    setPortugueseText(data.portugueseText);
    setActivePresetId(null);
    setCurrentAIPrompt(item.aiPrompt || '');
    setIsHistoryModalOpen(false);
  }, [loadFromHistory]);

  return (
    <div className={styles.container}>
      <div className={styles.controlsColumn}>
        <GlassCard className="p-6">
          <h3 className={styles.sectionTitle}>
            <Folders size={18} className={styles.sectionTitleIcon} />
            Configuração da Coleção TikTok
          </h3>

          <ThemeInput
            theme={theme}
            onChange={setTheme}
            onRandom={handleGenerateRandomTheme}
          />

          <QuantityStepper
            quantity={quantity}
            onChange={setQuantity}
          />

          <SelectorsGrid
            selectedStyle={selectedStyle}
            onStyleChange={setSelectedStyle}
            selectedColors={selectedColors}
            onColorsChange={setSelectedColors}
            selectedVibe={selectedVibe}
            onVibeChange={setSelectedVibe}
            selectedTarget={selectedTarget}
            onTargetChange={setSelectedTarget}
          />

          <PortugueseToggle
            checked={portugueseText}
            onChange={setPortugueseText}
          />

          <NotesTextarea
            value={notes}
            onChange={setNotes}
          />

          <PresetCards
            activePresetId={activePresetId}
            onSelect={handleSelectPreset}
          />

          <TrendsRadar onSelectTheme={(trendTheme) => setTheme(trendTheme)} />

          <ActionButtons
            onClear={handleClear}
            onRandomize={handleRandomize}
          />
        </GlassCard>
      </div>

      <div className={styles.indicatorsColumn}>
        <GlassCard className="p-6">
          <ViralScore
            theme={theme}
            quantity={quantity}
            selectedStyle={selectedStyle}
            selectedVibe={selectedVibe}
            selectedTarget={selectedTarget}
            portugueseText={portugueseText}
            notes={notes}
          />

          <HookOptimizer theme={theme} />

          <TikTokGuide />
        </GlassCard>
      </div>

      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        fields={TIKTOK_FIELDS}
        currentModeTitle="Configuração da Coleção TikTok"
        onSuccess={(data, aiPrompt) => {
          setCurrentAIPrompt(aiPrompt);
          if (data && typeof data === 'object') {
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

            setPortugueseText(true);

            if (data.notes !== undefined) setNotes(data.notes);
          }
        }}
      />

      <FloatingActionButtons
        onAIClick={() => {
          setIsAIModalOpen(true);
          setPortugueseText(true);
        }}
        onHistoryClick={() => setIsHistoryModalOpen(true)}
        onCopy={handleCopy}
        onAnalyticsClick={() => setIsAnalyticsOpen(true)}
        copied={copied}
        isThemeEmpty={!theme.trim()}
      />

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={history}
        onDeleteItem={deleteHistoryItem}
        onClearHistory={clearHistory}
        onLoadFromHistory={handleHistoryLoad}
      />

      <AnalyticsTracker
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        history={history}
        updateAnalytics={updateAnalytics}
        getAnalyticsSummary={getAnalyticsSummary}
      />
    </div>
  );
};

export default TikTokCollections;
