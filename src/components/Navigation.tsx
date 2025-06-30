
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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
    // Mobile menu animations
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
        
        const menuItems = mobileMenuRef.current.querySelectorAll('a');
        gsap.fromTo(menuItems,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.3,
            stagger: 0.1,
            delay: 0.1,
            ease: "power2.out"
          }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.in"
        });
      }
    }
  }, [isMobileMenuOpen]);

  const handleLogoHover = (scale: number) => {
    gsap.to(logoRef.current, { scale, duration: 0.2, ease: "power2.out" });
  };

  const handleMenuItemHover = (item: HTMLElement, scale: number) => {
    gsap.to(item, { scale, duration: 0.2, ease: "power2.out" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

          {/* Desktop Menu - Hidden */}
          <div ref={menuItemsRef} className="hidden lg:flex items-center space-x-8">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={(e) => handleMenuItemHover(e.currentTarget, 1.1)}
                onMouseLeave={(e) => handleMenuItemHover(e.currentTarget, 1)}
                className="text-blue-100 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="mt-4 py-4 bg-slate-900/95 backdrop-blur-md rounded-lg border border-blue-400/20"
          >
            <div className="flex flex-col space-y-4 px-4">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-100 hover:text-blue-400 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-blue-800/20"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
