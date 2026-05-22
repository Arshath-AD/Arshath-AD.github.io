import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Skill data ─────────────────────────────────────────── */
const skillGroups = [
    {
        title: 'Languages',
        accent: 'var(--primary-color)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
        ),
        skills: [
            { label: 'Python',     icon: 'devicon-python-plain colored' },
            { label: 'Java',       icon: 'devicon-java-plain colored' },
            { label: 'JavaScript', icon: 'devicon-javascript-plain colored' },
        ],
    },
    {
        title: 'Web',
        accent: 'var(--accent-yellow)',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
        ),
        skills: [
            { label: 'HTML5',  icon: 'devicon-html5-plain colored' },
            { label: 'CSS',    icon: 'devicon-css3-plain colored' },
            { label: 'React',  icon: 'devicon-react-original colored' },
            { label: 'Django', icon: 'devicon-django-plain colored' },
            { label: 'Flask',  icon: 'devicon-flask-original colored' },
        ],
    },
    {
        title: 'Tools',
        accent: '#a5f3c0',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
        ),
        skills: [
            { label: 'Git',        icon: 'devicon-git-plain colored' },
            { label: 'VS Code',    icon: 'devicon-vscode-plain colored' },
            { label: 'MongoDB',    icon: 'devicon-mongodb-plain colored' },
            { label: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
            { label: 'IntelliJ',   icon: 'devicon-intellij-plain colored' },
            { label: 'PyCharm',    icon: 'devicon-pycharm-plain colored' },
        ],
    },
];

const tagVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (i) => ({
        opacity: 1, scale: 1,
        transition: { type: 'spring', bounce: 0.5, delay: i * 0.07 }
    }),
};

/* ─── Mobile Skills ───────────────────────────────────────── */
const MobileSkills = () => (
    <section id="skills" className="section m-skills">
        <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.7 }}
        >
            My Toolkit
        </motion.h2>

        <div className="m-skills-list">
            {skillGroups.map((group, gi) => (
                <motion.div
                    key={gi}
                    className="m-skill-card"
                    style={{ '--skill-accent': group.accent }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ type: 'spring', bounce: 0.35, duration: 0.6, delay: gi * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Card header */}
                    <div className="m-skill-header">
                        <span className="m-skill-icon">{group.icon}</span>
                        <h3 className="m-skill-title">{group.title}</h3>
                    </div>

                    {/* Skill tags */}
                    <div className="m-skill-tags">
                        {group.skills.map((skill, si) => (
                            <motion.span
                                key={si}
                                className="tag m-tag"
                                custom={si}
                                variants={tagVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <i className={skill.icon} />
                                {skill.label}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
);

/* ─── Desktop Skills (untouched) ─────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
};

const DesktopSkills = () => (
    <motion.section
        id="skills"
        className="section skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
    >
        <h2 className="section-title">My Toolkit</h2>
        <motion.div className="container skills-grid" variants={containerVariants}>
            {skillGroups.map((group, gi) => (
                <motion.div 
                    key={gi} 
                    className="skill-category" 
                    variants={itemVariants} 
                    style={{ borderTop: `6px solid ${group.accent}` }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="bento-header">
                        {group.icon}
                        <h3>{group.title}</h3>
                    </div>
                    <div className="tags">
                        {group.skills.map((skill, si) => (
                            <motion.span
                                key={si}
                                className="tag"
                                custom={si}
                                variants={tagVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <i className={skill.icon} />
                                {skill.label}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </motion.section>
);

/* ─── Root ───────────────────────────────────────────────── */
const Skills = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return isMobile ? <MobileSkills /> : <DesktopSkills />;
};

export default Skills;
