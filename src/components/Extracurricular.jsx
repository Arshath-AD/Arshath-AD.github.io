import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Activity data ──────────────────────────────────────── */
const activities = [
    {
        id: 'pole',
        title: 'Pole Vaulter',
        caption: '12th Grade · 30.10.23',
        desc: 'District Gold Medalist & State Rank #4. Personal Best: 3.50m.',
        videoSrc: '/assets/videos/PoleVaulting.mp4',
        accent: 'var(--primary-color)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="4"/><polyline points="6 10 12 4 18 10"/>
                <line x1="4" y1="20" x2="20" y2="20"/>
            </svg>
        ),
    },
    {
        id: 'talk',
        title: 'Talkonauts',
        caption: 'Fourth Semester · 30.01.26',
        desc: 'Executive Leadership Member. Organizing events and building a great community.',
        videoSrc: '/assets/videos/TalkonautsSpeech.mp4',
        accent: 'var(--accent-yellow)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        ),
    },
    {
        id: 'toast',
        title: 'Toastmasters',
        caption: 'Video Coming Soon',
        desc: 'Active Member. Crafting speeches and evaluations to sharpen communication prowess.',
        videoSrc: '/assets/videos/Toastmasters.mp4',
        accent: '#a5f3c0',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
        ),
    },
];

/* ─── Play icon SVG ──────────────────────────────────────── */
const PlayIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
);

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

/* ─── Mobile Extracurricular ─────────────────────────────── */
const MobileExtracurricular = () => {
    const [preview, setPreview] = useState(null);

    return (
        <section id="extracurricular" className="section m-extra">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
            >
                Life Outside Code
            </motion.h2>

            <div className="m-extra-list">
                {activities.map((act, i) => (
                    <motion.div
                        key={act.id}
                        className="m-extra-card"
                        style={{ '--act-accent': act.accent }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ type: 'spring', bounce: 0.3, duration: 0.6, delay: i * 0.1 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Video thumbnail — inline, muted, loops silently */}
                        <div className="m-extra-video-wrap">
                            <video
                                src={act.videoSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="m-extra-video-thumb"
                            />
                            {/* Watch button overlay */}
                            <button
                                className="m-extra-play-btn"
                                onClick={() => setPreview(act.id)}
                                aria-label={`Watch ${act.title}`}
                            >
                                <PlayIcon />
                                Watch
                            </button>
                        </div>

                        {/* Card content */}
                        <div className="m-extra-body">
                            <div className="m-extra-header">
                                <span className="m-extra-icon">{act.icon}</span>
                                <h3 className="m-extra-title">{act.title}</h3>
                            </div>
                            <p className="m-extra-desc">{act.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Fullscreen video modal */}
            <AnimatePresence>
                {preview && (() => {
                    const act = activities.find(a => a.id === preview);
                    return (
                        <motion.div
                            className="m-extra-modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setPreview(null)}
                        >
                            <motion.div
                                className="m-extra-modal"
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.85, opacity: 0 }}
                                transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button
                                    className="m-extra-close"
                                    onClick={() => setPreview(null)}
                                    aria-label="Close"
                                >
                                    <CloseIcon />
                                </button>

                                <video
                                    src={act.videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="m-extra-modal-video"
                                />

                                <div className="m-extra-modal-caption">
                                    <span className="m-extra-modal-title">{act.title}</span>
                                    <span className="m-extra-modal-date">{act.caption}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </section>
    );
};

/* ─── Desktop Extracurricular (preserved exactly) ────────── */
const DesktopExtracurricular = () => {
    const [preview, setPreview] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.5 } }
    };

    const CloseBtn = () => (
        <button
            onClick={() => setPreview(null)}
            style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                width: '2.4rem', height: '2.4rem', borderRadius: '50%',
                border: '2px solid #000', background: 'var(--accent-yellow)',
                boxShadow: '3px 3px 0 #000', fontSize: '1.2rem', fontWeight: 'bold',
                lineHeight: 1, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', zIndex: 10,
            }}
            aria-label="Close preview"
        >✕</button>
    );

    // Desktop requires a specific ordering (Pole in the middle)
    const desktopActivities = [activities[1], activities[0], activities[2]];

    return (
        <motion.section
            id="extracurricular"
            className="section extracurricular"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <h2 className="section-title">Life Outside Code</h2>
            <motion.div className="container activities-grid" variants={containerVariants}>
                {desktopActivities.map((activity, index) => {
                    // Reapply the staggered grid logic: the middle card (index 1) gets popped up higher
                    const hoverPhysics = index === 1 
                        ? { y: -25, rotate: 1, boxShadow: '10px 10px 0px 0px #000' }
                        : { y: -5, rotate: index === 0 ? -1 : 1, boxShadow: '10px 10px 0px 0px #000' };
                    const stylePhysics = index === 1 ? { y: -20, borderTop: `6px solid ${activity.accent}` } : { borderTop: `6px solid ${activity.accent}` };

                    return (
                        <motion.div 
                            key={activity.id} 
                            className="activity-card bento-card" 
                            variants={itemVariants} 
                            whileHover={hoverPhysics} 
                            style={stylePhysics} 
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="bento-header" style={{ marginBottom: '1rem' }}>
                                {activity.icon}
                                <h3>{activity.title}</h3>
                            </div>

                            <div
                                className="activity-video-container"
                                onMouseEnter={() => setPreview(activity.id)}
                                style={{ position: 'relative', width: '100%', height: '11.25rem', overflow: 'hidden', borderRadius: '10px', marginBottom: '1.5rem', border: '2px solid var(--border-color)', background: '#000' }}
                            >
                                {preview !== activity.id && (
                                    <motion.video layoutId={`${activity.id}-video`} src={activity.videoSrc} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} whileHover={{ scale: 1.05 }} />
                                )}
                            </div>
                            
                            <p style={{ textAlign: 'left' }}>{activity.desc}</p>
                        </motion.div>
                    );
                })}
            </motion.div>

            <AnimatePresence>
                {preview && (() => {
                    const activeItem = activities.find(a => a.id === preview);
                    return (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', zIndex: 999999, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
                            <motion.div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto' }} onMouseLeave={() => setPreview(null)}>
                                <CloseBtn />
                                <div style={{ position: 'relative' }}>
                                    <motion.video layoutId={`${preview}-video`} src={activeItem.videoSrc} autoPlay loop muted playsInline
                                        style={{ width: '80vw', maxHeight: '80vh', objectFit: 'cover', borderRadius: '20px', border: 'var(--border-width) solid var(--border-color)', boxShadow: '15px 15px 0px 0px #000', backgroundColor: 'var(--card-bg)', display: 'block' }} />
                                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                                        style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', background: 'var(--card-bg)', color: 'var(--text-color)', border: '2px solid var(--border-color)', boxShadow: '4px 4px 0px 0px #000', padding: '0.4rem 1rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 'bold', zIndex: 10, pointerEvents: 'none' }}>
                                        Take hover elsewhere to exit preview
                                    </motion.p>
                                </div>
                                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                    style={{ background: activeItem.accent, color: 'var(--text-color)', border: 'var(--border-width) solid var(--border-color)', boxShadow: '5px 5px 0px 0px #000', padding: '0.5rem 1.5rem', borderRadius: '30px', marginTop: '1.5rem', fontSize: '1.3rem', fontWeight: 600, fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>
                                    {activeItem.caption}
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </motion.section>
    );
};

/* ─── Root ───────────────────────────────────────────────── */
const Extracurricular = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return isMobile ? <MobileExtracurricular /> : <DesktopExtracurricular />;
};

export default Extracurricular;
