import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/* ─── Shared animation variants ──────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
};
const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.35, duration: 0.7 } }
};

/* ─── Mobile Hero ─────────────────────────────────────────── */
const MobileHero = () => (
    <header className="m-hero">
        <motion.div
            className="m-hero-inner"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Avatar */}
            <motion.div variants={textVariants} className="m-avatar-wrap">
                <img
                    src="assets/images/avatar.png"
                    alt="Arshath Ahamed"
                    className="m-avatar"
                />
            </motion.div>

            {/* Name */}
            <motion.h1 variants={textVariants} className="m-hero-name">
                Hi, I'm<br /><span className="highlight">Arshath Ahamed!</span>
            </motion.h1>

            {/* Info box: role + tagline together */}
            <motion.div variants={textVariants} className="m-info-box">
                <div className="m-role-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline',verticalAlign:'middle',marginRight:'5px'}}>
                        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                    </svg>
                    Computer Science Grad
                </div>
                <p className="m-hero-tagline">
                    Currently debugging my life.<br />Every day is a breakpoint.
                </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={textVariants} className="m-hero-btns">
                <a href="#projects" className="btn btn-primary">View Work</a>
                <a href="#contact" className="btn btn-secondary">Let's Talk</a>
            </motion.div>
        </motion.div>
    </header>
);

/* ─── Desktop Hero ────────────────────────────────────────── */
const DesktopHero = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > 100 && !isScrolled) setIsScrolled(true);
        if (latest <= 100 && isScrolled) setIsScrolled(false);
    });

    return (
        <header className="hero">
            <div className="hero-content">
                <motion.div
                    className="hero-text-box bento-card"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1>
                        <motion.span variants={textVariants} style={{ display: 'inline-block' }}>Hi,&nbsp;</motion.span>
                        <motion.span variants={textVariants} style={{ display: 'inline-block' }}>I'm&nbsp;</motion.span>
                        <motion.span variants={textVariants} style={{ display: 'inline-block' }} className="highlight">Arshath&nbsp;</motion.span>
                        <motion.span variants={textVariants} style={{ display: 'inline-block' }} className="highlight">Ahamed!</motion.span>
                    </h1>
                    <motion.p variants={textVariants} className="subtitle">Computer Science Grad</motion.p>
                    <motion.p variants={textVariants} className="hero-desc">Currently debugging my life. Every day is a breakpoint.</motion.p>
                    <motion.div variants={textVariants} className="hero-btns">
                        <motion.a 
                            href="#projects" 
                            className="btn btn-primary"
                            whileHover={{ scale: 0.98, y: 2, x: 2, boxShadow: '2px 2px 0px 0px #000' }} 
                            whileTap={{ scale: 0.95, y: 4, x: 4, boxShadow: '0px 0px 0px 0px #000' }}
                        >View Work</motion.a>
                        <motion.a 
                            href="#contact" 
                            className="btn btn-secondary"
                            whileHover={{ scale: 0.98, y: 2, x: 2, boxShadow: '2px 2px 0px 0px #000' }} 
                            whileTap={{ scale: 0.95, y: 4, x: 4, boxShadow: '0px 0px 0px 0px #000' }}
                        >Let's Talk</motion.a>
                    </motion.div>
                </motion.div>
            </div>

            <div className="hero-visual">
                {isScrolled && <div style={{ width: '100%', maxWidth: '24rem', aspectRatio: '1/1' }} />}
                <motion.img
                    layout
                    src="assets/images/avatar.png"
                    alt="Arshath Cartoon Avatar"
                    className="hero-img"
                    style={{
                        position:  isScrolled ? 'fixed'    : 'relative',
                        top:       isScrolled ? '0.5rem'   : 'auto',
                        right:     isScrolled ? '1.5rem'   : 'auto',
                        width:     isScrolled ? '8.5rem'   : '100%',
                        height:    isScrolled ? '8.5rem'   : 'auto',
                        maxWidth:  isScrolled ? '8.5rem'   : '22rem',
                        zIndex:    isScrolled ? 9999       : 1,
                        boxShadow: isScrolled ? '5px 5px 0px 0px #000' : '10px 10px 0px 0px #000',
                        padding:   isScrolled ? '0.25rem'  : '0.625rem',
                        margin:    isScrolled ? 0          : 'auto',
                        cursor:    isScrolled ? 'pointer'  : 'default',
                        objectFit: 'cover',
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { if (isScrolled) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                />
            </div>
        </header>
    );
};

/* ─── Root: pick the right hero based on viewport ────────── */
const Hero = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return isMobile ? <MobileHero /> : <DesktopHero />;
};

export default Hero;
