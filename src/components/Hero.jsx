import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', bounce: 0.4, duration: 0.8 }
    }
};

const Hero = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100 && !isScrolled) setIsScrolled(true);
        if (latest <= 100 && isScrolled) setIsScrolled(false);
    });

    return (
        <header className="hero">
            <div className="hero-content">
                <motion.div
                    className="hero-text-box"
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
                        <a href="#projects" className="btn btn-primary">View Work</a>
                        <a href="#contact" className="btn btn-secondary">Let's Talk</a>
                    </motion.div>
                </motion.div>
            </div>
            <div className="hero-visual">
                {isScrolled && <div style={{ width: '100%', maxWidth: '24rem', aspectRatio: '1/1' }}></div>}
                <motion.img
                    layout
                    src="assets/images/avatar.png"
                    alt="Arshath Cartoon Avatar"
                    className="hero-img"
                    style={{
                        position: isScrolled ? 'fixed' : 'relative',
                        top: isScrolled ? '1rem' : 'auto',
                        right: isScrolled ? '2rem' : 'auto',
                        width: isScrolled ? '7.5rem' : '100%',
                        maxWidth: isScrolled ? '7.5rem' : '24rem',
                        zIndex: isScrolled ? 9999 : 1,
                        boxShadow: isScrolled ? '5px 5px 0px 0px #000' : '10px 10px 0px 0px #000',
                        padding: isScrolled ? '0.25rem' : '0.625rem',
                        margin: isScrolled ? 0 : 'auto',
                        cursor: 'pointer'
                    }}
                    initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        layout: { type: "spring", stiffness: 80, damping: 15 },
                        default: { type: 'spring', bounce: 0.5, duration: 1.2, delay: isScrolled ? 0 : 0.8 }
                    }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    onClick={() => {
                        if (isScrolled) window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </div>
        </header>
    );
};

export default Hero;
