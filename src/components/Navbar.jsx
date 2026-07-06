import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import ResumeModal from './ResumeModal';

const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const [menuOpen, setMenuOpen] = useState(false);
    const [resumeOpen, setResumeOpen] = useState(false);
    
    // Ref to each Resume button so focus can be restored after modal closes
    const desktopResumeRef = useRef(null);
    const mobileResumeRef = useRef(null);
    const activeTriggerRef = useRef(null);
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

    const openResume = (triggerRef) => {
        activeTriggerRef.current = triggerRef.current;
        closeMenu();
        setResumeOpen(true);
    };

    const closeResume = () => setResumeOpen(false);

    /* Resume button — shared visual, different refs for desktop / mobile */
    const ResumeBtn = ({ btnRef, className }) => (
        <button
            ref={btnRef}
            className={className || "btn-nav"}
            onClick={() => openResume(btnRef)}
            aria-label="View resume"
            aria-haspopup="dialog"
        >
            Resume
        </button>
    );

    const logo = (
        <div
            className="logo"
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}
        >
            Arshath Ahamed M
        </div>
    );

    return (
        <>
        <nav className="navbar" aria-label="Main navigation">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {/* Logo — Magnetic on desktop only */}
                {isMobile ? logo : <Magnetic>{logo}</Magnetic>}

                {/* Desktop nav links */}
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li>
                        <Magnetic>
                            <ResumeBtn btnRef={desktopResumeRef} />
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
                        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
                        <li>
                            <ResumeBtn btnRef={mobileResumeRef} />
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>

            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />
        </nav>
        <ResumeModal
            isOpen={resumeOpen}
            onClose={closeResume}
            triggerRef={activeTriggerRef}
        />
        </>
    );
};

export default Navbar;
