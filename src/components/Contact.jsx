import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

/* ─── SVG icons ──────────────────────────────────────────── */
const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
    </svg>
);
const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
);
const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
);

const links = [
    {
        label: 'Email',
        href: 'mailto:arshathad2006@gmail.com',
        Icon: EmailIcon,
        accent: 'var(--primary-color)',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/arshath-ahamed-45b34830a',
        Icon: LinkedInIcon,
        accent: 'var(--accent-yellow)',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/Arshath-AD',
        Icon: GitHubIcon,
        accent: '#a5f3c0',
    },
];

/* ─── Mobile Contact ─────────────────────────────────────── */
const MobileContact = () => (
    <>
        <section id="contact" className="section m-contact">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
            >
                Let's Connect!
            </motion.h2>

            <motion.p
                className="m-contact-sub"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                Feel free to reach out for collaborations or just to say hi!
            </motion.p>

            <div className="m-contact-links">
                {links.map((link, i) => (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="m-contact-btn"
                        style={{ '--link-accent': link.accent }}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ type: 'spring', bounce: 0.35, duration: 0.55, delay: i * 0.1 }}
                        whileTap={{ scale: 0.96, x: 3, y: 3 }}
                    >
                        <span className="m-contact-btn-icon"><link.Icon /></span>
                        <span className="m-contact-btn-label">{link.label}</span>
                        {/* Arrow */}
                        <svg className="m-contact-btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </motion.a>
                ))}
            </div>
        </section>

        <footer className="m-footer">
            <p>&copy; 2026 Arshath Ahamed.</p>
        </footer>
    </>
);

/* ─── Desktop Contact ────────────────────────── */
const DesktopContact = () => (
    <>
        <motion.section
            id="contact"
            className="section contact"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="section-title">Contact</h2>
            <div className="container">
                <div className="contact-box bento-card">
                    <h2>Let's Connect!</h2>
                    <div className="social-links">
                        {links.map((link) => (
                            <Magnetic key={link.label}>
                                <motion.a 
                                    href={link.href} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="social-btn"
                                    style={{ background: link.accent }}
                                    whileHover={{ scale: 1.05, y: -4, x: -4, boxShadow: '8px 8px 0px 0px #000' }} 
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <link.Icon />
                                    <span>{link.label}</span>
                                </motion.a>
                            </Magnetic>
                        ))}
                    </div>
                    <div className="fun-fact">
                        <p>Feel free to reach out for collaborations or just to say hi!</p>
                    </div>
                </div>
            </div>
        </motion.section>
        <footer>
            <p>&copy; 2026 Arshath Ahamed.</p>
        </footer>
    </>
);

/* ─── Root ───────────────────────────────────────────────── */
const Contact = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return isMobile ? <MobileContact /> : <DesktopContact />;
};

export default Contact;
