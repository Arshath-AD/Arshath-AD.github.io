import React, { useState, useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';

const sections = [
    { id: 'top', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'extracurricular', label: 'Extra' },
    { id: 'contact', label: 'Contact' }
];

const MobileSidebar = () => {
    const lenis = useLenis();
    const [activeSection, setActiveSection] = useState('top');
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);

    console.log("MobileSidebar Rendered. isMobile:", isMobile, "innerWidth:", window.innerWidth);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (!isMobile) return;

        const handleScroll = () => {
            let current = 'top';
            // Need to check which section is currently at the top of the viewport
            // We use a small offset so it triggers slightly before hitting the exact top
            const offset = 150;
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const sec = sections[i];
                if (sec.id === 'top') {
                    if (window.scrollY < 200) current = 'top';
                    continue;
                }
                
                const element = document.getElementById(sec.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= offset) {
                        current = sec.id;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    if (!isMobile) return null;

    const handleLineClick = (id) => {
        if (id === 'top') {
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            if (lenis) lenis.scrollTo(`#${id}`);
            else {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div 
            className="m-sidebar"
            aria-label="Section navigation"
        >
            {sections.map((sec) => (
                <div
                    key={sec.id}
                    onClick={() => handleLineClick(sec.id)}
                    className={`m-sidebar-line ${activeSection === sec.id ? 'active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Scroll to ${sec.label}`}
                />
            ))}
        </div>
    );
};

export default MobileSidebar;
