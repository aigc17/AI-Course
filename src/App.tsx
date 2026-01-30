/**
 * [INPUT]: react-router-dom - 路由管理
 * [INPUT]: @/components/* - 布局组件
 * [INPUT]: @/pages/* - 页面组件
 * [OUTPUT]: App - 应用根组件
 * [POS]: 应用入口，定义路由和全局布局
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import DesignSystem from './pages/DesignSystem';

// Layout wrapper to conditionally hide footer or handle layout specifics
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isPlayer = location.pathname.includes('/course/'); 
  // We might want footer on course details too, but previously it was hidden on PLAYER.
  // Let's keep it consistent: Hide footer on player/course detail if desired, but typically detail pages have footers.
  // The previous app had 'PLAYER' view state which was the course detail. 
  // Let's only hide Navbar/Footer if it's a "fullscreen" player experience, but CourseDetail is a page.
  // For now, I'll render Navbar everywhere. Footer everywhere except maybe explicit player route if separated.
  
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/design-system" element={<DesignSystem />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;