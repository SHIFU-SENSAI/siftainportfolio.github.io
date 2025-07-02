import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const journeyItems = [
    {
      year: "2022",
      title: "Started CS at BIT Mesra",
      description: "Began my Computer Science journey at Birla Institute of Technology, Mesra. First exposure to programming fundamentals and data structures.",
      type: "academic"
    },
    {
      year: "2022",
      title: "First Line of Code",
      description: "Wrote my first 'Hello World' program in C++. The beginning of countless hours of debugging and problem-solving.",
      type: "coding"
    },
    {
      year: "2023",
      title: "Data Structures & Algorithms",
      description: "Dove deep into DSA concepts. Spent months understanding trees, graphs, and dynamic programming. Solved over 200 coding problems.",
      type: "academic"
    },
    {
      year: "2023",
      title: "System Programming",
      description: "Discovered my passion for low-level programming. Started learning Assembly x86 and exploring computer architecture.",
      type: "coding"
    },
    {
      year: "2024",
      title: "Web Development",
      description: "Expanded to full-stack development. Built multiple projects using modern frameworks and learned about software engineering practices.",
      type: "coding"
    },
    {
      year: "2024",
      title: "Currently Learning",
      description: "Focusing on system design, advanced algorithms, and contributing to open-source projects. Preparing for software engineering roles.",
      type: "academic"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const snakeLineRef = useRef<HTMLDivElement>(null);

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

    // Snake line animation
    if (snakeLineRef.current && timelineRef.current) {
      const totalHeight = timelineRef.current.scrollHeight;
      
      gsap.fromTo(snakeLineRef.current,
        { height: 0 },
        {
          height: totalHeight,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Timeline items animation
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.children;
      gsap.fromTo(timelineItems,
        { opacity: 0, x: (index) => index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleItemHover = (item: HTMLElement, scale: number, y: number) => {
    gsap.to(item, { scale, y, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} id="journey" className="py-20 px-6">
      <div className="container mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">My Journey</h2>
          <p className="text-muted-foreground text-lg">
            From first line of code to where I am today
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Snake Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-accent to-primary opacity-30">
            <div
              ref={snakeLineRef}
              className="w-full bg-gradient-to-b from-primary to-accent rounded-full"
              style={{ height: 0 }}
            />
          </div>

          <div ref={timelineRef} className="space-y-12">
            {journeyItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  onMouseEnter={(e) => handleItemHover(e.currentTarget, 1.05, -5)}
                  onMouseLeave={(e) => handleItemHover(e.currentTarget, 1, 0)}
                  className={`relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                    index % 2 === 0 ? 'mr-8' : 'ml-8'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute top-6 w-4 h-4 bg-primary rounded-full border-4 border-background ${
                      index % 2 === 0 ? '-right-10' : '-left-10'
                    }`}
                  />
                  
                  {/* Year badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                    item.type === 'academic' 
                      ? 'bg-accent/20 text-accent' 
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {item.year}
                  </div>
                  
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Type indicator */}
                  <div className={`mt-3 text-xs font-semibold ${
                    item.type === 'academic' ? 'text-accent' : 'text-primary'
                  }`}>
                    {item.type === 'academic' ? '📚 Academic' : '💻 Coding'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;