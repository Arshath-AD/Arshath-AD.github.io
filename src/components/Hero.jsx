import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/* ─── Shared animation variants ──────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0 } }
};
const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5, duration: 0.25 } },
    hover: { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }
};

/* --- Animated Headline for Desktop Hero --- */
const AnimatedHeadline = () => {
    const text1 = "Hi, I'm ";
    const text2 = "Arshath Ahamed!";
    const totalChars = text1.length + text2.length;

    const renderLetters = (text, startIndex, isHighlight) => {
        return text.split('').map((char, i) => {
            const index = startIndex + i;

            // Normalize position from -1 (left edge) to 1 (right edge)
            const normalizedPosition = (index / (totalChars - 1)) * 2 - 1;

            // Mathematical parabola for a perfect arch (C-bend)
            const archY = -25 * (1 - Math.pow(normalizedPosition, 2));

            // Fan rotation outwards from the center (reduced to prevent corner crashing)
            const rotate = normalizedPosition * 8;

            // Fan X outward to create literal breathing space between letters
            const archX = normalizedPosition * 35; // Increased spread of 70px to allow for chaotic rotation

            // Pseudo-random scatter based on index so it's consistent
            const pseudoRandom = Math.sin(index * 4567.89) * 10000;
            const random = pseudoRandom - Math.floor(pseudoRandom);

            // Bring back the chaos!
            const randomY = (random - 0.5) * 16; // Large random jitter up/down
            const randomRot = (random - 0.5) * 20; // Aggressive random jagged rotation

            // Multi-color comic effect for the name letters on hover
            const brandColors = ['var(--primary-color)', 'var(--accent-purple)', 'var(--accent-green)', '#FFFFFF'];
            const hoverColor = isHighlight ? brandColors[index % brandColors.length] : undefined;

            const letterVariants = {
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5, duration: 0.25 } },
                hover: {
                    scale: 1.05,
                    y: archY + randomY,
                    x: archX,
                    rotate: rotate + randomRot,
                    color: hoverColor,
                    transition: { type: 'spring', stiffness: 500, damping: 15 }
                }
            };

            return (
                <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    className={isHighlight ? "highlight" : ""}
                >
                    {char}
                </motion.span>
            );
        });
    };

    return (
        <h1>
            {renderLetters(text1, 0, false)}
            <span style={{ whiteSpace: 'nowrap' }}>
                {renderLetters(text2, text1.length, true)}
            </span>
        </h1>
    );
};

/**
 * Responsive image element for the avatar.
 * Uses <picture> + WebP srcset for optimal format selection.
 * - loading="eager" + fetchpriority="high" → browser prioritizes this as LCP.
 * - decoding="sync" ensures it doesn't delay the first frame paint.
 * - Explicit width/height prevents Cumulative Layout Shift (CLS).
 */
const AvatarPicture = ({ className, width, height, style, ...rest }) => (
    <picture>
        {/* WebP: served to all modern browsers (Chrome, Firefox, Edge, Safari 14+) */}
        <source
            type="image/webp"
            srcSet="/assets/images/avatar-300.webp 300w, /assets/images/avatar-720.webp 720w"
            sizes="(max-width: 640px) 136px, 352px"
        />
        {/* Fallback PNG for older browsers */}
        <source
            type="image/png"
            srcSet="/assets/images/avatar-300.png 300w, /assets/images/avatar-720.png 720w"
            sizes="(max-width: 640px) 136px, 352px"
        />
        <img
            src="/assets/images/avatar-720.png"
            alt="Arshath Ahamed – CS student and developer"
            className={className}
            width={width}
            height={height}
            loading="eager"
            fetchpriority="high"
            decoding="sync"
            style={style}
            {...rest}
        />
    </picture>
);

/* ─── Mobile Hero ─────────────────────────────────────────── */
const MobileHero = () => (
    <header className="m-hero" aria-label="Hero section">
        <motion.div
            className="m-hero-inner"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Avatar */}
            <motion.div variants={textVariants} className="m-avatar-wrap">
                <AvatarPicture
                    className="m-avatar"
                    width={200}
                    height={200}
                />
            </motion.div>

            {/* Name */}
            <motion.h1 variants={textVariants} className="m-hero-name">
                Hi, I'm<br /><span className="highlight">Arshath Ahamed!</span>
            </motion.h1>

            {/* Info box: role + tagline together */}
            <motion.div variants={textVariants} className="m-info-box">
                <div className="m-role-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }}>
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
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

