import React from 'react';
import { motion } from 'framer-motion';

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
                <motion.img
                    src="assets/images/avatar.png"
                    alt="Arshath Cartoon Avatar"
                    className="hero-img"
                    initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5, duration: 1.2, delay: 0.8 }}
                    whileHover={{ rotate: 2, scale: 1.02 }}
                />
            </div>
        </header>
    );
};

export default Hero;
