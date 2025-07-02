import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const TextReveal = ({ children, className = '', delay = 0 }: TextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const text = element.textContent || '';
    
    // Split text into spans for each character
    element.innerHTML = text
      .split('')
      .map(char => char === ' ' ? '<span>&nbsp;</span>' : `<span>${char}</span>`)
      .join('');

    const chars = element.querySelectorAll('span');

    gsap.set(chars, { 
      opacity: 0, 
      y: 50,
      rotationX: -90
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.02,
      delay,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }, [delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default TextReveal;