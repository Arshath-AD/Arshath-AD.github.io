import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Mobile About ────────────────────────────────────────── */
const CodeIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
);
const GrowthIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
);
const AthleticsIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="2" /><path d="M12 10v5l-3 3" /><path d="M12 15l3 3" /><path d="M9 13H6" /><path d="M18 13h-3" />
    </svg>
);

const mobileCards = [
    {
        Icon: CodeIcon,
        text: "I'm Arshath, a second-year undergraduate in B.Sc IT & DS. I enjoy turning ideas into real-world applications using Python, Java, and modern web tools.",
        color: 'var(--primary-color)',
        from: -60,
        rotate: -2,
        code: 'DS-01A',
        watermark: '</>',
        label: 'PROFILE: STUDENT',
    },
    {
        Icon: GrowthIcon,
        text: "I'm focused on continuous learning, gaining hands-on experience through real projects and challenges, and levelling up as a developer every day.",
        color: 'var(--accent-yellow)',
        from: 60,
        rotate: 1.5,
        code: 'DEV-99X',
        watermark: '{ }',
        label: 'PROFILE: DEVELOPER',
    },
    {
        Icon: AthleticsIcon,
        text: "Beyond code, athletics has shaped my discipline, consistency, and mindset — jumping over bars, literal and metaphorical.",
        color: '#a5f3c0',
        from: -60,
        rotate: -1,
        code: 'ATH-400M',
        watermark: '⏱',
        label: 'PROFILE: ATHLETE',
    },
];

const MobileAbout = () => (
    <section id="about" className="section m-about" aria-label="About me">
        <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
        >
            Who Am I?
        </motion.h2>

        <div className="m-about-cards">
            {mobileCards.map((card, i) => (
                <motion.div
                    key={i}
                    className="m-about-card dossier-card"
                    style={{ '--card-accent': card.color }}
                    initial={{ opacity: 0, x: card.from, rotate: card.rotate * 2 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', bounce: 0.35, duration: 0.65, delay: i * 0.12 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <div className="dossier-watermark" aria-hidden="true">{card.watermark}</div>
                    <div className="dossier-decorations" aria-hidden="true">
                        <span className="dossier-crosshair tl"></span>
                        <span className="dossier-crosshair tr"></span>
                        <span className="dossier-crosshair bl"></span>
                        <span className="dossier-crosshair br"></span>
                        <span className="dossier-code">{card.code}</span>
                        <span className="dossier-label">{card.label}</span>
                        <div className="dossier-fold"></div>
                    </div>
                    <div className="m-about-content">
                        <span className="m-about-icon" aria-hidden="true"><card.Icon /></span>
                        <p className="m-about-text">{card.text}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
);

/* ─── Desktop About (Bento Box Layout) ──────────────────────────── */
const bentoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const bentoItemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', bounce: 0.4, duration: 0.8 }
    },
};

const DesktopAbout = () => (
    <motion.section
        id="about"
        className="section about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={bentoContainerVariants}
    >
        <h2 className="section-title">Who Am I?</h2>
        <div className="container">
            <div className="about-bento">
                {/* Card 1: The Coder (Wide, Left) */}
                <motion.div
                    className="bento-card bento-1 dossier-card"
                    variants={bentoItemVariants}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="dossier-watermark" aria-hidden="true">&lt;/&gt;</div>
                    <div className="dossier-decorations" aria-hidden="true">
                        <span className="dossier-crosshair tl"></span>
                        <span className="dossier-crosshair tr"></span>
                        <span className="dossier-crosshair bl"></span>
                        <span className="dossier-crosshair br"></span>
                        <span className="dossier-code">DS-01A</span>
                        <span className="dossier-label">PROFILE: STUDENT</span>
                        <div className="dossier-fold"></div>
                    </div>
                    <div className="dossier-content">
                        <div className="bento-header">
                            <CodeIcon />
                            <h3>Student</h3>
                        </div>
                        <p>
                            I'm Arshath, a final year undergraduate in B.Sc IT & DS.
                            I enjoy turning ideas into real-world applications, working with technologies like Python, Java, and modern web tools to build meaningful tech solutions.
                        </p>
                    </div>
                </motion.div>

                {/* Card 2: The Learner (Tall, Right) */}
                <motion.div
                    className="bento-card bento-2 dossier-card"
                    variants={bentoItemVariants}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="dossier-watermark" aria-hidden="true">&#123; &#125;</div>
                    <div className="dossier-decorations" aria-hidden="true">
                        <span className="dossier-crosshair tl"></span>
                        <span className="dossier-crosshair tr"></span>
                        <span className="dossier-crosshair bl"></span>
                        <span className="dossier-crosshair br"></span>
                        <span className="dossier-code">DEV-99X</span>
                        <span className="dossier-label">PROFILE: DEVELOPER</span>
                        <div className="dossier-fold"></div>
                    </div>
                    <div className="dossier-content">
                        <div className="bento-header">
                            <GrowthIcon />
                            <h3>Developer</h3>
                        </div>
                        <p>
                            I'm focused on continuous learning, gaining hands-on experience through projects and challenges, and improving my skills as a developer every single day.
                        </p>
                    </div>
                </motion.div>

                {/* Card 3: The Athlete (Full width, Bottom) */}
                <motion.div
                    className="bento-card bento-3 dossier-card"
                    variants={bentoItemVariants}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="dossier-watermark" aria-hidden="true">⏱</div>
                    <div className="dossier-decorations" aria-hidden="true">
                        <span className="dossier-crosshair tl"></span>
                        <span className="dossier-crosshair tr"></span>
                        <span className="dossier-crosshair bl"></span>
                        <span className="dossier-crosshair br"></span>
                        <span className="dossier-code">ATH-400M</span>
                        <span className="dossier-label">PROFILE: ATHLETE</span>
                        <div className="dossier-fold"></div>
                    </div>
                    <div className="dossier-content">
                        <div className="bento-header">
                            <AthleticsIcon />
                            <h3>Athlete</h3>
                        </div>
                        <p>
                            Beyond code, athletics has been a huge part of my life, shaping my discipline and consistency. Whether it's the track or a terminal, I'm always looking for the next bar to clear!
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.section>
);

/* ─── Root: swap by viewport ─────────────────────────────── */
const About = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(max-width: 640px)').matches;
    });
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        const onChange = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);
    return isMobile ? <MobileAbout /> : <DesktopAbout />;
};

export default About;
