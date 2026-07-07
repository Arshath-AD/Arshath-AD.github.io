import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

/* ─── SVG icons ──────────────────────────────────────────── */
const EmailIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19 12v6" stroke="#34A853" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M5 12v6" stroke="#4285F4" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M19 8v4" stroke="#FBBC04" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M12 14.5l7-6.5" stroke="#FBBC04" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M5 8v4" stroke="#EA4335" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M5 8l7 6.5" stroke="#EA4335" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
);

const GitHubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const TornEdge = () => (
    <svg viewBox="0 0 100 12" preserveAspectRatio="none" style={{ position: 'absolute', bottom: '-2px', left: 0, width: '100%', height: '14px', zIndex: 1 }}>
        <path d="M0 12 L 5 2 L 15 12 L 25 2 L 35 12 L 45 2 L 55 12 L 65 2 L 75 12 L 85 2 L 95 12 L 100 2 V 12 Z" fill="#fcfcfc" />
        <path d="M0 12 L 5 2 L 15 12 L 25 2 L 35 12 L 45 2 L 55 12 L 65 2 L 75 12 L 85 2 L 95 12 L 100 2" fill="none" stroke="#111" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="miter" />
    </svg>
);

const links = [
    {
        label: 'Send Email',
        title: 'EMAIL',
        desc: "Let's talk about ideas, opportunities, or just collaborating on something cool.",
        href: 'mailto:arshathad2006@gmail.com',
        Icon: EmailIcon,
        cardColor: '#ef4444', // Red Header
        accent: '#ffffff', // White button
        textColor: '#202124', // Dark text
        hoverBg: '#fce8e6', // Soft red hover
        ariaLabel: 'Send an email to Arshath Ahamed',
    },
    {
        label: 'View Profile',
        title: 'LINKEDIN',
        desc: "Connect with me professionally and let's build meaningful connections.",
        href: 'https://linkedin.com/in/arshath-ahamed-45b34830a',
        Icon: LinkedInIcon,
        cardColor: '#3b82f6', // Blue Header
        accent: '#2563eb',
        textColor: '#FFFFFF',
        hoverBg: '#1d4ed8',
        ariaLabel: "View Arshath Ahamed's LinkedIn profile (opens in new tab)",
    },
    {
        label: 'View Profile',
        title: 'GITHUB',
        desc: 'Check out my code, projects, and contributions on GitHub.',
        href: 'https://github.com/Arshath-AD',
        Icon: GitHubIcon,
        cardColor: '#1f2937', // Black Header
        accent: '#111827',
        textColor: '#FFFFFF',
        hoverBg: '#000000',
        ariaLabel: "View Arshath Ahamed's GitHub profile (opens in new tab)",
    },
];

/* ─── Unified Scrapbook Contact ────────────────────────── */
const Contact = () => (
    <>
        <motion.section
            id="contact"
            className="section scrapbook-contact-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="scrapbook-contact-board">
                {/* Decorative Elements */}
                <div className="contact-push-pin"></div>
                <div className="contact-paper-fold"></div>
                <div className="contact-tape-top-right"></div>
                
                {/* Title Banner (Using Global Section Title) */}
                <h2 className="section-title" style={{ left: 'auto', transform: 'rotate(-1.5deg)', marginBottom: '3.5rem', zIndex: 10 }}>
                    CONTACT
                </h2>

                {/* Inner Header */}
                <div className="contact-lets-connect">
                    <h3>LET'S CONNECT!</h3>
                    <div className="contact-underline"></div>
                </div>

                {/* Cards Container */}
                <div className="contact-cards-container">
                    {links.map((link, index) => (
                        <motion.div
                            key={link.title}
                            className="contact-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: index * 0.15, type: 'spring', bounce: 0.4 }}
                        >
                            <div className="card-top-bg" style={{ '--card-color': link.cardColor }}>
                                <TornEdge />
                            </div>

                            <div className="card-icon-wrapper">
                                <link.Icon />
                            </div>

                            <h4>{link.title}</h4>
                            <div className="card-dashed-line" style={{ '--card-color': link.cardColor }}></div>
                            <p>{link.desc}</p>

                            <div className="contact-btn-wrapper">
                                {/* THE BUTTON: Kept entirely untouched and exact as requested */}
                                <Magnetic>
                                    <motion.a
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={link.ariaLabel}
                                        className="social-btn"
                                        style={{
                                            background: link.accent,
                                            color: link.textColor,
                                        }}
                                        whileHover={{
                                            scale: 1.05, y: -4, x: -4,
                                            boxShadow: '8px 8px 0px 0px #000',
                                            background: link.hoverBg,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                            default: { type: 'spring', stiffness: 300, damping: 20 },
                                            background: { duration: 0.22, ease: 'easeOut' },
                                            boxShadow: { duration: 0.18, ease: 'easeOut' },
                                        }}
                                    >
                                        <link.Icon />
                                        <span>{link.label}</span>
                                    </motion.a>
                                </Magnetic>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="contact-bottom-note">
                    <div className="tape-black"></div>
                    <p>♡ Feel free to reach out for collaborations or just to say hi!</p>
                </div>
            </div>
        </motion.section>

        <footer style={{ textAlign: 'center', padding: '2rem', background: 'var(--card-bg)', borderTop: '2px solid #111' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontWeight: 'bold' }}>&copy; 2026 Arshath Ahamed.</p>
        </footer>
    </>
);

export default Contact;
