import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1, scale: 1,
        transition: { type: "spring", bounce: 0.5 }
    }
};

const Extracurricular = () => {
    // Tracks which video is currently being previewed in large mode ('pole', 'talk', or 'toast')
    const [preview, setPreview] = useState(null);

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

                {/* Pole Vaulting Card */}
                <motion.div
                    className="activity-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, rotate: 1, boxShadow: "8px 8px 0px 0px #000" }}
                    whileTap={{ scale: 0.98, skewY: 2 }}
                >
                    <div
                        className="activity-video-container"
                        onMouseEnter={() => setPreview('pole')}
                        style={{ width: '100%', height: '11.25rem', overflow: 'hidden', borderRadius: '10px', marginBottom: '1rem', border: '2px solid var(--border-color)', cursor: 'none' }}
                    >
                        {preview !== 'pole' && (
                            <motion.video
                                layoutId="pole-video"
                                src="/assets/videos/PoleVaulting.mp4"
                                autoPlay loop muted playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                whileHover={{ scale: 1.05 }}
                            />
                        )}
                    </div>
                    <h3>Pole Vaulter</h3>
                    <p>District Gold Medalist & State Rank #4. Personal Best: 3.50m. Jumping over bars literal and metaphorical!</p>
                </motion.div>

                {/* Talkonauts Card */}
                <motion.div
                    className="activity-card"
                    variants={itemVariants}
                    whileHover={{ y: -25, rotate: -1, boxShadow: "8px 8px 0px 0px #000" }}
                    style={{ y: -20 }}
                    whileTap={{ scale: 0.98, skewY: 2 }}
                >
                    <div
                        className="activity-video-container"
                        onMouseEnter={() => setPreview('talk')}
                        style={{ width: '100%', height: '11.25rem', overflow: 'hidden', borderRadius: '10px', marginBottom: '1rem', border: '2px solid var(--border-color)', cursor: 'none' }}
                    >
                        {preview !== 'talk' && (
                            <motion.video
                                layoutId="talk-video"
                                src="/assets/videos/TalkonautsSpeech.mp4"
                                autoPlay loop muted playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                whileHover={{ scale: 1.05 }}
                            />
                        )}
                    </div>
                    <h3>Talkonauts</h3>
                    <p>Executive Leadership Member. Organizing events and helping peers master the art of public speaking.</p>
                </motion.div>

                {/* Toastmasters Card */}
                <motion.div
                    className="activity-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, rotate: 1, boxShadow: "8px 8px 0px 0px #000" }}
                    whileTap={{ scale: 0.98, skewY: 2 }}
                >
                    <div
                        className="activity-video-container"
                        onMouseEnter={() => setPreview('toast')}
                        style={{ width: '100%', height: '11.25rem', overflow: 'hidden', borderRadius: '10px', marginBottom: '1rem', border: '2px solid var(--border-color)', cursor: 'none' }}
                    >
                        {preview !== 'toast' && (
                            <motion.video
                                layoutId="toast-video"
                                src="/assets/videos/Toastmasters.mp4"
                                autoPlay loop muted playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                whileHover={{ scale: 1.05 }}
                            />
                        )}
                    </div>
                    <h3>Toastmasters</h3>
                    <p>Active Member. crafting speeches and evaluations to sharpen communication prowess.</p>
                </motion.div>

            </motion.div>

            {/* PREVIEW MODAL OVERLAY */}
            <AnimatePresence>
                {preview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 999999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerEvents: 'none' // The backdrop itself doesn't steal hover focus
                        }}
                    >
                        {preview === 'pole' && (
                            <motion.div
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto' }}
                                onMouseLeave={() => setPreview(null)}
                            >
                                <motion.video
                                    layoutId="pole-video"
                                    src="/assets/videos/PoleVaulting.mp4"
                                    autoPlay loop muted playsInline
                                    style={{
                                        width: '80vw',
                                        maxHeight: '80vh',
                                        objectFit: 'cover',
                                        borderRadius: '20px',
                                        border: 'var(--border-width) solid var(--border-color)',
                                        boxShadow: '15px 15px 0px 0px #000',
                                        backgroundColor: 'var(--card-bg)',
                                        cursor: 'none'
                                    }}
                                />
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    style={{
                                        background: 'var(--accent-yellow)',
                                        color: 'var(--text-color)',
                                        border: 'var(--border-width) solid var(--border-color)',
                                        boxShadow: '5px 5px 0px 0px #000',
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '30px',
                                        marginTop: '1.5rem',
                                        fontSize: '1.3rem',
                                        fontWeight: 600,
                                        fontFamily: 'var(--font-heading)',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    12th Grade (30.10.23)
                                </motion.p>
                            </motion.div>
                        )}
                        {preview === 'talk' && (
                            <motion.div
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto' }}
                                onMouseLeave={() => setPreview(null)}
                            >
                                <motion.video
                                    layoutId="talk-video"
                                    src="/assets/videos/TalkonautsSpeech.mp4"
                                    autoPlay loop muted playsInline
                                    style={{
                                        width: '80vw',
                                        maxHeight: '80vh',
                                        objectFit: 'cover',
                                        borderRadius: '20px',
                                        border: 'var(--border-width) solid var(--border-color)',
                                        boxShadow: '15px 15px 0px 0px #000',
                                        backgroundColor: 'var(--card-bg)',
                                        cursor: 'none'
                                    }}
                                />
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    style={{
                                        background: 'var(--accent-yellow)',
                                        color: 'var(--text-color)',
                                        border: 'var(--border-width) solid var(--border-color)',
                                        boxShadow: '5px 5px 0px 0px #000',
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '30px',
                                        marginTop: '1.5rem',
                                        fontSize: '1.3rem',
                                        fontWeight: 600,
                                        fontFamily: 'var(--font-heading)',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    Fourth Semester (30.01.26)
                                </motion.p>
                            </motion.div>
                        )}
                        {preview === 'toast' && (
                            <motion.div
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'auto' }}
                                onMouseLeave={() => setPreview(null)}
                            >
                                <motion.video
                                    layoutId="toast-video"
                                    src="/assets/videos/Toastmasters.mp4"
                                    autoPlay loop muted playsInline
                                    style={{
                                        width: '80vw',
                                        maxHeight: '80vh',
                                        objectFit: 'cover',
                                        borderRadius: '20px',
                                        border: 'var(--border-width) solid var(--border-color)',
                                        boxShadow: '15px 15px 0px 0px #000',
                                        backgroundColor: 'var(--card-bg)',
                                        cursor: 'none'
                                    }}
                                />
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    style={{
                                        background: 'var(--accent-yellow)',
                                        color: 'var(--text-color)',
                                        border: 'var(--border-width) solid var(--border-color)',
                                        boxShadow: '5px 5px 0px 0px #000',
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '30px',
                                        marginTop: '1.5rem',
                                        fontSize: '1.3rem',
                                        fontWeight: 600,
                                        fontFamily: 'var(--font-heading)',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    Video Coming Soon
                                </motion.p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Extracurricular;
