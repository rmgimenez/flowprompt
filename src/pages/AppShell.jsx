import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { GeneratorProvider } from '../contexts/GeneratorContext';
import Sidebar from '../features/generator/components/Sidebar/Sidebar';
import { MODES } from '../features/generator/constants/modes';
import ModeRouter from './ModeRouter';
import styles from '../layouts/MainLayout.module.css';

export default function AppShell() {
  const { modeId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!MODES[modeId]) {
    return <Navigate to="/tiktok-collections" replace />;
  }

  return (
    <GeneratorProvider modeId={modeId}>
      <div className={styles.appContainer}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className={styles.content}>
          <ModeRouter />
        </main>
      </div>
    </GeneratorProvider>
  );
}
