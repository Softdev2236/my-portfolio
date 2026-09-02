import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './components/portfolio/Navbar';
import Hero from "./components/portfolio/Hero";
import './App.css';
import Skills from './components/portfolio/skills';
import Services from './components/portfolio/Services';
import Projects from './components/portfolio/Projects';
import Experience from './components/portfolio/Experience';
import Contact from './components/portfolio/Contact';
import Footer from "./components/portfolio/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Navbar shows on every page */}
        <Navbar />
        <Hero/>
        <Services/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Contact/>
        <Footer/>
        {/* Page content */}
       
      </div>
    </BrowserRouter>
  );
}

export default App;