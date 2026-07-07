import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Activity data ──────────────────────────────────────── */
const activities = [
    {
        id: 'pole',
        title: 'Pole Vaulter',
        caption: 'District Gold Medalist & State Rank #4. Personal Best: 3.50m.',
        date: '12th Grade',
        videoSrc: '/assets/videos/PoleVaulting.mp4',
        type: 'polaroid'
    },
    {
        id: 'talk',
        title: 'Talkonauts',
        caption: 'Organizing events & building community.',
        date: 'Fourth Semester',
        videoSrc: '/assets/videos/TalkonautsSpeech.mp4',
        type: 'sticky'
    },
    {
        id: 'toast',
        title: 'Toastmasters',
        caption: 'Crafting speeches to sharpen communication prowess.',
        date: 'Present',
        videoSrc: '/assets/videos/Toastmasters.mp4',
        type: 'notebook'
    },
];

/* ─── Play / Close icons ─────────────────────────────────── */
const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
);

const CloseIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

/**
 * LazyVideo — only starts loading when it enters the viewport.
 */
const LazyVideo = ({ src, className, autoPlay = true, loop = true, muted = true, playsInline = true, style, videoRef: externalRef }) => {
    const internalRef = useRef(null);
    const videoRef = externalRef || internalRef;
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            className={className}
            style={style}
            src={isInView ? src : undefined}
            preload="metadata"
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            aria-hidden="true"
        />
    );
};

const ThemedModalVideo = ({ src, label, className, style, refCallback }) => {
    const internalRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = (e) => {
        e.stopPropagation();
        if (internalRef.current) {
            if (internalRef.current.paused) {
                internalRef.current.play();
                setIsPlaying(true);
            } else {
                internalRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', borderRadius: style?.borderRadius, overflow: 'hidden', height: '100%', width: '100%' }}>
            <video
                ref={(node) => {
                    internalRef.current = node;
                    if (refCallback) refCallback(node);
                }}
                src={src}
                className={className}
                style={{ ...style, cursor: 'pointer' }}
                loop
                muted
                playsInline
                preload="auto"
                aria-label={label}
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            
            <AnimatePresence>
                {!isPlaying && (
                    <motion.button
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                        style={{
                            position: 'absolute',
                            background: 'var(--primary-color)',
                            border: '4px solid #111',
                            borderRadius: '50%',
                            width: '80px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '6px 6px 0 #111',
                            cursor: 'pointer',
                            zIndex: 10,
                            paddingLeft: '6px'
                        }}
                        aria-label="Play video"
                    >
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="#111">
                            <path d="M5 3L19 12L5 21V3Z" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─── Scrapbook Root ───────────────────────────────────────── */
const Extracurricular = () => {
    const [preview, setPreview] = useState(null);
    const modalVideoRef = useRef(null);

    // Auto-play the modal video when opened
    useEffect(() => {
        if (preview && modalVideoRef.current) {
            modalVideoRef.current.play().catch(() => {});
        }
    }, [preview]);

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
        >
            <CloseIcon />
        </button>
    );

    return (
        <section id="extracurricular" className="section scrapbook-section" aria-label="Life outside code">
            <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Life Outside Code
            </motion.h2>
            
            <div className="scrapbook-board">

                {/* 1. Pole Vaulter (Polaroid) */}
                <motion.div 
                    className="sb-item sb-polaroid"
                    initial={{ opacity: 0, x: -40, rotate: -15 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                    viewport={{ once: true }}
                >
                    <div className="tape-top"></div>
                    <div className="sb-photo" onClick={() => setPreview('pole')}>
                        <LazyVideo src={activities[0].videoSrc} />
                        <div className="sb-play-overlay"><PlayIcon /></div>
                    </div>
                    <div className="sb-caption-handwritten">
                        <span className="sb-label">{activities[0].date}</span><br/>
                        {activities[0].caption}
                    </div>
                </motion.div>

                {/* 2. Talkonauts (Sticky Note) */}
                <motion.div 
                    className="sb-item sb-sticky"
                    initial={{ opacity: 0, y: 40, rotate: 15 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                    viewport={{ once: true }}
                >
                    <div className="push-pin"></div>
                    <span className="sb-label">{activities[1].title}</span>
                    <p className="handwritten-text">{activities[1].caption}</p>
                    <div className="sb-photo small-photo" onClick={() => setPreview('talk')}>
                        <LazyVideo src={activities[1].videoSrc} />
                        <div className="sb-play-overlay"><PlayIcon /></div>
                        <div className="tape-corner"></div>
                    </div>
                </motion.div>

                {/* 3. Toastmasters (Notebook Paper) */}
                <motion.div 
                    className="sb-item sb-notebook"
                    initial={{ opacity: 0, x: 40, rotate: 10 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                    viewport={{ once: true }}
                >
                    <div className="paper-clip"></div>
                    <span className="sb-label" style={{ boxShadow: '2px 2px 0 #a5f3c0' }}>
                        {activities[2].title}
                    </span>
                    <div className="sb-photo" onClick={() => setPreview('toast')} style={{ height: '180px' }}>
                        <LazyVideo src={activities[2].videoSrc} />
                        <div className="sb-play-overlay"><PlayIcon /></div>
                    </div>
                    <p className="handwritten-text">{activities[2].caption}</p>
                </motion.div>

            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {preview && (() => {
                    const activeItem = activities.find(a => a.id === preview);
                    return (
                        <motion.div 
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${activeItem.title} video preview`}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', zIndex: 999999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <motion.div 
                                style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto', width: '90%', maxWidth: '800px' }} >
                                <CloseBtn />
                                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', maxHeight: '75vh', minHeight: '200px' }}>
                                    <ThemedModalVideo
                                        refCallback={(node) => modalVideoRef.current = node}
                                        src={activeItem.videoSrc}
                                        label={`${activeItem.title} - ${activeItem.caption}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px', border: '4px solid #111', boxShadow: '10px 10px 0px 0px #000', backgroundColor: '#111' }} 
                                    />
                                </div>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                    style={{ background: '#fff', color: '#111', border: '3px solid #111', boxShadow: '5px 5px 0px 0px #000', padding: '0.8rem 1.5rem', borderRadius: '30px', marginTop: '2rem', textAlign: 'center' }}>
                                    <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.5rem', textTransform: 'uppercase' }}>{activeItem.title}</h3>
                                    <p style={{ margin: '0.2rem 0 0 0', fontFamily: 'var(--font-ui)', fontWeight: 'bold' }}>{activeItem.date}</p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </section>
    );
};

export default Extracurricular;
