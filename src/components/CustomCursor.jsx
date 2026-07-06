import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
    const canvasRef = useRef(null);
    const [isIdle, setIsIdle] = useState(false);
    const [idlePos, setIdlePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Only render on non-touch devices
        if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // Trail configuration
        const particles = [];
        // The perfect combination: Your primary pink and secondary yellow
        const colors = ['#F19ED2', '#fff59d'];

        let mouse = { x: -100, y: -100 };
        let lastMouse = { x: -100, y: -100 };

        // ── Idle / visibility tracking ──────────────────────────
        let idleTimer = null;
        const IDLE_DELAY = 1500; // ms before hiding

        const showCursor = () => {
            canvas.style.opacity = '1';
            setIsIdle(false);
        };

        const hideCursor = (isLeaving = false) => {
            canvas.style.opacity = '0';
            
            if (!isLeaving && mouse.x > 0 && mouse.y > 0) {
                setIdlePos({ x: mouse.x, y: mouse.y });
                setIsIdle(true);
            } else {
                setIsIdle(false);
            }

            // Push mouse off-screen so the dot doesn't linger
            mouse.x = -100;
            mouse.y = -100;
            particles.length = 0; // clear trail immediately
        };

        const resetIdleTimer = () => {
            showCursor();
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => hideCursor(false), IDLE_DELAY);
        };
        // ────────────────────────────────────────────────────────

        const handleMouseMove = (e) => {
            lastMouse.x = mouse.x;
            lastMouse.y = mouse.y;
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            resetIdleTimer();

            // Calculate distance to only spawn particles when moving
            const dx = mouse.x - lastMouse.x;
            const dy = mouse.y - lastMouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Spawn particles based on distance moved (prevents clumps when standing still)
            if (distance > 2) {
                particles.push({
                    x: mouse.x,
                    y: mouse.y,
                    size: 16,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1,
                    rotation: Math.random() * Math.PI, // Random initial tilt
                });
            }
        };

        // Hide when mouse leaves the browser window
        const handleMouseLeave = () => {
            clearTimeout(idleTimer);
            hideCursor(true);
        };

        // Show immediately when mouse re-enters
        const handleMouseEnter = () => {
            resetIdleTimer();
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Brutalist Trail
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);

                // Draw neo-brutalist square
                ctx.fillStyle = p.color;
                ctx.strokeStyle = '#1a1a1a'; // Thick black border
                ctx.lineWidth = 2;

                // The square itself
                ctx.globalAlpha = p.life;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);

                ctx.restore();

                // Shrink and fade physics
                p.size -= 0.3;
                p.life -= 0.03;
                p.rotation += 0.05; // Spin slightly as it dies

                if (p.size <= 0 || p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            // Draw precise inner tracking dot on top
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#1a1a1a';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            clearTimeout(idleTimer);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 99999999,
                    opacity: 0,                          // start hidden
                    transition: 'opacity 0.4s ease',    // smooth fade in/out
                }}
            />
            <AnimatePresence>
                {isIdle && (
                    <div style={{
                        position: 'fixed',
                        top: idlePos.y,
                        left: idlePos.x,
                        pointerEvents: 'none',
                        zIndex: 99999999,
                        // Shift so the bottom-left corner of this wrapper is exactly at the cursor, 
                        // plus a 5px gap so the arrow doesn't overlap the dot
                        transform: 'translate(5px, calc(-100% - 5px))'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
                            style={{ transformOrigin: 'bottom left' }}
                        >
                            <div className="bounce-anim" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                            }}>
                                <span 
                                    style={{
                                        fontFamily: "'Permanent Marker', cursive",
                                        fontSize: '1.4rem',
                                        color: 'var(--accent-green)',
                                        WebkitTextStroke: '1px #111',
                                        transform: 'rotate(15deg)',
                                        marginLeft: '15px', // Shift text slightly right so it sits nicely over the arrow tail
                                        marginBottom: '-5px'
                                    }}
                                >
                                    Here!
                                </span>
                                <svg 
                                    width="35" height="35" viewBox="0 0 35 35" fill="none" 
                                >
                                    {/* Arrow tip ends exactly at 0,35 (bottom-left corner of the SVG bounding box) */}
                                    <path d="M30 5 Q15 15 0 35 M0 35 L12 33 M0 35 L2 23" stroke="#111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M30 5 Q15 15 0 35 M0 35 L12 33 M0 35 L2 23" stroke="var(--accent-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CustomCursor;
