
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

    if (menuItemsRef.current) {
      const menuItems = menuItemsRef.current.children;
      gsap.fromTo(menuItems,
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
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

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            ref={logoRef}
            onMouseEnter={() => handleLogoHover(1.05)}
            onMouseLeave={() => handleLogoHover(1)}
            className="font-bold text-xl gradient-text font-mono cursor-pointer"
          >
            &lt;Siftain/&gt;
          </div>

          <div ref={menuItemsRef} className="hidden md:flex items-center space-x-8">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onMouseEnter={(e) => handleMenuItemHover(e.currentTarget, 1.1)}
                onMouseLeave={(e) => handleMenuItemHover(e.currentTarget, 1)}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          <button className="md:hidden text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
