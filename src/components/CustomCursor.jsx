import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Raw mouse coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth, slower springs for an organic trailing effect
    const springConfig = { damping: 20, stiffness: 120, mass: 0.8 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            // Expand cursor organically over clickable or interactive elements
            if (
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('hero-img') ||
                e.target.tagName.toLowerCase() === 'video' ||
                e.target.closest('.activity-card, .project-card, .skill-category, .about-card')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Inner sharp dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--text-color)',
                    pointerEvents: 'none',
                    zIndex: 9999999,
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Outer springy glowing trail */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid var(--primary-color)',
                    pointerEvents: 'none',
                    zIndex: 9999998,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovered ? 1.8 : 1,
                    backgroundColor: isHovered ? 'rgba(241, 158, 210, 0.4)' : 'rgba(241, 158, 210, 0)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
        </>
    );
};

export default CustomCursor;
