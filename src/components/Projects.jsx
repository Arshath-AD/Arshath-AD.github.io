import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Project data ───────────────────────────────────────── */
const projects = [
    {
        num: '01',
        title: 'Orewa Nova',
        badge: 'Django',
        desc: 'A full-stack anime discovery platform using Django & MongoDB. Features role-based access, custom admin dashboard, and dynamic homepage.',
        url: 'https://github.com/Arshath-AD/Anime-review-webapp-orewanova.git',
        accent: 'var(--primary-color)',
    },
    {
        num: '02',
        title: 'AI Stock Predictor',
        badge: 'ML / Python',
        desc: 'Machine Learning web app to predict NSE stock trends using Random Forest Classifier. Achieved 85% prediction accuracy.',
        url: 'https://github.com/Arshath-AD/Stock-Sentiment-Analyzer-Flask.git',
        accent: 'var(--accent-yellow)',
    },
    {
        num: '03',
        title: 'Attendance Tracker',
        badge: 'Flask',
        desc: 'Flask-based web app for managing student attendance efficiently. Uses MongoDB for dynamic storage of logs.',
        url: 'https://github.com/Arshath-AD/AttendanceTracker.git',
        accent: '#a5f3c0',
    },
];

const GitHubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
);

/* ─── Mobile Projects ─────────────────────────────────────── */
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
                    className="m-project-card"
                    style={{ '--proj-accent': proj.accent }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.65, delay: i * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Number + badge row */}
                    <div className="m-proj-top">
                        <span className="m-proj-num">{proj.num}</span>
                        <span className="m-proj-badge">{proj.badge}</span>
                    </div>

                    {/* Title */}
                    <h3 className="m-proj-title">{proj.title}</h3>

                    {/* Description */}
                    <p className="m-proj-desc">{proj.desc}</p>

                    {/* Link */}
                    <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="m-proj-link"
                    >
                        <GitHubIcon />
                        View Code
                    </a>
                </motion.article>
            ))}
        </div>
    </section>
);

/* ─── Desktop Projects (untouched) ───────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
};

const DesktopProjects = () => (
    <motion.section
        id="projects"
        className="section projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
    >
        <h2 className="section-title">Cool Stuff I Made</h2>
        <motion.div className="container projects-grid" variants={containerVariants}>
            {projects.map((proj, i) => (
                <motion.article 
                    key={i}
                    className="project-card" 
                    variants={itemVariants} 
                >
                    <div className="card-header" style={{ background: proj.accent }}>
                        <h3>{proj.title}</h3>
                        <span className="badge">{proj.badge}</span>
                    </div>
                    <div className="card-body">
                        <p>{proj.desc}</p>
                    </div>
                    <div className="card-footer">
                        <a 
                            href={proj.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="btn btn-small project-btn"
                        >
                            <GitHubIcon /> View Code
                        </a>
                    </div>
                </motion.article>
            ))}
        </motion.div>
    </motion.section>
);

/* ─── Root ───────────────────────────────────────────────── */
const Projects = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return isMobile ? <MobileProjects /> : <DesktopProjects />;
};

export default Projects;
