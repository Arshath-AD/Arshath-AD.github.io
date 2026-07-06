import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import Magnetic from './Magnetic';
import ResumeModal from './ResumeModal';

const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const lenis = useLenis();
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
        setMenuOpen(false);
    };

    const handleMobileNavClick = (e, targetId) => {
        e.preventDefault();
        setMenuOpen(false); // Close menu instantly
        
        if (lenis) {
            lenis.scrollTo(targetId);
        } else {
            const element = document.querySelector(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
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

    const [logoHovered, setLogoHovered] = useState(false);

    const logo = (
        <div
            className="logo"
            onClick={() => {
                if (lenis) {
                    lenis.scrollTo(0);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                setMenuOpen(false);
            }}
            onMouseEnter={() => !isMobile && setLogoHovered(true)}
            onMouseLeave={() => !isMobile && setLogoHovered(false)}
            style={{
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden' // Masks the sliding text cleanly
            }}
        >
            {/* Invisible spacer forces the container to be exactly the right width to fit the longest text without hardcoded pixel values */}
            <span style={{
                visibility: 'hidden',
                whiteSpace: 'nowrap',
                fontFamily: "'Permanent Marker', cursive",
                textTransform: 'none',
                fontSize: '1.4rem'
            }}>
                Hehe I'm also an Athlete
            </span>

            <AnimatePresence>
                {!logoHovered ? (
                    <motion.span
                        key="default"
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        exit={{ y: -40 }}
                        transition={{ type: 'spring', stiffness: 600, damping: 25 }}
                        style={{ position: 'absolute', left: 0, whiteSpace: 'nowrap', display: 'block' }}
                    >
                        Arshath Ahamed M
                    </motion.span>
                ) : (
                    <motion.span
                        key="secret"
                        initial={{ y: 40 }}
                        animate={{ y: 0 }}
                        exit={{ y: -40 }}
                        transition={{ type: 'spring', stiffness: 600, damping: 25 }}
                        style={{
                            position: 'absolute',
                            left: 0,
                            color: 'var(--accent-purple)',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            fontFamily: "'Permanent Marker', cursive",
                            textTransform: 'none',
                            fontSize: '1.4rem', // Slightly smaller than the 2rem Bangers logo
                            marginTop: '0.2rem', // Optical alignment tweak
                            WebkitTextStroke: '1px #111' // Comic book black outline
                        }}
                    >
                        Hehe I'm also an Athlete
                    </motion.span>
                )}
            </AnimatePresence>
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
                            <li><a href="#about" onClick={(e) => handleMobileNavClick(e, '#about')}>About</a></li>
                            <li><a href="#skills" onClick={(e) => handleMobileNavClick(e, '#skills')}>Skills</a></li>
                            <li><a href="#projects" onClick={(e) => handleMobileNavClick(e, '#projects')}>Projects</a></li>
                            <li><a href="#contact" onClick={(e) => handleMobileNavClick(e, '#contact')}>Contact</a></li>
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
