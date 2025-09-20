import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Toaster } from "@/components/ui/sonner";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import {
    Code,
    Database,
    ExternalLink, Github,
    Linkedin,
    Loader2,
    Mail,
    Menu,
    Moon,
    Phone,
    Server,
    Sun,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import './App.css';
import WebProjectsSection from './components/WebProjectsSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import {IoLogoVue} from "react-icons/io5";

function App() {
    // Initialize darkMode based on system preference or stored preference
    const [darkMode, setDarkMode] = useState(() => {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode !== null) {
                return savedMode === 'true';
            }
            // If no saved preference, use system preference
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        // Default to light mode for server-side rendering
        return false;
    });

    const [webMenuOpen, setMobileMenuOpen] = useState(false)

    // Contact form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    })
    const [sending, setSending] = useState(false)

    const { toast } = useToast()

    useEffect(() => {
        // Apply dark mode class to document
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Save preference to localStorage
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode])

    const toggleDarkMode = () => setDarkMode(p => !p)
    const toggleMobileMenu = () => setMobileMenuOpen(p => !p)

    const scrollToSection = (sectionId) => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
    }

    // Animations
    const fadeInUp = { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }
    const fadeInLeft = { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 } }
    const fadeInRight = { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 } }
    const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } }
    const scaleOnHover = { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }

    // Form helpers
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const validate = () => {
        if (!formData.name.trim() || !formData.email.trim() || !formData.phoneNumber.trim() || !formData.message.trim()) {
            toast.error('Missing fields', {
                description: 'Please fill in name, email, phone number, and message.',
                className: 'bg-red-500 text-white'

            });

            return false
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        if (!emailOk) {
            toast.error('Invalid email', {
                description: 'Please enter a valid email address.',
                className: 'bg-red-500 text-white'
            })
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setSending(true)

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                message: formData.message,
                title: 'Portfolio Contact',
                time: new Date().toLocaleString(),
                reply_to: formData.email
            }

            await emailjs.send(
                'service_0d8yjaf',        // Service ID
                'template_62zp8t9',       // Template ID
                templateParams,
                { publicKey: 'fKrTY625KhvawhNlE' } // Public Key
            )

            toast.success('Message sent!', {
                description: 'Thanks for reaching out. I will get back to you shortly.',
                className: 'bg-green-500 text-white',
            });
            setFormData({ name: '', email: '', phoneNumber: '', message: '' })
        } catch (err) {
            toast.error(

                'Failed to send', {
                    description: 'Something went wrong while sending your message. Please try again later.',
                    className: 'bg-red-500 text-white',
                });

            // console.error(err)
        } finally {
            setSending(false)
        }
    }

    // WhatsApp helper
    const waNumber = '201060838210'
    const waText = encodeURIComponent('Hi Eslam! I came from your portfolio.')
    const waLink = `https://wa.me/${waNumber}?text=${waText}`

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }}>
                            <h1 className="text-xl font-bold text-primary">Eslam Abdelbasset</h1>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {['home', 'about', 'projects', 'skills', 'contact'].map((section, index) => (
                                    <motion.button
                                        key={section}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => scrollToSection(section)}
                                        className="hover:text-primary transition-colors capitalize"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {section}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                            </motion.div>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <motion.div whileTap={{ scale: 0.95 }}>
                                    <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="rounded-full">
                                        {webMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {webMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
                            {['home', 'about', 'projects', 'skills', 'contact'].map((section, index) => (
                                <motion.button
                                    key={section}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(section)}
                                    className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors capitalize w-full text-left"
                                >
                                    {section}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.nav>

            {/* Hero Section */}
            <section id="home" className="pt-0 min-h-screen flex items-center justify-center hero-background">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerContainer}>
                        <motion.div className="space-y-4" variants={fadeInUp}>
                            <motion.h1
                                className="text-4xl md:text-6xl font-bold tracking-tight"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Eslam Abdelbasset
                            </motion.h1>
                            <motion.h4
                                className="text-4xl md:text-2xl font-semi-bold tracking"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Full Stack Developer | Vue & PHP Laravel
                            </motion.h4>

                            <motion.p className="text-xl md:text-2xl  max-w-3xl mx-auto" variants={fadeInUp}>
                                I'm a Full Stack Developer with strong expertise in back-end engineering. I specialize in building robust,
                                scalable architectures, developing clean APIs, and integrating complex systems to power modern, responsive web applications.
                                My focus is on delivering efficient, secure, and maintainable server-side solutions that support seamless front-end experiences.
                            </motion.p>
                        </motion.div>
                        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeInUp}>
                            <motion.div {...scaleOnHover}>
                                <Button
                                    size="lg"
                                    onClick={() => scrollToSection('projects')}
                                    className="text-lg px-8 py-3 btn-hover"
                                >
                                    View My Work
                                </Button>
                            </motion.div>

                            <motion.div {...scaleOnHover}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => scrollToSection('contact')}
                                    className="text-lg px-8 py-4 btn-hover"
                                >
                                    Get In Touch
                                </Button>
                            </motion.div>

                            <motion.div {...scaleOnHover}>
                                <a
                                    href="dist/assets/cv/islamAbdelbasset-Resume.pdf"
                                    download
                                    className="inline-flex items-center justify-center text-lg px-8 py-2 rounded-lg bg-gray-600 text-white hover:bg-primary/90 transition-colors"
                                >
                                    Download CV <i className="bx bxs-download"></i>
                                </a>
                            </motion.div>
                        </motion.div>
                        <motion.div className="flex justify-center space-x-6 pt-8" variants={fadeInUp}>
                            <motion.a
                                href="https://github.com/eslamabdelbasset1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Github"
                            >
                                <Github className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/eslamabdelbasset"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href="mailto:eslamabdelbasset1@gmail.com"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Email"
                            >
                                <Mail className="h-6 w-6" />
                            </motion.a>
                            {/* WhatsApp icon in hero */}
                            <motion.a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                whileHover={{ scale: 1.2, rotate: 0 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="WhatsApp"
                                title="WhatsApp"
                            >
                                <FaWhatsapp className="h-5 w-5" />
                            </motion.a>


                        </motion.div>
                    </motion.div>
                </div>
            </section>


        {/* About Section */}
        <section id="about" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div className="text-center mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        I am a dedicated full-stack developer specializing in building robust web applications using Laravel/PHP and Vue.js.
                        I'm passionate about creating seamless, end-to-end solutions that deliver exceptional user experiences while maintaining clean, scalable code architecture.
                        <br/>
                        With expertise in both backend development with Laravel and frontend development with Vue.js, I bridge the gap between server-side logic and client-side interactivity.
                        <br/>
                        I'm also a lifelong learner—constantly exploring new challenges, tools, and opportunities to grow both personally and professionally.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div className="space-y-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInLeft}>
                        <p className="text-lg leading-relaxed">
                            With several years of experience in full-stack development, I specialize in creating scalable web applications
                            using Laravel for robust backend APIs and Vue.js for dynamic, responsive frontend interfaces.
                        </p>
                        <p className="text-lg leading-relaxed">
                            I'm passionate about clean code architecture, database optimization, RESTful API design, and creating intuitive user experiences.
                        </p>
                        <motion.div className="flex flex-wrap gap-2" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                            {['🎯 Problem Solver', '🚀 Performance Focused', '💻 Full-Stack Expertise', '🎨 UI/UX Enthusiast'].map((badge) => (
                                <motion.div key={badge} variants={fadeInUp} whileHover={{ scale: 1.05 }}>
                                    <Badge variant="secondary" className="text-sm">{badge}</Badge>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div className="grid grid-cols-2 gap-6" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
                        {[
                            { icon: Code, title: "Backend Development", desc: "Laravel/PHP, RESTful APIs, and server architecture" },
                            { icon: Database, title: "Database Management", desc: "MySQL, Eloquent ORM, and query optimization" },
                            { icon: IoLogoVue, title: "Frontend Development", desc: "Vue.js, responsive design, and state management" },
                            { icon: Server, title: "Deployment", desc: "Server configuration, CI/CD, and cloud hosting" }
                        ].map((item) => (
                            <motion.div key={item.title} variants={fadeInUp} whileHover={{ scale: 1.05, rotateY: 5 }} transition={{ duration: 0.3 }} className="card-hover">
                                <Card>
                                    <CardHeader className="text-center">
                                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                                            <item.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                                        </motion.div>
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-center text-muted-foreground">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <WebProjectsSection />

       {/* Contact Section */}
       <section id="contact" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                If you want to contact with me about project or any question,
                Please enter a valid Email in form, So that I can reply to the
                email. <br />Thanks 🤩
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div className="space-y-8" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInLeft}>
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  I'm always interested in new opportunities and exciting projects.
                </p>
              </div>

              <motion.div className="space-y-4" variants={staggerContainer}>
                {[
                  { icon: Mail, text: "eslamabdelbasset1@gmail.com", href: "mailto:eslamabdelbasset1@gmail.com" },
                  { icon: Phone, text: "+201060838210", href: "tel:+201060838210" },
                  { icon: FaWhatsapp, text: "WhatsApp", href: waLink },
                  { icon: Linkedin, text: "LinkedIn", href: "https://www.linkedin.com/in/eslamabdelbasset" }
                ].map((contact) => (
                  <motion.div key={contact.text} className="flex items-center space-x-4" variants={fadeInUp} whileHover={{ scale: 1.05, x: 10 }}>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                      <contact.icon className="h-5 w-5 text-primary" />
                    </motion.div>
                    <a href={contact.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {contact.text}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInRight} className="card-hover">
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Form (EmailJS) */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium" htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={sending}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        placeholder="Your name"
                      />
                    </motion.div>

                    <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium" htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={sending}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>

                    <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium" htmlFor="phoneNumber">Phone Number</label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        disabled={sending}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                        placeholder="+201060838210"
                      />
                    </motion.div>

                    <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                      <label className="text-sm font-medium" htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={sending}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-all"
                        placeholder="Tell me about your project..."
                      />
                    </motion.div>

                    <motion.div {...scaleOnHover}>
                      <Button className="w-full btn-hover" type="submit" disabled={sending}>
                        {sending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

       {/* Footer */}
       <motion.footer className="bg-background border-t border-border py-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h3 className="text-xl font-bold mb-4" whileHover={{ scale: 1.05 }}>
              Eslam Abdelbasset
            </motion.h3>
            <p className="text-muted-foreground mb-6">Building the future of mobile applications, one Flutter app at a time.</p>
            <motion.div className="flex justify-center space-x-6" variants={staggerContainer}>
              <motion.a
                href="https://www.linkedin.com/in/eslamabdelbasset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                variants={fadeInUp}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:eslamabdelbasset1@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                variants={fadeInUp}
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                variants={fadeInUp}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </motion.a>
            </motion.div>
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">© 2025 Eslam Abdelbasset Portfolio. All rights reserved.</p>
            </div>
          </div>
        </div>
      </motion.footer>

       {/* Toasts root */}
       <Toaster />
    </div>
  )
}

export default App
