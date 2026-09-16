import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/portfolio/Navbar';
import Hero from './components/portfolio/Hero';
import Services from './components/portfolio/Services';
import Skills from './components/portfolio/Skills';
import Projects from './components/portfolio/Projects';
import Experience from './components/portfolio/Experience';
import Contact from './components/portfolio/Contact';
import Footer from './components/portfolio/Footer';

import AdminDashboard from './components/admin/AdminDashboard';
import { isLoggedIn, verifyToken } from './lib/auth';

import './App.css';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // On page load, if a valid token exists, open the dashboard
  useEffect(() => {
    const checkAuth = async () => {
      if (isLoggedIn()) {
        const valid = await verifyToken();
        if (valid) setShowAdmin(true);
      }
    };
    checkAuth();
  }, []);

  // If admin mode is on, show ONLY the dashboard
  if (showAdmin) {
    return <AdminDashboard onExit={() => setShowAdmin(false)} />;
  }

  // Otherwise, show the normal portfolio
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar onLoginSuccess={() => setShowAdmin(true)} />
        <Hero />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;