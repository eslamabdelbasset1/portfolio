import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
};

const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
};

// Web projects data
const webProjects = [
    {
        id: 1,
        title: "EgyptAir – Air Hospitality Administrative System",
        description: "Administrative system for air hospitality services built with Laravel and MySQL.",
        technologies: ["Laravel", "MySQL"],
        features: ["Administrative dashboard", "Service management", "Database integration"],
        status: "Completed",
        category: "filter-laravel",
        image: "dist/assets/img/portfolio/project9.png",
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 2,
        title: "DevFolio website",
        description: "Portfolio website template built with HTML, CSS, and Bootstrap.",
        technologies: ["HTML", "CSS", "Bootstrap"],
        features: ["Responsive design", "Portfolio showcase", "Clean UI"],
        status: "Completed",
        category: "filter-front",
        image: "dist/assets/img/portfolio/project1.png",
        demoLink: "https://eslamabdelbasset1.github.io/Devfolio",
        githubLink: "#"
    },
    {
        id: 3,
        title: "Angora website",
        description: "Modern website built with HTML, CSS, Bootstrap, and JavaScript.",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        features: ["Interactive elements", "Responsive layout", "Modern design"],
        status: "Completed",
        category: "filter-front",
        image: "dist/assets/img/portfolio/project2.png",
        demoLink: "https://eslamabdelbasset1.github.io/Angora",
        githubLink: "#"
    },
    {
        id: 4,
        title: "Education Course Website",
        description: "Website for educational courses built with HTML, CSS, and Bootstrap.",
        technologies: ["HTML", "CSS", "Bootstrap"],
        features: ["Course catalog", "Responsive design", "Clean layout"],
        status: "Completed",
        category: "filter-front",
        image: "dist/assets/img/portfolio/portfolio-3.jpg",
        demoLink: "https://eslamabdelbasset1.github.io/courses-website",
        githubLink: "#"
    },
    {
        id: 5,
        title: "Smart Login website",
        description: "Login system with HTML, CSS, Bootstrap, and JavaScript.",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        features: ["User authentication", "Form validation", "Responsive design"],
        status: "Completed",
        category: "filter-front",
        image: "dist/assets/img/portfolio/project4.png",
        demoLink: "https://eslamabdelbasset1.github.io/smart-login-system",
        githubLink: "#"
    },
    {
        id: 6,
        title: "Bookmarker",
        description: "Bookmark management application built with HTML, CSS, Bootstrap, and JavaScript.",
        technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        features: ["Bookmark storage", "Local storage", "User interface"],
        status: "Completed",
        category: "filter-front",
        image: "dist/assets/img/portfolio/bokkmarker.jpg",
        demoLink: "https://eslamabdelbasset1.github.io/Bookmarker/",
        githubLink: "#"
    },
    {
        id: 7,
        title: "CRUD System website",
        description: "Create, Read, Update, Delete system built with HTML, CSS, JavaScript, jQuery, and Bootstrap.",
        technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
        features: ["Data management", "CRUD operations", "User interface"],
        status: "Completed",
        category: "filter-front",
        image: "dist/assets/img/portfolio/project5.png",
        demoLink: "https://eslamabdelbasset1.github.io/CRUD-System",
        githubLink: "#"
    },
    {
        id: 8,
        title: "Movies App API",
        description: "Movie application using API integration with HTML, CSS, JS, Sass, TypeScript, and SCSS.",
        technologies: ["HTML", "CSS", "JavaScript", "Sass", "TypeScript", "SCSS", "API"],
        features: ["Movie database", "API integration", "Search functionality"],
        status: "Completed",
        category: "filter-api",
        image: "dist/assets/img/portfolio/project7.png",
        demoLink: "https://eslamabdelbasset1.github.io/movies-app-angular",
        githubLink: "#"
    },
    {
        id: 9,
        title: "Quran App",
        description: "Quran application with API integration built with HTML, CSS, JS, Sass, TypeScript, and SCSS.",
        technologies: ["HTML", "CSS", "JavaScript", "Sass", "TypeScript", "SCSS", "API"],
        features: ["Quran verses", "Audio playback", "Search functionality"],
        status: "Completed",
        category: "filter-api",
        image: "dist/assets/img/portfolio/project8.png",
        demoLink: "https://eslamabdelbasset1.github.io/quranApp-master",
        githubLink: "#"
    },
    {
        id: 10,
        title: "Weather App",
        description: "Weather application using API integration with HTML and CSS.",
        technologies: ["HTML", "CSS", "API"],
        features: ["Weather data", "Location-based", "Forecast display"],
        status: "Completed",
        category: "filter-api",
        image: "dist/assets/img/portfolio/3.jpg",
        demoLink: "https://eslamabdelbasset1.github.io/Weather-api",
        githubLink: "#"
    },
    {
        id: 11,
        title: "Todo List",
        description: "Todo list application built with Laravel and MySQL.",
        technologies: ["Laravel", "MySQL"],
        features: ["Task management", "User authentication", "Database storage"],
        status: "Completed",
        category: "filter-laravel",
        image: "dist/assets/img/portfolio/todo.jpg",
        demoLink: "#",
        githubLink: "https://github.com/eslamabdelbasset1/todo-list"
    },
    {
        id: 12,
        title: "Medicazone Store Ecommerce",
        description: "Ecommerce store for medical products built with Laravel and MySQL.",
        technologies: ["Laravel", "MySQL"],
        features: ["Product catalog", "Shopping cart", "Payment processing"],
        status: "Completed",
        category: "filter-laravel",
        image: "dist/assets/img/portfolio/back2.jpg",
        demoLink: "#",
        githubLink: "https://github.com/eslamabdelbasset1/medicazone-finaly"
    },
    {
        id: 13,
        title: "EgyShop Ecommerce",
        description: "Ecommerce platform built with Laravel and MySQL.",
        technologies: ["Laravel", "MySQL"],
        features: ["Product management", "User accounts", "Order processing"],
        status: "Completed",
        category: "filter-laravel",
        image: "dist/assets/img/portfolio/back1.jpg",
        demoLink: "#",
        githubLink: "https://github.com/eslamabdelbasset1/EgyShop"
    },
    {
        id: 14,
        title: "Impact Studios CMS",
        description: "Content Management System for Impact Studios built with Laravel and MySQL.",
        technologies: ["Laravel", "MySQL"],
        features: ["Content management", "User roles", "Dynamic pages"],
        status: "Completed",
        category: "filter-laravel",
        image: "dist/assets/img/portfolio/impact.jpg",
        demoLink: "https://impactstudio.uk",
        githubLink: "#"
    },
    {
        id: 15,
        title: "Bank Management System",
        description: "Bank management system built with C++.",
        technologies: ["C++"],
        features: ["Account management", "Transaction processing", "Data storage"],
        status: "Completed",
        category: "filter-cpp",
        image: "dist/assets/img/portfolio/bank.png",
        demoLink: "#",
        githubLink: "https://github.com/eslamabdelbasset1/Bank-Management-System-"
    }
];

