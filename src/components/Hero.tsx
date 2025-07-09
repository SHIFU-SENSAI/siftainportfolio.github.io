import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const programmingLanguages = ['C/C++', 'C#', 'JavaScript', 'Java', 'Assembly x86','Unity'];

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    // Animate content from left
    tl.fromTo(contentRef.current, 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    )
    // Animate skills boxes
    .fromTo(skillsRef.current?.children || [], 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 
      "-=0.4"
    )
    // Animate buttons
    .fromTo(buttonsRef.current?.children || [], 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, 
      "-=0.3"
    );
  }, []);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8 max-w-4xl">
            <div className="space-y-4">
              <TextReveal className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                H!, I'm{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Siftain
                </span>
              </TextReveal>
              <div className="text-xl text-foreground/80 leading-relaxed">
                <TextReveal delay={0.3}>
                  A passionate 3rd year Computer Science student at BIT Mesra,
                </TextReveal>
                <TextReveal delay={0.5}>
                  dedicated to exploring system programming, web development, 
                </TextReveal>
                <TextReveal delay={0.7}>
                  and the fascinating world of computer architecture.
                </TextReveal>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Technologies I work with:</h3>
              <div ref={skillsRef} className="flex flex-wrap gap-3">
                {programmingLanguages.map((lang, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-accent border border-accent-foreground rounded-lg text-accent-foreground font-mono text-sm hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg hover:shadow-primary/25"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Projects
              </MagneticButton>
              <MagneticButton 
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
