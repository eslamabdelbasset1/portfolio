import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Database,
    Code,
    Server,
} from 'lucide-react';

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

// Skill categories with icons
const skillCategories = [
    {
        icon: Code,
        title: "Front-End Development",
        skills: [
            { name: "HTML", percentage: 95 },
            { name: "CSS", percentage: 95 },
            { name: "JavaScript", percentage: 90 },
            { name: "Vue.js", percentage: 90 },
            { name: "React", percentage: 80 },
            { name: "Photoshop", percentage: 75 }
        ]
    },
    {
        icon: Database,
        title: "Back-End Development",
        skills: [
            { name: "PHP", percentage: 95 },
            { name: "Laravel", percentage: 95 },
            { name: "MySQL", percentage: 90 },
            { name: "C++", percentage: 80 },
            { name: "WordPress Development", percentage: 85 },
            { name: "WIX", percentage: 90 }
        ]
    },
    {
        icon: Server,
        title: "Tools & DevOps",
        skills: [
            { name: "Git / GitHub", percentage: 95 },
            { name: "SSH / Terminal", percentage: 90 },
            { name: "Docker", percentage: 80 },
            { name: "CI/CD (GitHub Actions/GitLab CI)", percentage: 85 },
            { name: "Nginx / Apache", percentage: 80 },
            { name: "Linux Server Management", percentage: 85 }
        ]
    }
];

// All skills for the badges section
const allSkills = [
    "HTML", "CSS", "JavaScript", "Vue.js", "React", "Photoshop",
    "PHP", "Laravel", "MySQL", "C++", "WordPress", "WIX",
    "Git", "GitHub", "SSH", "Terminal", "Docker", "CI/CD",
    "Nginx", "Apache", "Linux", "REST APIs", "GraphQL", "Flutter",
    "Dart", "Android", "iOS", "Firebase", "SQLite", "Figma"
];

const SkillsSection = () => {
    return (
        <section id="skills" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        These are the technologies I've worked with
                    </p>
                </motion.div>

                 {/*Skill categories with progress bars*/}
                <motion.div
                    className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {skillCategories.map((category) => (
                        <motion.div
                            key={category.title}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="h-full">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center text-lg">
                                        <category.icon className="h-5 w-5 mr-2 text-primary" />
                                        {category.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {category.skills.map((skill, index) => (
                                            <div key={skill.name} className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span>{skill.name}</span>
                                                    <span className="text-muted-foreground">{skill.percentage}%</span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2.5">
                                                    <motion.div
                                                        className="bg-primary h-2.5 rounded-full"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.percentage}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: index * 0.1 }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                 {/*All skills badges*/}
                <motion.div
                    className="mt-12"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h3 className="text-2xl font-bold text-center mb-8">All Skills</h3>
                    <motion.div
                        className="flex flex-wrap justify-center gap-3"
                        variants={staggerContainer}
                    >
                        {allSkills.map((skill, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Badge variant="secondary" className="text-sm px-4 py-2">
                                    {skill}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;