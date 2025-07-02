import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projects = [
    {
      title: "System Monitor",
      description: "A real-time system monitoring tool built with C++ that tracks CPU, memory, and process information.",
      tech: ["C++", "Qt", "Linux"],
      github: "#",
      demo: "#"
    },
    {
      title: "Web Portfolio",
      description: "A responsive portfolio website showcasing my projects and skills with modern web technologies.",
      tech: ["React", "TypeScript", "Tailwind"],
      github: "#",
      demo: "#"
    },
    {
      title: "Assembly Calculator",
      description: "A basic calculator implementation using x86 assembly language for educational purposes.",
      tech: ["Assembly", "NASM", "Linux"],
      github: "#",
      demo: "#"
    },
    {
      title: "Game Engine",
      description: "A simple 2D game engine built from scratch using C++ and OpenGL for learning graphics programming.",
      tech: ["C++", "OpenGL", "GLFW"],
      github: "#",
      demo: "#"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

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

    // Projects grid animation
    if (projectsGridRef.current) {
      const projectCards = projectsGridRef.current.children;
      gsap.fromTo(projectCards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleCardHover = (card: HTMLElement, scale: number) => {
    gsap.to(card, { scale, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">
            Some of the projects I've worked on
          </p>
        </div>

        <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, 1.02)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, 1)}
              className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="default" size="sm">
                    View Demo
                  </Button>
                  <Button variant="outline" size="sm">
                    GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;