import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { UpiModal } from './components/donation/UpiModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useSyncAnimationClock } from './hooks/useSyncAnimationClock';

import { HomePage } from './pages/HomePage';
import { NotesExplorerPage } from './pages/NotesExplorerPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import { PracticePage } from './pages/PracticePage';
import { PracticeDetailPage } from './pages/PracticeDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { LinksPage } from './pages/LinksPage';
import { DonatePage } from './pages/DonatePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const { heroHue, footerHue } = useSyncAnimationClock(90, 114, -134);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-canvas)' }}>
        <Navbar onOpenDonate={() => setDonateModalOpen(true)} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    heroHue={heroHue}
                    onOpenDonate={() => setDonateModalOpen(true)}
                  />
                }
              />
              <Route path="/notes" element={<NotesExplorerPage />} />
              <Route path="/notes/*" element={<NoteDetailPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/practice/*" element={<PracticeDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/links" element={<LinksPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </div>

        <Footer hue={footerHue} onOpenDonate={() => setDonateModalOpen(true)} />
        <UpiModal isOpen={donateModalOpen} onClose={() => setDonateModalOpen(false)} />
      </div>
    </BrowserRouter>
  );
};
