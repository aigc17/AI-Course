import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== 'PLAYER') {
      setSelectedCourseId(null);
    }
    window.scrollTo(0, 0);
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('PLAYER');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 selection:bg-primary-500/30">
      {currentView !== 'PLAYER' && (
        <Navbar currentView={currentView} onNavigate={handleNavigate} />
      )}
      
      <main>
        {currentView === 'HOME' && (
          <Home onNavigate={handleNavigate} />
        )}
        
        {currentView === 'CATALOG' && (
          <Courses onCourseSelect={handleCourseSelect} />
        )}
        
        {currentView === 'PLAYER' && selectedCourseId && (
          <CourseDetail 
            courseId={selectedCourseId} 
            onBack={handleNavigate} 
          />
        )}
      </main>

      {/* Simple Footer */}
      {currentView !== 'PLAYER' && (
        <footer className="border-t border-white/5 bg-dark-900 py-12 text-center text-sm text-slate-500">
            <p>© 2024 AI Nexus. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Contact</a>
            </div>
        </footer>
      )}
    </div>
  );
}

export default App;