const WebProjectsSection = () => {
    const [filter, setFilter] = useState('*');
    const [projects] = useState(webProjects);

    const filteredProjects = filter === '*'
        ? projects
        : projects.filter(project => project.category === filter);

    return (
        <section id="web-projects" className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div className="text-center mb-16" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Web Development Projects</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Here are some of my web development projects showcasing different technologies and frameworks
                    </p>
                </motion.div>

                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
                    <button
                        className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${filter === '*' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                        onClick={() => setFilter('*')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${filter === 'filter-front' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                        onClick={() => setFilter('filter-front')}
                    >
                        Front-end
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${filter === 'filter-api' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                        onClick={() => setFilter('filter-api')}
                    >
                        API
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${filter === 'filter-laravel' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                        onClick={() => setFilter('filter-laravel')}
                    >
                        Back-end
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${filter === 'filter-cpp' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                        onClick={() => setFilter('filter-cpp')}
                    >
                        C++
                    </button>
                    <a
                        href="https://github.com/eslamabdelbasset1?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-all text-sm md:text-base"
                    >
                        Other Websites
                    </a>
                </div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    key={filter} // Re-render animation when filter changes
                >
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.03, rotateY: 2 }}
                            transition={{ duration: 0.3 }}
                            className="card-hover"
                        >
                            <Card className="group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <CardTitle className="text-xl">{project.title}</CardTitle>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                            <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                                                {project.status}
                                            </Badge>
                                        </motion.div>
                                    </div>
                                    <CardDescription className="text-base leading-relaxed">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4 flex-grow">
                                    {project.image ? (
                                        <div className="mb-4">
                                            <img
                                                src={project.image}
                                                alt={`${project.title} screenshot`}
                                                className="project-image w-full h-48 object-cover rounded-md"
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-4 project-image flex items-center justify-center h-48 bg-muted rounded-md">
                                            <div className="text-center text-muted-foreground">
                                                <Smartphone className="h-12 w-12 mx-auto mb-2" />
                                                <p className="text-sm">Coming Soon</p>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-semibold mb-2">Technologies:</h4>
                                        <motion.div className="flex flex-wrap gap-2" variants={staggerContainer}>
                                            {project.technologies.map((tech, i) => (
                                                <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                                    <Badge variant="outline" className="text-xs">{tech}</Badge>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Key Features:</h4>
                                        <ul className="text-sm text-muted-foreground space-y-1">
                                            {project.features.map((feature, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    • {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex gap-2 pt-4 mt-auto">
                                        {project.demoLink && project.demoLink !== '#' && (
                                            <motion.div className="flex-1" {...scaleOnHover}>
                                                <Button variant="outline" size="sm" className="w-full btn-hover" asChild>
                                                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                                        Live Demo
                                                    </a>
                                                </Button>
                                            </motion.div>
                                        )}
                                        {project.githubLink && project.githubLink !== '#' && (
                                            <motion.div className="flex-1" {...scaleOnHover}>
                                                <Button variant="outline" size="sm" className="w-full btn-hover" asChild>
                                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                                        GitHub
                                                    </a>
                                                </Button>
                                            </motion.div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WebProjectsSection;