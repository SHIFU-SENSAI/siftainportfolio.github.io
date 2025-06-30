
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = ['C/C++', 'C#', 'JavaScript', 'Java', 'Assembly x86'];
  
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [skills.length]);

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    // Animate main elements
    tl.fromTo(nameRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(roleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.6, ease: "power2.out" }, 
      "-=0.4"
    )
    .fromTo(descRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.6, ease: "power2.out" }, 
      "-=0.3"
    )
    .fromTo(buttonsRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 
      "-=0.2"
    );

    // Animate particles
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, index) => {
        gsap.fromTo(particle,
          { opacity: 0.2, y: 0 },
          {
            opacity: 0.5,
            y: -20,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2,
            ease: "power2.inOut"
          }
        );
      });
    }
  }, []);

  useEffect(() => {
    // Animate skill change
    if (skillRef.current) {
      gsap.fromTo(skillRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentSkill]);

  const handleButtonHover = (button: HTMLElement, scale: number) => {
    gsap.to(button, { scale, duration: 0.2, ease: "power2.out" });
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background particles effect */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          {/* Name */}
          <h1
            ref={nameRef}
            className="text-5xl md:text-7xl font-bold gradient-text mb-4"
          >
            I'm Siftain
          </h1>

          {/* Dynamic typing effect for role */}
          <div
            ref={roleRef}
            className="text-2xl md:text-3xl text-muted-foreground font-light mb-6"
          >
            <span>Student Developer specializing in </span>
            <span
              ref={skillRef}
              className="text-primary font-mono font-semibold"
            >
              {skills[currentSkill]}
            </span>
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            3rd year Computer Science student at BIT Mesra, passionate about system programming, 
            web development, and exploring the depths of computer architecture.
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <button
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 glow-effect"
            >
              View My Work
            </button>
            <button
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, 1.05)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, 1)}
              className="px-8 py-4 border border-primary/30 text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
            >
              Contact Me
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
