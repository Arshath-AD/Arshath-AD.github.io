import React, { useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Extracurricular from './components/Extracurricular';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import './animations.css';

function App() {
    // Smooth scrolling for anchor links logic
    useEffect(() => {
        const handleSmoothScroll = (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target) {
                e.preventDefault();
                const id = target.getAttribute('href');
                const element = document.querySelector(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
        document.addEventListener('click', handleSmoothScroll);
        return () => document.removeEventListener('click', handleSmoothScroll);
    }, []);

    return (
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
            <CustomCursor />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Extracurricular />
            <Contact />
        </ReactLenis>
    );
}

export default App;
