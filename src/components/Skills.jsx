import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", bounce: 0.4 }
    }
};

const Skills = () => {
    return (
        <motion.section
            id="skills"
            className="section skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
            <h2 className="section-title">My Toolkit</h2>
            <motion.div className="container skills-grid" variants={containerVariants}>
                {/* Languages */}
                <motion.div className="skill-category" variants={itemVariants} whileTap={{ scale: 0.98, skewY: 2 }}>
                    <h3>Languages</h3>
                    <div className="tags">
                        <span className="tag"><i className="devicon-python-plain colored"></i> Python</span>
                        <span className="tag"><i className="devicon-java-plain colored"></i> Java</span>
                        <span className="tag"><i className="devicon-javascript-plain colored"></i> JavaScript</span>
                    </div>
                </motion.div>
                {/* Web */}
                <motion.div className="skill-category" variants={itemVariants} whileTap={{ scale: 0.98, skewY: 2 }}>
                    <h3>Web</h3>
                    <div className="tags">
                        <span className="tag"><i className="devicon-html5-plain colored"></i> HTML5</span>
                        <span className="tag"><i className="devicon-css3-plain colored"></i> CSS</span>
                        <span className="tag"><i className="devicon-react-original colored"></i> React</span>
                        <span className="tag"><i className="devicon-django-plain colored"></i> Django</span>
                        <span className="tag"><i className="devicon-flask-original colored"></i> Flask</span>
                    </div>
                </motion.div>
                {/* Tools */}
                <motion.div className="skill-category" variants={itemVariants} whileTap={{ scale: 0.98, skewY: 2 }}>
                    <h3>Tools</h3>
                    <div className="tags">
                        <span className="tag"><i className="devicon-git-plain colored"></i> Git</span>
                        <span className="tag"><i className="devicon-vscode-plain colored"></i> VS Code</span>
                        <span className="tag"><i className="devicon-mongodb-plain colored"></i> MongoDB</span>
                        <span className="tag"><i className="devicon-postgresql-plain colored"></i> PostgreSQL</span>
                        <span className="tag"><i className="devicon-intellij-plain colored"></i> IntelliJ</span>
                        <span className="tag"><i className="devicon-pycharm-plain colored"></i> PyCharm</span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Skills;
