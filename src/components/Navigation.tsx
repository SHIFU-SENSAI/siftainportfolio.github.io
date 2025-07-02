
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial animations
    gsap.fromTo(navRef.current, 
      { y: -100 }, 
      { y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    // Menu items animation on load
    if (menuItemsRef.current) {
      const menuItems = menuItemsRef.current.children;
      gsap.fromTo(menuItems,
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out"
        }
      );
    }
  }, []);

  const handleLogoHover = (scale: number) => {
    gsap.to(logoRef.current, { scale, duration: 0.2, ease: "power2.out" });
  };

  const handleMenuItemHover = (item: HTMLElement, scale: number) => {
    gsap.to(item, { scale, duration: 0.2, ease: "power2.out" });
  };

  const handleSmoothScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-md border-b border-blue-400/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            ref={logoRef}
            onMouseEnter={() => handleLogoHover(1.05)}
            onMouseLeave={() => handleLogoHover(1)}
            className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono cursor-pointer"
          >
            &lt;Siftain/&gt;
          </div>

          {/* Desktop Menu */}
          <div ref={menuItemsRef} className="flex items-center space-x-8">
            {[
              { name: 'Skills', id: 'skills' },
              { name: 'Projects', id: 'projects' },
              { name: 'Journey', id: 'journey' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => handleSmoothScroll(item.id)}
                onMouseEnter={(e) => handleMenuItemHover(e.currentTarget, 1.1)}
                onMouseLeave={(e) => handleMenuItemHover(e.currentTarget, 1)}
                className="text-blue-100 hover:text-blue-400 transition-colors duration-300 font-medium cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
