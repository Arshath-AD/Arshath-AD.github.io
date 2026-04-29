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
                        I’m Arshath, a second-year undergraduate in B.Sc IT & DS.
                        I enjoy turning ideas into real-world applications, working with technologies like Python, Java, and modern web tools to build meaningful tech solutions. <br /> <br />
                    </p>
                    <p>
                        I’m focused on continuous learning, gaining hands-on experience through projects and challenges, and improving my skills as a developer. <br /> <br />
                    </p>
                    <p>
                        Beyond academics, athletics has played a significant role in shaping my discipline, consistency, and mindset.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;
