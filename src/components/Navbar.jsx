import React from 'react';
import { motion, useScroll } from 'framer-motion';
import Magnetic from './Magnetic';

const Navbar = () => {
    const { scrollYProgress } = useScroll();

    return (
        <nav className="navbar">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Magnetic>
                    <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Arshath Ahamed M
                    </div>
                </Magnetic>
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
                <div className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />
        </nav>
    );
};

export default Navbar;
