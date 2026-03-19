import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const Contact = () => {
    return (
        <>
            <motion.section
                id="contact"
                className="section contact"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container">
                    <div className="contact-box">
                        <h2>Let's Connect!</h2>
                        <div className="social-links">
                            <Magnetic>
                                <motion.a href="mailto:arshathad2006@gmail.com" className="social-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>Email</motion.a>
                            </Magnetic>
                            <Magnetic>
                                <motion.a href="https://linkedin.com/in/arshath-ahamed-45b34830a" className="social-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>LinkedIn</motion.a>
                            </Magnetic>
                            <Magnetic>
                                <motion.a href="https://github.com/Arshath-AD" className="social-btn" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>GitHub</motion.a>
                            </Magnetic>
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
};

export default Contact;
