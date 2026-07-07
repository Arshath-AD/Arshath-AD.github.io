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
        accent: '#a5f3c0',
        ariaLabel: 'View AI Stock Sentiment Analyzer source code on GitHub (opens in new tab)',
    },
];

const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
);

const CheckIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

/* ─── Desktop Interactive Storyboard ───────────────────────── */
const DesktopProjects = () => {
    const [activeProject, setActiveProject] = useState(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
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
                                src={`https://placehold.co/800x600/e2e8f0/1e293b?text=${encodeURIComponent(proj.title)}`} 
                                alt={`${proj.title} Mockup`} 
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
                            <motion.div 
                                layoutId={`panel-container-${activeProject.id}`}
                                className={`comic-modal ${activeProject.themeClass}`}
                                onClick={(e) => e.stopPropagation()} // prevent click from closing modal
                            >
                                <div className="modal-header">
                                    <motion.h3 layoutId={`title-${activeProject.id}`} className="modal-title">{activeProject.title}</motion.h3>
                                    <span className="modal-status">{activeProject.status}</span>
                                    <button className="close-btn" onClick={() => setActiveProject(null)}>×</button>
                                </div>
                                
                                <div className="modal-body">
                                    <div className="modal-image-placeholder">
                                        <img 
                                            src={`https://placehold.co/1200x800/e2e8f0/1e293b?text=${encodeURIComponent(activeProject.title + ' High-Res')}`} 
                                            alt={`${activeProject.title} High-Res Mockup`} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                    </div>
                                    
                                    <div className="modal-details">
                                        <div className="tech-stack">
                                            {activeProject.stack.map(tech => <span key={tech} className="tech-chip">{tech}</span>)}
                                        </div>
                                        <p className="project-desc">{activeProject.desc}</p>
                                        <ul className="project-features">
                                            {activeProject.features.map(f => (
                                                <li key={f}><CheckIcon />{f}</li>
                                            ))}
                                        </ul>
                                        <a href={activeProject.url} target="_blank" rel="noreferrer" className="btn project-btn" style={{ marginTop: 'auto' }}>
                                            <GitHubIcon /> View Source
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

/* ─── Mobile Projects (Simplified Fallback) ───────────────── */
// For mobile, the grid morphing can be clunky, so we present them as stacked comic panels
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
            {projects.map((proj, i) => (
                <motion.article
                    key={i}
                    className={`m-comic-panel ${proj.themeClass}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.65, delay: i * 0.1 }}
                >
                    <div className="m-panel-image">
                        <div className="halftone-overlay"></div>
                        <img 
                            src={`https://placehold.co/800x600/e2e8f0/1e293b?text=${encodeURIComponent(proj.title)}`} 
                            alt={`${proj.title} Mockup`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
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

                        <a
                            href={proj.url}
                            target="_blank"
                            rel="noreferrer"
                            className="m-proj-link"
                        >
                            <GitHubIcon />
                            View Source
                        </a>
                    </div>
                </motion.article>
            ))}
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