/* --- Decorative Graphic Accents for Hero Card --- */
const HeroDecorations = () => (
    <div className="hero-decorations" aria-hidden="true">
        {/* Registration Mark / Crosshair - Top Left */}
        <svg className="decor-crosshair top-left" viewBox="0 0 20 20" fill="none">
            <path d="M10 0v20M0 10h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Registration Mark / Crosshair - Bottom Right */}
        <svg className="decor-crosshair bottom-right" viewBox="0 0 20 20" fill="none">
            <path d="M10 0v20M0 10h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Hand-drawn 'POW' Sparkle/Star - Top Right */}
        <svg className="decor-sparkle" viewBox="0 0 32 32" fill="none">
            <path d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z" fill="var(--accent-purple)" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>

        {/* Subtle squiggly separator line to be placed below the description */}
        <svg className="decor-squiggle" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none">
            <path d="M0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>

        {/* Speed / Action Lines */}
        <svg className="decor-action-lines" viewBox="0 0 24 24" fill="none">
            <path d="M4 20 L20 4 M10 22 L22 10 M2 12 L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Tiny Lightning Bolt */}
        <svg className="decor-bolt" viewBox="0 0 16 24" fill="none">
            <path d="M9 2 L3 12 H10 L7 22 L13 12 H6 L9 2 Z" fill="var(--accent-yellow)" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        {/* Tiny Plus Grid */}
        <svg className="decor-plus-grid" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v4M8 4h4 M10 14v4M8 16h4 M4 8v4M2 10h4 M16 8v4M14 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Floating Hollow Circles */}
        <svg className="decor-circles" viewBox="0 0 30 30" fill="none">
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="25" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* Hand-drawn Arrow Pointing to Buttons */}
        <svg className="decor-arrow" viewBox="0 0 40 40" fill="none">
            <path d="M5 5 Q 35 15, 30 35 M 20 30 L 30 35 L 35 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Zig-Zag Line */}
        <svg className="decor-zigzag" viewBox="0 0 40 16" fill="none">
            <path d="M2 8 L10 2 L18 14 L26 2 L34 14 L38 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Exclamation Bubble */}
        <svg className="decor-exclamation" viewBox="0 0 24 24" fill="none">
            <path d="M12 22 C 16 22 20 18 20 12 C 20 6 16 2 12 2 C 8 2 4 6 4 12 C 4 15 5.5 18 8 20 L 6 24 L 12 22 Z" fill="var(--accent-green)" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 7 V13 M12 16 V17" stroke="#111" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Center Swoosh Underline */}
        <svg className="decor-swoosh" viewBox="0 0 60 15" fill="none">
            <path d="M3 10 Q 30 2 57 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>

        {/* Center Star Cluster */}
        <svg className="decor-stars" viewBox="0 0 40 30" fill="none">
            <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="var(--accent-yellow)" stroke="#111" strokeWidth="1" strokeLinejoin="round" />
            <path d="M28 8 L29 11 L32 12 L29 13 L28 16 L27 13 L24 12 L27 11 Z" fill="var(--accent-purple)" stroke="#111" strokeWidth="1" strokeLinejoin="round" />
            <path d="M22 20 L23 23 L26 24 L23 25 L22 28 L21 25 L18 24 L21 23 Z" fill="#fff" stroke="#111" strokeWidth="1" strokeLinejoin="round" />
        </svg>

        {/* Tiny dots matrix in bottom left */}
        <div className="decor-dots"></div>
    </div>
);

/* --- Cloud Bubble Component --- */
const CloudBubble = ({ text, className, variants, tailClass, bgColor = '#fff', textColor = '#111', tailBg = '#fff' }) => (
    <motion.div className={`comic-cloud-wrapper ${className}`} variants={variants}>
        <div className="comic-cloud-inner">
            <svg className="cloud-bg" viewBox="0 0 240 120" preserveAspectRatio="none">
                <path
                    vectorEffect="non-scaling-stroke"
                    fill={bgColor}
                    stroke="#fff"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                    d="M 20,60 C 10,30 40,20 60,20 C 90,5 150,5 180,20 C 200,20 230,30 220,60 C 230,90 200,100 180,100 C 150,115 90,115 60,100 C 40,100 10,90 20,60 Z"
                />
            </svg>
            <span className="cloud-text" style={{ color: textColor }}>{text}</span>
            <div className={`cloud-tail ${tailClass}`} style={{ background: tailBg }} />
        </div>
    </motion.div>
);

