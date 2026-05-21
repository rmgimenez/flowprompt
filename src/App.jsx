import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './pages/AppShell';

function App() {
  return (
    <Routes>
      <Route path="/:modeId" element={<AppShell />} />
      <Route path="*" element={<Navigate to="/tiktok-collections" replace />} />
    </Routes>
  );
}

export default App;
