import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <motion.section
            id="about"
            className="section about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
            <h2 className="section-title">Who Am I?</h2>
            <div className="container about-container">
                <motion.div
                    className="about-card"
                    whileTap={{ scale: 0.98, skewY: 2 }}
                >
                    <p>
                        I’m Arshath, a second-year undergraduate in Information Technology (Data Science).
                    </p>
                    <p>
                        I enjoy building software, but more than that, I like understanding how it works.
                    </p>
                    <p>
                        From web applications to system-level concepts, I’m driven by curiosity about how software works from the ground up.
                    </p>
                    <p>
                        Currently, I’m exploring compilers, terminal tools, and programming language design. The transformation of human-readable logic into machine-level execution is where software feels alive to me.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;
