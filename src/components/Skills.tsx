
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skills = [
    { name: 'C/C++', level: 90, color: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-yellow-500' },
    { name: 'Java', level: 80, color: 'from-red-500 to-red-600' },
    { name: 'C#', level: 75, color: 'from-purple-500 to-purple-600' },
    { name: 'Assembly x86', level: 70, color: 'from-green-500 to-green-600' },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Skills grid animation
    if (skillsGridRef.current) {
      const skillCards = skillsGridRef.current.children;
      gsap.fromTo(skillCards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate progress bars
      Array.from(skillCards).forEach((card, index) => {
        const progressBar = card.querySelector('.progress-bar');
        if (progressBar) {
          gsap.fromTo(progressBar,
            { width: 0 },
            {
              width: `${skills[index].level}%`,
              duration: 1,
              delay: index * 0.1 + 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }
  }, [skills]);

  const handleCardHover = (card: HTMLElement, scale: number) => {
    gsap.to(card, { scale, duration: 0.2, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-6">
      <div className="container mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-16"
        >
          <TextReveal className="text-4xl font-bold gradient-text mb-4">Technical Skills</TextReveal>
          <TextReveal className="text-muted-foreground text-lg" delay={0.2}>
            Languages and technologies I work with
          </TextReveal>
        </div>

        <div ref={skillsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, 1.05)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, 1)}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg font-mono">{skill.name}</h3>
                <span className="text-primary font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`progress-bar h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
