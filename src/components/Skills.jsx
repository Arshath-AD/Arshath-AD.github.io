import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Skill data ─────────────────────────────────────────── */
const skillGroups = [
    {
        title: 'Core Languages',
        theme: 'notes',
        accent: 'var(--primary-color)',
        skills: [
            { label: 'Java',       icon: 'devicon-java-plain colored' },
            { label: 'Python',     icon: 'devicon-python-plain colored' },
            { label: 'JavaScript', icon: 'devicon-javascript-plain colored' },
            { label: 'PHP',        icon: 'devicon-php-plain colored' },
        ],
    },
    {
        title: 'Web Application',
        theme: 'clipboard',
        accent: 'var(--accent-purple)',
        folders: [
            {
                title: 'Frontend',
                skills: [
                    { label: 'HTML5', icon: 'devicon-html5-plain colored' },
                    { label: 'CSS3', icon: 'devicon-css3-plain colored' },
                    { label: 'React', icon: 'devicon-react-original colored' },
                ]
            },
            {
                title: 'Backend',
                skills: [
                    { label: 'Django', icon: 'devicon-django-plain colored' },
                    { label: 'Flask', icon: 'devicon-flask-original colored' },
                    { label: 'FastAPI', icon: 'devicon-fastapi-plain colored' },
                ]
            }
        ]
    },
    {
        title: 'Databases',
        theme: 'drives',
        accent: '#ff3366',
        skills: [
            { label: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
            { label: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        ],
    },
    {
        title: 'Developer Tools',
        theme: 'manual',
        accent: 'var(--accent-green)',
        skills: [
            { label: 'Git',        icon: 'devicon-git-plain colored' },
            { label: 'VS Code',    icon: 'devicon-vscode-plain colored' },
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

/* ─── Render Theme Helper ────────────────────────────────── */
const renderThemeContent = (group) => {
    switch(group.theme) {
        case 'notes':
            return (
                <div className="desk-notes-container">
                    <h3 className="desk-section-title">{group.title}</h3>
                    {group.skills.map((skill, si) => (
                        <motion.div
                            key={si}
                            className="desk-note"
                            custom={si}
                            variants={tagVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <i className={`${skill.icon} note-icon`} />
                            <span className="note-label">{skill.label}</span>
                        </motion.div>
                    ))}
                </div>
            );
        case 'clipboard':
            return (
                <div className="desk-clipboard">
                    <div className="clipboard-board"></div>
                    <div className="clipboard-clip"></div>
                    <div className="clipboard-paper">
                        <details className="ide-folder" open>
                            <summary className="ide-folder-header">
                                <span className="ide-arrow">▶</span>
                                <span className="ide-folder-icon" style={{color: 'var(--text-color)'}}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
                                </span>
                                <h3>{group.title}</h3>
                            </summary>
                            <div className="ide-folder-content">
                                {group.folders.map((folder, fi) => (
                                    <details className="ide-subfolder" open key={fi}>
                                        <summary className="ide-folder-header sub-header">
                                            <span className="ide-arrow">▶</span>
                                            <h3 className="sub-header-title">{folder.title}</h3>
                                        </summary>
                                        <div className="ide-file-list">
                                            <div className="ide-guide-line"></div>
                                            {folder.skills.map((skill, si) => (
                                                <motion.div key={si} className="ide-file" custom={si} variants={tagVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                                    <div className="ide-file-branch"></div>
                                                    <i className={`${skill.icon} ide-file-icon`} />
                                                    <span className="ide-file-name">{skill.label}</span>
                                                    <span className="ide-file-status"></span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </details>
                    </div>
                </div>
            );
        case 'drives':
            return (
                <div className="desk-drives-container">
                    <h3 className="desk-section-title">{group.title}</h3>
                    <div className="drives-grid">
                        {group.skills.map((skill, si) => (
                            <motion.div
                                key={si}
                                className="desk-drive"
                                custom={si}
                                variants={tagVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <div className="drive-plate"></div>
                                <i className={`${skill.icon} drive-icon`} />
                                <span className="drive-label">{skill.label}</span>
                                <div className="drive-led"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            );
        case 'manual':
            return (
                <div className="desk-manual">
                    <div className="manual-spiral"></div>
                    <h3 className="manual-title">{group.title}</h3>
                    <div className="manual-grid">
                        {group.skills.map((skill, si) => (
                            <motion.div
                                key={si}
                                className="manual-tool"
                                custom={si}
                                variants={tagVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <i className={skill.icon} />
                                <span>{skill.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            );
        default:
            return null;
    }
};

/* ─── Mobile Skills ───────────────────────────────────────── */
const MobileSkills = () => (
    <section id="skills" className="section m-skills" aria-label="My toolkit">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', bounce: 0.4 }}>
            My Toolkit
        </motion.h2>
        <div className="m-skills-list">
            {skillGroups.map((group, gi) => (
                <motion.div
                    key={gi}
                    className={`m-skill-wrapper theme-${group.theme}`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ type: 'spring', bounce: 0.35, delay: gi * 0.1 }}
                >
                    {renderThemeContent(group)}
                </motion.div>
            ))}
        </div>
    </section>
);

/* ─── Desktop Skills ─────────────────────────────────────── */
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
};

const DesktopSkills = () => (
    <motion.section id="skills" className="section skills" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        <h2 className="section-title">My Toolkit</h2>
        <motion.div className="container skills-grid" variants={containerVariants}>
            {skillGroups.map((group, gi) => (
                <motion.div 
                    key={gi} 
                    className={`desk-item-wrapper theme-${group.theme}`} 
                    variants={itemVariants} 
                >
                    {renderThemeContent(group)}
                </motion.div>
            ))}
        </motion.div>
    </motion.section>
);

/* ─── Root ───────────────────────────────────────────────── */
const Skills = () => {
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
    return isMobile ? <MobileSkills /> : <DesktopSkills />;
};

export default Skills;
