import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Project data ───────────────────────────────────────── */
const projects = [
    {
        id: 'orewa',
        num: '01',
        title: 'Orewa Nova',
        hook: 'Behold! The Anime Platform!',
        status: 'Active',
        themeClass: 'panel-orewa',
        stack: ['Django', 'MongoDB', 'JavaScript'],
        desc: 'A comprehensive full-stack anime discovery platform engineered for high-performance browsing.',
        features: [
            'Role-Based Access Control',
            'Custom Admin Dashboard',
            'Dynamic Homepage Rendering',
            'Media Uploads & Processing'
        ],
        url: 'https://github.com/Arshath-AD/Anime-review-webapp-orewanova.git',
        images: [
            '/projects/orewanova1.webp',
            '/projects/orewanova2.webp',
            '/projects/orewanova3.webp',
            '/projects/orewanova4.webp',
            '/projects/orewanova5.webp'
        ],
        accent: 'var(--primary-color)',
        ariaLabel: 'View Orewa Nova project source code on GitHub (opens in new tab)',
    },
    {
        id: 'teamsync',
        num: '02',
        title: 'TeamSync',
        hook: 'Need Enterprise Syncing?!',
        status: 'Enterprise',
        themeClass: 'panel-teamsync',
        stack: ['Laravel', 'PHP', 'Docker', 'MariaDB'],
        desc: 'An enterprise-grade project management dashboard with containerized infrastructure and secure RBAC.',
        features: [
            'Dockerized Environment',
            'Secure Authentication',
            'Workspace Management',
            'Robust File Storage'
        ],
        url: 'https://github.com/Arshath-AD/TeamSync.git',
        images: [
            '/projects/TeamSync1.webp',
            '/projects/TeamSync2.webp',
            '/projects/TeamSync3.webp',
            '/projects/TeamSync4.webp',
            '/projects/TeamSync5.webp',
            '/projects/TeamSync6.webp'
        ],
        accent: '#7cd6fb',
        ariaLabel: 'View TeamSync source code on GitHub (opens in new tab)',
    },
    {
        id: 'stock',
        num: '03',
        title: 'AI Stock Analyzer',
        hook: 'Predict The Unpredictable.',
        status: 'Machine Learning',
        themeClass: 'panel-stock',
        stack: ['Python', 'Flask', 'Scikit-Learn', 'Pandas'],
        desc: 'A machine learning web application architected to predict NSE stock trends using Random Forest Classifiers.',
        features: [
            '85% Prediction Accuracy',
            'Machine Learning Pipeline',
            'Data Preprocessing',
            'REST API Integration'
        ],
        url: 'https://github.com/Arshath-AD/Stock-Sentiment-Analyzer-Flask.git',
        images: [
            '/projects/StockPredictor1.webp',
            '/projects/StockPredictor2.webp',
            '/projects/StockPredictor3.webp'
        ],
        accent: '#a5f3c0',
        ariaLabel: 'View AI Stock Sentiment Analyzer source code on GitHub (opens in new tab)',
    },
];

const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const CheckIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

