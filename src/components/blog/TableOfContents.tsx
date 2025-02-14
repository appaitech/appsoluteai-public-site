import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('h2, h3').forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {/* ... TOC content ... */}
    </nav>
  );
} 