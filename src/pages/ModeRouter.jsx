import { useModeContext } from '../contexts/useGeneratorContext';
import FormulaPage from './FormulaPage';
import AboutPage from './AboutPage';
import TikTokCollectionsPage from './TikTokCollectionsPage';
import ImageStackerPage from './ImageStackerPage';
import PhotoMontagePage from './PhotoMontagePage';

export default function ModeRouter() {
  const { currentMode, currentModeId } = useModeContext();

  if (currentMode.isCustom) {
    switch (currentModeId) {
      case 'tiktok-collections':
        return <TikTokCollectionsPage />;
      case 'image-stacker':
        return <ImageStackerPage />;
      case 'photo-montage':
        return <PhotoMontagePage />;
      default:
        return <FormulaPage />;
    }
  }

  if (currentMode.isAbout) {
    return <AboutPage />;
  }

  return <FormulaPage />;
}
