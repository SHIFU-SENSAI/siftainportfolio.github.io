import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactMethods = [
    {
      title: "Email",
      description: "Drop me a line anytime",
      contact: "siftain@example.com",
      action: "Send Email"
    },
    {
      title: "LinkedIn",
      description: "Let's connect professionally",
      contact: "/in/siftain",
      action: "Connect"
    },
    {
      title: "GitHub",
      description: "Check out my code",
      contact: "@siftain",
      action: "Follow"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contactGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    // Contact grid animation
    if (contactGridRef.current) {
      const contactCards = contactGridRef.current.children;
      gsap.fromTo(contactCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contactGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // CTA animation
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleCardHover = (card: HTMLElement, scale: number) => {
    gsap.to(card, { scale, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-6">
      <div className="container mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-16"
        >
          <TextReveal className="text-4xl font-bold gradient-text mb-4">Get In Touch</TextReveal>
          <TextReveal className="text-muted-foreground text-lg" delay={0.2}>
            Let's connect and discuss opportunities
          </TextReveal>
        </div>

        <div ref={contactGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {contactMethods.map((method, index) => (
            <Card
              key={method.title}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, 1.05)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, 1)}
              className="bg-card/50 backdrop-blur-sm border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer text-center"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">{method.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {method.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-primary font-mono mb-4">{method.contact}</p>
                <Button variant="outline" size="sm" className="w-full">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={ctaRef} className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to work together?
            </h3>
            <p className="text-muted-foreground mb-8">
              I'm always interested in hearing about new opportunities and exciting projects. 
              Whether you're a company looking to hire, or you're a developer looking to collaborate, 
              I'd love to hear from you.
            </p>
            <MagneticButton className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all duration-300">
              Start a Conversation
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;