/* ─── Reusable Image Slideshow ─────────────────────────────── */
const ImageSlideshow = ({ images, size = 'lg' }) => {
    const [idx, setIdx] = useState(0);
    const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
    const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };
    return (
        <div className={`modal-slideshow${size === 'sm' ? ' modal-slideshow--sm' : ''}`}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={idx}
                    src={images[idx]}
                    alt={`Screenshot ${idx + 1}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.22 }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
            </AnimatePresence>
            {images.length > 1 && (
                <>
                    <button className="slide-btn slide-btn-prev" onClick={prev} aria-label="Previous">&#8592;</button>
                    <button className="slide-btn slide-btn-next" onClick={next} aria-label="Next">&#8594;</button>
                    <div className="slide-dots">
                        {images.map((_, i) => (
                            <button key={i} className={`slide-dot${i === idx ? ' active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                                aria-label={`Go to ${i + 1}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


const DesktopProjects = () => {
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('project-modal-open');
        } else {
            document.body.style.overflow = 'auto';
            document.body.classList.remove('project-modal-open');
        }
        return () => document.body.classList.remove('project-modal-open');
    }, [activeProject]);

    return (
        <section id="projects" className="section projects">
            <h2 className="section-title">Cool Stuff I Made</h2>

            <motion.div
                className="comic-page-grid"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: 'spring', bounce: 0.3 }}
            >
                {projects.map(proj => (
                    <motion.div
                        layoutId={`panel-container-${proj.id}`}
                        key={proj.id}
                        className={`comic-panel ${proj.themeClass}`}
                        onClick={() => setActiveProject(proj)}
                        whileHover="hover"
                        initial="initial"
                    >
                        <div className="halftone-overlay"></div>
                        <div className="panel-image-placeholder">
                            <img
                                src={proj.images[0]}
                                alt={`${proj.title} Preview`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <motion.div
                            className="speech-bubble"
                            variants={{
                                hover: { scale: 1, opacity: 1, y: 0 },
                                initial: { scale: 0.8, opacity: 0, y: 15 }
                            }}
                            transition={{ type: 'spring', bounce: 0.6 }}
                        >
                            {proj.hook}
                        </motion.div>

                        <motion.h3 layoutId={`title-${proj.id}`} className="panel-title">{proj.title}</motion.h3>
                        <span className="click-indicator">READ ISSUE</span>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {activeProject && (
                    <>
                        <motion.div
                            className="modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveProject(null)}
                        />
                        <div className="modal-scroll-wrapper" onClick={() => setActiveProject(null)}>
                            {/* Floating wrapper: card + badge below */}
                            <div className="modal-float-wrapper" onClick={(e) => e.stopPropagation()}>

                                {/* Yellow circular close button — floats on top-right corner */}
                                <button className="modal-close-circle" onClick={() => setActiveProject(null)} aria-label="Close">×</button>

                                <motion.div
                                    layoutId={`panel-container-${activeProject.id}`}
                                    className="comic-modal-dark"
                                >
                                    {/* 16:9 Slideshow fills the dark card */}
                                    <ImageSlideshow images={activeProject.images} />

                                    {/* Details below slideshow, inside dark card */}
                                    <div className="modal-details-dark">
                                        <div className="modal-details-top">
                                            {/* Left: chips + description */}
                                            <div className="modal-details-left">
                                                <div className="tech-stack">
                                                    {activeProject.stack.map(tech => <span key={tech} className="tech-chip">{tech}</span>)}
                                                </div>
                                                <p className="project-desc">{activeProject.desc}</p>
                                            </div>
                                            {/* Right: features grid */}
                                            <div className="modal-details-right">
                                                <ul className="project-features">
                                                    {activeProject.features.map(f => (
                                                        <li key={f}><CheckIcon />{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        {/* Full-width repo button */}
                                        <a href={activeProject.url} target="_blank" rel="noreferrer" className="btn project-btn">
                                            <GitHubIcon /> View on GitHub
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Floating title badge below the card */}
                                <div className="modal-title-badge">
                                    <motion.span layoutId={`title-${activeProject.id}`} className="modal-badge-title">
                                        {activeProject.title}
                                    </motion.span>
                                    <span className="modal-badge-status">{activeProject.status}</span>
                                </div>

                            </div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

/* ─── Mobile Projects (Simplified Fallback) ───────────────── */
const MobileProjCard = ({ proj, i }) => (
    <motion.article
        className={`m-comic-panel ${proj.themeClass}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.65, delay: i * 0.1 }}
    >
        {/* Slideshow replaces the static image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderBottom: '3px solid #111' }}>
            <div className="halftone-overlay" style={{ zIndex: 1 }}></div>
            <ImageSlideshow images={proj.images} size="sm" />
        </div>

        <div className="m-card-content">
            <div className="m-title-row">
                <h3 className="m-proj-title">{proj.title}</h3>
                <span className="m-proj-status">{proj.status}</span>
            </div>
            <div className="m-tech-stack">
                {proj.stack.map(tech => <span key={tech} className="m-tech-chip">{tech}</span>)}
            </div>
            <p className="m-proj-desc">{proj.desc}</p>
            <ul className="m-project-features">
                {proj.features.map(f => (
                    <li key={f}><CheckIcon />{f}</li>
                ))}
            </ul>
            <a href={proj.url} target="_blank" rel="noreferrer" className="m-proj-link">
                <GitHubIcon />View Source
            </a>
        </div>
    </motion.article>
);

const MobileProjects = () => (
    <section id="projects" className="section m-projects">
        <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
        >
            Cool Stuff I Made
        </motion.h2>
        <div className="m-projects-list">
            {projects.map((proj, i) => <MobileProjCard key={proj.id} proj={proj} i={i} />)}
        </div>
    </section>
);

/* ─── Root ───────────────────────────────────────────────── */
const Projects = () => {
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
    return isMobile ? <MobileProjects /> : <DesktopProjects />;
};

export default Projects;
