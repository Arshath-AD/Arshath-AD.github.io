import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const closeMenu = () => {
        // Delay closing to let anchor clicks bubble up to the global smooth scroll listener
        setTimeout(() => {
            setMenuOpen(false);
        }, 150);
    };

    const logo = (
        <div
            className="logo"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
        >
            Arshath Ahamed M
        </div>
    );

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {/* Logo — Magnetic on desktop only */}
                {isMobile ? logo : <Magnetic>{logo}</Magnetic>}

                {/* Desktop nav links */}
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li>
                        <a href="https://drive.google.com/file/d/1jkqFZhWYYwAo4vZenrM0FPBlGj3ZLvBG/view?usp=drive_link" target="_blank" rel="noreferrer">
                            Resume
                        </a>
                    </li>
                    <li>
                        <Magnetic>
                            <a href="#contact" className="btn-nav">Contact</a>
                        </Magnetic>
                    </li>
                </ul>

                {/* Hamburger button — mobile only */}
                <button
                    className={`hamburger${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.ul
                        className="mobile-nav"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: 'tween', duration: 0.22 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <li><a href="#about" onClick={closeMenu}>About</a></li>
                        <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
                        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                        <li>
                            <a href="https://drive.google.com/file/d/1jkqFZhWYYwAo4vZenrM0FPBlGj3ZLvBG/view?usp=drive_link" target="_blank" rel="noreferrer" onClick={closeMenu}>
                                Resume
                            </a>
                        </li>
                        <li><a href="#contact" onClick={closeMenu} className="btn-nav">Contact</a></li>
                    </motion.ul>
                )}
            </AnimatePresence>

            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />
        </nav>
    );
};

export default Navbar;
