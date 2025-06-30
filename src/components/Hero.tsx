
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageCircleRef = useRef<HTMLDivElement>(null);
  const animatedShapeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const programmingLanguages = ['C/C++', 'C#', 'JavaScript', 'Java', 'Assembly x86'];

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
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-20"
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
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Siftain
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                A passionate 3rd year Computer Science student at BIT Mesra, 
                dedicated to exploring system programming, web development, 
                and the fascinating world of computer architecture.
              </p>
            </div>

            {/* Programming Languages */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-200">Technologies I work with:</h3>
              <div ref={skillsRef} className="flex flex-wrap gap-3">
                {programmingLanguages.map((lang, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-blue-800/30 border border-blue-400/30 rounded-lg text-blue-100 font-mono text-sm hover:bg-blue-600/40 hover:border-blue-300/60 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                View My Projects
              </button>
              <button className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-105">
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right side - Image Circle */}
          <div className="flex justify-start lg:justify-center">
            <div className="relative">
              {/* Animated background shape */}
              <div
                ref={animatedShapeRef}
                className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl"
                style={{
                  clipPath: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)'
                }}
              />
              
              {/* Image circle */}
              <div
                ref={imageCircleRef}
                className="relative w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 p-2 shadow-2xl"
              >
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for your image */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">S</span>
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
