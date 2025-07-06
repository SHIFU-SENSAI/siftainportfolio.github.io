import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -100 }, { y: 0, duration: 0.6, ease: 'power2.out' });
  }, []);

  const handleNavHover = (hovering: boolean) => {
    setIsHovered(hovering);
    if (navContainerRef.current) {
      if (hovering) {
        gsap.to(navContainerRef.current, {
          width: '400px',
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(navContainerRef.current, {
          width: '270px',
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            if (navContainerRef.current) {
              navContainerRef.current.style.width = '';
            }
          }
        });
      }
    }
    if (menuItemsRef.current) {
      const menuItems = menuItemsRef.current.children;
      gsap.to(menuItems, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: hovering ? 0.05 : 0,
        ease: 'power2.out',
      });
    }
  };

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { name: 'Home', id: 'hero', icon: '🏠' },
    { name: 'Skills', id: 'skills', icon: '⚡' },
    { name: 'Projects', id: 'projects', icon: '💼' },
    { name: 'Journey', id: 'journey', icon: '🚀' },
    { name: 'Contact', id: 'contact', icon: '📧' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${isScrolled ? 'scale-95' : 'scale-100'}`}
    >
      <div
        ref={navContainerRef}
        onMouseEnter={() => handleNavHover(true)}
        onMouseLeave={() => handleNavHover(false)}
        className="w-[270px] h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:shadow-blue-500/25 hover:border-blue-400/30"
      >
        <div ref={menuItemsRef} className="flex items-center justify-center space-x-4 w-full">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group flex flex-col items-center">
              <button
                onClick={() => handleSmoothScroll(item.id)}
                className="w-9 h-9 flex items-center justify-center text-blue-200 hover:text-blue-400 transition-all duration-300 rounded-full hover:bg-blue-400/20 group-hover:scale-110 text-xl"
                aria-label={item.name}
              >
                <span>{item.icon}</span>
              </button>
              {/* Tooltip label on hover and navbar hover */}
              <div
                className={`absolute top-11 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-800/90 backdrop-blur-sm border border-blue-400/20 rounded text-xs text-blue-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                  isHovered ? 'translate-y-0' : 'translate-y-2'
                }`}
                style={{ minWidth: '60px' }}
              >
                {item.name}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-2 h-2 bg-slate-800/90 border-l border-t border-blue-400/20 rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
