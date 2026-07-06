import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FILE_ID = '1jkqFZhWYYwAo4vZenrM0FPBlGj3ZLvBG';

const RESUME_URLS = {
    preview: `https://drive.google.com/file/d/${FILE_ID}/preview`,
    download: `https://drive.google.com/uc?export=download&id=${FILE_ID}`,
    drive: `https://drive.google.com/file/d/${FILE_ID}/view?usp=drive_link`,
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.18 } },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { type: 'spring', bounce: 0.18, duration: 0.38 },
    },
    exit: {
        opacity: 0, scale: 0.96, y: 20,
        transition: { duration: 0.16, ease: 'easeIn' },
    },
};

const spring = { type: 'spring', stiffness: 380, damping: 20 };

/* ── SVG icons ───────────────────────────────────────── */
const IconFile = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);

const IconClose = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const IconDownload = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const IconExternalLink = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

/* ── Component ───────────────────────────────────────── */
const ResumeModal = ({ isOpen, onClose, triggerRef }) => {
    const modalRef = useRef(null);
    const firstFocusRef = useRef(null);

    /* ── Body scroll lock + navbar pointer-events kill ── */
    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('rm-open');
        return () => {
            document.body.style.overflow = prev;
            document.body.classList.remove('rm-open');
        };
    }, [isOpen]);

    /* ── Focus management ── */
    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => firstFocusRef.current?.focus(), 60);
            return () => clearTimeout(t);
        } else {
            triggerRef?.current?.focus();
        }
    }, [isOpen, triggerRef]);

    /* ── ESC + Tab focus trap ── */
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') { onClose(); return; }
            if (e.key === 'Tab') {
                const el = modalRef.current;
                if (!el) return;
                const focusable = [...el.querySelectorAll(
                    'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
                )];
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
                } else {
                    if (document.activeElement === last) { e.preventDefault(); first.focus(); }
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="rm-overlay"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                    aria-label="Close resume viewer"
                >
                    <motion.div
                        ref={modalRef}
                        className="rm-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="rm-title"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ── Slim title bar ── */}
                        <div className="rm-header">
                            <div className="rm-title-group">
                                <IconFile />
                                <h2 id="rm-title" className="rm-title">Resume</h2>
                            </div>

                            {/* ── Compact action toolbar ── */}
                            <div className="rm-toolbar">
                                <motion.a
                                    href={RESUME_URLS.download}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rm-tool-btn"
                                    aria-label="Download resume"
                                    whileHover={{ y: -2, scale: 1.05 }}
                                    whileTap={{ y: 1, scale: 0.96 }}
                                    transition={spring}
                                >
                                    <IconDownload />
                                    <span>Download</span>
                                </motion.a>

                                <motion.a
                                    href={RESUME_URLS.drive}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rm-tool-btn"
                                    aria-label="Open in Google Drive"
                                    whileHover={{ y: -2, scale: 1.05 }}
                                    whileTap={{ y: 1, scale: 0.96 }}
                                    transition={spring}
                                >
                                    <IconExternalLink />
                                    <span>Drive</span>
                                </motion.a>

                                <motion.button
                                    ref={firstFocusRef}
                                    className="rm-close-x"
                                    onClick={onClose}
                                    aria-label="Close resume viewer"
                                    whileHover={{ scale: 1.15, rotate: 12 }}
                                    whileTap={{ scale: 0.88 }}
                                    transition={spring}
                                >
                                    <IconClose />
                                </motion.button>
                            </div>
                        </div>

                        {/* ── PDF iframe fills remaining space ── */}
                        <div className="rm-iframe-wrap">
                            <iframe
                                src={RESUME_URLS.preview}
                                className="rm-iframe"
                                title="Arshath Ahamed – Resume"
                                allow="autoplay"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ResumeModal;
