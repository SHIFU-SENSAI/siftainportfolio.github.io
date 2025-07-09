import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TextReveal from './TextReveal';
import MagneticButton from './MagneticButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactMethods = [
    {
      title: "Email",
      description: "Drop me a line anytime",
      contact: "your@email.com",
      action: "Send Email"
    },
    {
      title: "LinkedIn",
      description: "Let's connect professionally",
      contact: "Siftain",
      action: "Connect"
    },
    {
      title: "GitHub",
      description: "Check out my code",
      contact: "Siftain",
      action: "Follow"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contactGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://formspree.io/f/mdkzrbpo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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
          <TextReveal className="text-4xl font-bold text-foreground mb-4">Get In Touch</TextReveal>
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
                {method.title === "Email" ? (
                  <a href={`mailto:${method.contact}`} className="w-full block">
                    <Button variant="outline" size="sm" className="w-full border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground">
                      {method.action}
                    </Button>
                  </a>
                ) : (
                  <a
                    href={
                      method.title === "LinkedIn"
                        ? "https://www.linkedin.com/in/siftainahmad/"
                        : method.title === "GitHub"
                        ? `https://github.com/SHIFU-SENSAI`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button variant="outline" size="sm" className="w-full border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground">
                      {method.action}
                    </Button>
                  </a>
                )}
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
            <MagneticButton className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all duration-300" onClick={() => setOpen(true)}>
              Start a Conversation
            </MagneticButton>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Me</DialogTitle>
                  <DialogDescription>Send me a message directly to my email.</DialogDescription>
                </DialogHeader>
                {status === 'success' ? (
                  <div className="text-green-600 font-semibold py-8 text-center">Thank you! Your message has been sent.</div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 rounded bg-background border border-border focus:outline-none"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-2 rounded bg-background border border-border focus:outline-none"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      className="w-full px-4 py-2 rounded bg-background border border-border focus:outline-none"
                      rows={4}
                      value={form.message}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="flex gap-2 justify-end">
                      <DialogClose asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" variant="default" disabled={status==='loading'}>
                        {status==='loading' ? 'Sending...' : 'Send'}
                      </Button>
                    </div>
                    {status === 'error' && <div className="text-red-600 text-sm mt-2">Something went wrong. Please try again.</div>}
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;