/* --- Avatar Hover Bubbles --- */
const AvatarBubbles = ({ isScrolled }) => {
    if (isScrolled) return null; // Hide bubbles when avatar is in sticky navbar mode

    return (
        <>
            {/* ── Bouncy "I'm here!" CTA (Visible when NOT hovered) ── */}
            <motion.div
                className="hover-cta bounce-anim"
                variants={{
                    initial: { opacity: 1, scale: 1 },
                    hover: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } }
                }}
                style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pointerEvents: 'none',
                    zIndex: 20
                }}
            >
                <span
                    style={{
                        fontFamily: "'Permanent Marker', cursive",
                        fontSize: '1.6rem',
                        color: '#fff',
                        WebkitTextStroke: '1px #111',
                        transform: 'rotate(15deg)'
                    }}
                >
                    Hover me!
                </span>

                <svg
                    width="40" height="40" viewBox="0 0 40 40" fill="none"
                    style={{ transform: 'rotate(10deg)', marginTop: '-5px' }}
                >
                    <path d="M15 5 Q30 20 15 35 M15 35 L25 30 M15 35 L20 20" stroke="#111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 5 Q30 20 15 35 M15 35 L25 30 M15 35 L20 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>

            {/* Red — Comic book action red */}
            <CloudBubble
                text="'HAHAHA' needs me"
                className="top-left"
                tailClass="tail-br"
                bgColor="#FF3B30"
                textColor="#fff"
                tailBg="#FF3B30"
                variants={{
                    initial: { opacity: 0, scale: 0.5, x: 20, y: 20 },
                    hover: { opacity: 1, scale: 1, x: 0, y: 0, transition: { type: 'spring', bounce: 0.6, delay: 0.05 } }
                }}
            />
            {/* Purple — Accent purple */}
            <CloudBubble
                text="Learner , builder , enthusiastic"
                className="top-right"
                tailClass="tail-bl"
                bgColor="#9b59b6"
                textColor="#fff"
                tailBg="#9b59b6"
                variants={{
                    initial: { opacity: 0, scale: 0.5, x: -20, y: 20 },
                    hover: { opacity: 1, scale: 1, x: 0, y: 0, transition: { type: 'spring', bounce: 0.6, delay: 0.15 } }
                }}
            />
            {/* Green — Accent green */}
            <CloudBubble
                text={<>I dont code for a living,<br />i code to live</>}
                className="bottom-left"
                tailClass="tail-tr"
                bgColor="#2ecc71"
                textColor="#fff"
                tailBg="#2ecc71"
                variants={{
                    initial: { opacity: 0, scale: 0.5, x: 20, y: -20 },
                    hover: { opacity: 1, scale: 1, x: 0, y: 0, transition: { type: 'spring', bounce: 0.6, delay: 0.1 } }
                }}
            />
            {/* Blue — Electric blue */}
            <CloudBubble
                text="I'm AD v1.2"
                className="bottom-right"
                tailClass="tail-tl"
                bgColor="#0099CC"
                textColor="#fff"
                tailBg="#0099CC"
                variants={{
                    initial: { opacity: 0, scale: 0.5, x: -20, y: -20 },
                    hover: { opacity: 1, scale: 1, x: 0, y: 0, transition: { type: 'spring', bounce: 0.6, delay: 0.2 } }
                }}
            />
        </>
    );
};

/* ─── Desktop Hero ────────────────────────────────────────── */
const DesktopHero = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > 100 && !isScrolled) setIsScrolled(true);
        if (latest <= 100 && isScrolled) setIsScrolled(false);
    });

    return (
        <header className="hero" aria-label="Hero section">
            <div className="hero-content">
                <motion.div
                    className="hero-text-box bento-card"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                >
                    <HeroDecorations />
                    <AnimatedHeadline />
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
                {/* Placeholder preserves layout space when avatar goes sticky, preventing CLS */}
                {isScrolled && <div style={{ width: '100%', maxWidth: '24rem', aspectRatio: '1/1' }} aria-hidden="true" />}
                <motion.div
                    layout
                    style={{
                        position: isScrolled ? 'fixed' : 'relative',
                        top: isScrolled ? '0.5rem' : 'auto',
                        right: isScrolled ? '1.5rem' : 'auto',
                        width: isScrolled ? '8.5rem' : '100%',
                        maxWidth: isScrolled ? '8.5rem' : '22rem',
                        zIndex: isScrolled ? 9999 : 1,
                        margin: isScrolled ? 0 : 'auto',
                        cursor: isScrolled ? 'pointer' : 'default',
                        willChange: 'transform',
                    }}
                    variants={{
                        initial: { opacity: 0, y: 50 },
                        hover: { scale: 1.05, rotate: 3, transition: { type: 'spring', stiffness: 300, damping: 20 } }
                    }}
                    initial="initial"
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { if (isScrolled) window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                    <AvatarBubbles isScrolled={isScrolled} />
                    <AvatarPicture
                        className="hero-img"
                        width={352}
                        height={352}
                        style={{
                            width: '100%',
                            height: isScrolled ? '8.5rem' : 'auto',
                            maxWidth: isScrolled ? '8.5rem' : '22rem',
                            boxShadow: isScrolled ? '5px 5px 0px 0px #000' : '10px 10px 0px 0px #000',
                            padding: isScrolled ? '0.25rem' : '0.625rem',
                            objectFit: 'cover',
                        }}
                    />
                </motion.div>
            </div>
        </header>
    );
};

/* ─── Root: pick the right hero based on viewport ────────── */
// Use matchMedia instead of window.innerWidth for reliable mobile detection
// matchMedia uses CSS breakpoints which are consistent with stylesheet media queries
const Hero = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(max-width: 640px)').matches;
    });

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        const onChange = (e) => setIsMobile(e.matches);
        // Use addEventListener (spec-compliant) over deprecated addListener
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    return isMobile ? <MobileHero /> : <DesktopHero />;
};

export default Hero;
