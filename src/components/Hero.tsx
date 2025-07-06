import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageCircleRef = useRef<HTMLDivElement>(null);
  const animatedShapeRef = useRef<HTMLDivElement>(null);
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
    // Animate image circle from right
    .fromTo(imageCircleRef.current, 
      { opacity: 0, x: 50, scale: 0.8 }, 
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power2.out" }, 
      "-=0.6"
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

    // Animated shape behind circle
    if (animatedShapeRef.current) {
      gsap.to(animatedShapeRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      gsap.to(animatedShapeRef.current, {
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
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
        <div className="grid lg:grid-cols-[1fr,0.6fr] gap-8 items-center">
          {/* Left side - Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <TextReveal className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                H!, I'm{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Siftain
                </span>
              </TextReveal>
              <TextReveal className="text-xl text-foreground/80 leading-relaxed max-w-[70%]" delay={0.3}>
                A passionate 3rd year Computer Science student at BIT Mesra,
                dedicated to exploring system programming, web development, 
                and the fascinating world of computer architecture.
              </TextReveal>
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

          {/* Right side - Image Circle */}
          <div className="flex justify-start lg:justify-center">
            <div className="relative">
              {/* Animated background shape */}
              <div
                ref={animatedShapeRef}
                className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
                style={{
                  clipPath: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)'
                }}
              />
              
              {/* Image circle */}
              <div
                ref={imageCircleRef}
                className="relative w-80 h-80 rounded-full bg-gradient-to-br from-primary to-accent p-2 shadow-2xl"
              >
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  {/* Placeholder for your image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-foreground">S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
