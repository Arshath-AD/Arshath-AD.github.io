import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", bounce: 0.4 }
    }
};

const Projects = () => {
    return (
        <motion.section
            id="projects"
            className="section projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <h2 className="section-title">Cool Stuff I Made</h2>
            <motion.div className="container projects-grid" variants={containerVariants}>
                {/* Project 1 */}
                <motion.article
                    className="project-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: "8px 8px 0px 0px #000" }}
                    whileTap={{ scale: 0.98, skewY: 2 }}
                >
                    <div className="card-header">
                        <h3>Orewa Nova</h3>
                        <span className="badge">Django</span>
                    </div>
                    <div className="card-body">
                        <p>A full-stack anime discovery platform using Django & MongoDB. Features role-based access, custom
                            admin dashboard, and dynamic homepage.</p>
                    </div>
                    <div className="card-footer">
                        <a href="https://github.com/Arshath-AD/Anime-review-webapp-orewanova.git" target="_blank" rel="noreferrer" className="btn btn-small">View
                            Code</a>
                    </div>
                </motion.article>

                {/* Project 2 */}
                <motion.article
                    className="project-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: "8px 8px 0px 0px #000" }}
                    whileTap={{ scale: 0.98, skewY: 2 }}
                >
                    <div className="card-header">
                        <h3>AI Stock Predictor</h3>
                        <span className="badge">ML / Python</span>
                    </div>
                    <div className="card-body">
                        <p>Machine Learning web app to predict NSE stock trends using Random Forest Classifier. Achieved 85%
                            prediction accuracy.</p>
                    </div>
                    <div className="card-footer">
                        <a href="https://github.com/Arshath-AD/Stock-Sentiment-Analyzer-Flask.git"
                            target="_blank" rel="noreferrer" className="btn btn-small">View Code</a>
                    </div>
                </motion.article>

                {/* Project 3 */}
                <motion.article
                    className="project-card"
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: "8px 8px 0px 0px #000" }}
                    whileTap={{ scale: 0.98, skewY: 2 }}
                >
                    <div className="card-header">
                        <h3>Attendance Tracker</h3>
                        <span className="badge">Flask</span>
                    </div>
                    <div className="card-body">
                        <p>Flask-based web app for managing student attendance efficiently. Uses MongoDB for dynamic storage
                            of logs.</p>
                    </div>
                    <div className="card-footer">
                        <a href="https://github.com/Arshath-AD/AttendanceTracker.git" target="_blank" rel="noreferrer" className="btn btn-small">View Code</a>
                    </div>
                </motion.article>
            </motion.div>
        </motion.section>
    );
};

export default Projects;
