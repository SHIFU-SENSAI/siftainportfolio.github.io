import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const themes = [
  {
    name: 'Blue',
    colors: {
      primary: '200 100% 60%',
      accent: '200 100% 60%',
      background: '222 84% 4.9%',
      foreground: '210 40% 98%',
    }
  },
  {
    name: 'Black',
    colors: {
      primary: '0 0% 20%',
      accent: '0 0% 40%',
      background: '0 0% 0%',
      foreground: '0 0% 100%',
    }
  }
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const theme = themes[currentTheme];
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [currentTheme]);

  const toggleSwitcher = () => {
    setIsOpen(!isOpen);
  };

  const selectTheme = (index: number) => {
    setCurrentTheme(index);
    setIsOpen(false);
    
    // Add a pulse effect when theme changes
    gsap.fromTo('.theme-pulse', 
      { scale: 1 },
      { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" }
    );
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={toggleSwitcher}
          className="theme-pulse w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all duration-300 hover:scale-110"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent"></div>
        </button>
        
        {isOpen && (
          <div className="absolute top-14 right-0 bg-card/80 backdrop-blur-md border border-border rounded-lg p-3 min-w-[120px]">
            <div className="space-y-2">
              {themes.map((theme, index) => (
                <button
                  key={theme.name}
                  onClick={() => selectTheme(index)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 hover:bg-primary/10 ${
                    currentTheme === index ? 'bg-primary/20 text-primary' : 'text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ background: `hsl(${theme.colors.primary})` }}
                    ></div>
                    {theme.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSwitcher;