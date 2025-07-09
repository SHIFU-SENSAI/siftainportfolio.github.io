import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projects = [
    {
      title: "System Monitor",
      description: "A real-time system monitoring tool built with C++ that tracks CPU, memory, and process information.",
      details: `System Monitor is a desktop application built using C++ and Qt for Linux systems. It provides real-time monitoring of CPU usage, memory consumption, and running processes. The tool features a graphical interface for easy visualization, process management (kill/suspend), and customizable update intervals. It is designed for performance and low resource usage, making it ideal for developers and power users who want insight into their system's health.`,
      tech: ["C++", "Qt", "Linux"],
      github: "#",
      demo: "#"
    },
    {
      title: "Web Portfolio",
      description: "A responsive portfolio website showcasing my projects and skills with modern web technologies.",
      details: `This portfolio is built with React, TypeScript, and Tailwind CSS. It features smooth animations, a dark/light theme switcher, and a mobile-friendly design. The site highlights my projects, skills, and contact information, and is optimized for fast loading and SEO. It serves as a central hub for my professional presence online.`,
      tech: ["React", "TypeScript", "Tailwind"],
      github: "#",
      demo: "#"
    },
    {
      title: "Assembly Calculator",
      description: "A basic calculator implementation using x86 assembly language for educational purposes.",
      details: `Assembly Calculator is a command-line calculator written in x86 NASM assembly for Linux. It supports basic arithmetic operations (add, subtract, multiply, divide) and demonstrates low-level programming concepts such as stack manipulation, system calls, and input/output handling. The project is intended as a learning resource for those interested in assembly language programming.`,
      tech: ["Assembly", "NASM", "Linux"],
      github: "#",
      demo: "#"
    },
    {
      title: "Game Engine",
      description: "A simple 2D game engine built from scratch using C++ and OpenGL for learning graphics programming.",
      details: `This project is a lightweight 2D game engine developed in C++ with OpenGL and GLFW. It provides a basic rendering pipeline, sprite management, input handling, and a simple physics system. The engine is modular and extensible, making it a great starting point for learning about game development and graphics programming at a low level.`,
      tech: ["C++", "OpenGL", "GLFW"],
      github: "#",
      demo: "#"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);

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
          <TextReveal className="text-4xl font-bold text-foreground mb-4">Featured Projects</TextReveal>
          <TextReveal className="text-muted-foreground text-lg" delay={0.2}>
            Some of the projects I've worked on
          </TextReveal>
        </div>

        <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, 1.02)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, 1)}
              className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
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
                  <Button variant="default" size="sm" className="text-primary-foreground bg-primary hover:bg-accent hover:text-accent-foreground">
                    View Demo
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground">
                    GitHub
                  </Button>
                  <Button variant="ghost" size="sm" className="ml-auto text-xs underline" onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => { if (!open) setSelectedProject(null); }}>
        <DialogContent>
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="my-4 text-sm text-foreground whitespace-pre-line">{selectedProject.details}</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                  <Button variant="default" size="sm">View Demo</Button>
                </a>
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">GitHub</Button>
                </a>
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">Close</Button>
                </DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;