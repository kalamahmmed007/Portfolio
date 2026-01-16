import React from 'react';
import { Code2, Database, Globe, Server, Zap, Heart, Target, TrendingUp, Award, BookOpen, Coffee, Sparkles } from 'lucide-react';

const About = () => {
  const skills = [
    { name: "Frontend", percentage: 95, color: "bg-red-600" },
    { name: "Backend", percentage: 90, color: "bg-gray-800" },
    { name: "Database", percentage: 85, color: "bg-red-500" },
    { name: "DevOps", percentage: 80, color: "bg-gray-700" }
  ];

  const expertise = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Frontend Development",
      description: "Expert in React, Vue, Next.js with modern UI/UX principles. Creating responsive, accessible, and performant interfaces.",
      technologies: ["React", "Next.js", "Tailwind", "TypeScript"]
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Backend Development",
      description: "Building robust APIs and server-side applications with Node.js, Express, and microservices architecture.",
      technologies: ["Node.js", "Express", "REST API", "GraphQL"]
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Management",
      description: "Designing efficient database schemas and optimizing queries for MongoDB, PostgreSQL, and Redis.",
      technologies: ["MongoDB", "PostgreSQL", "Redis", "Mongoose"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Full Stack Solutions",
      description: "End-to-end application development from concept to deployment with modern tech stacks and best practices.",
      technologies: ["MERN", "Docker", "AWS", "CI/CD"]
    }
  ];

  const achievements = [
    { icon: <Award className="h-6 w-6" />, number: "50+", label: "Completed Projects" },
    { icon: <Target className="h-6 w-6" />, number: "100%", label: "Client Satisfaction" },
    { icon: <TrendingUp className="h-6 w-6" />, number: "3+", label: "Years Experience" },
    { icon: <Coffee className="h-6 w-6" />, number: "1000+", label: "Cups of Coffee" }
  ];

  const values = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance First",
      description: "Optimizing every line of code for speed and efficiency"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "User-Centric",
      description: "Designing with empathy and user needs in mind"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and methodologies"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and documented code"
    }
  ];

  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-gray-900 md:text-6xl">
            About <span className="text-red-600">Me</span>
          </h2>
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="h-1 w-12 bg-red-600"></div>
            <div className="h-3 w-3 rotate-45 bg-red-600"></div>
            <div className="h-1 w-12 bg-red-600"></div>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            I'm a passionate Full Stack Developer who loves turning complex problems into simple, 
            beautiful, and intuitive solutions. Crafting digital experiences is not just my profession, 
            it's my passion.
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-20">
          <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-2xl md:p-12">
            <div className="mx-auto max-w-4xl">
              <h3 className="mb-6 flex items-center gap-3 text-3xl font-bold md:text-4xl">
                <span className="text-red-500">👋</span> Hello, I'm a Full Stack Developer
              </h3>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <p>
                  With over 3 years of experience in web development, I specialize in creating modern, 
                  scalable applications using the MERN stack. My journey began with a curiosity about 
                  how websites work, and it has evolved into a deep passion for building digital solutions 
                  that make a real impact.
                </p>
                <p>
                  I believe that great software is not just about writing code—it's about understanding 
                  user needs, solving real problems, and creating experiences that people love to use. 
                  Every project I work on is an opportunity to learn something new and push the boundaries 
                  of what's possible.
                </p>
                <p>
                  My approach combines technical expertise with creative problem-solving. Whether it's 
                  architecting a complex backend system, designing an intuitive user interface, or 
                  optimizing application performance, I'm committed to delivering excellence in every 
                  aspect of development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="group rounded-xl border-2 border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-red-600 hover:shadow-xl"
              >
                <div className="mb-4 flex justify-center text-gray-400 transition-colors group-hover:text-red-600">
                  {item.icon}
                </div>
                <div className="mb-2 text-4xl font-bold text-gray-900">{item.number}</div>
                <div className="text-sm font-medium text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="mb-20">
          <h3 className="mb-2 text-center text-3xl font-bold text-gray-900">
            My <span className="text-red-600">Expertise</span>
          </h3>
          <p className="mb-12 text-center text-gray-600">Specialized skills and technologies I work with</p>
          
          <div className="grid gap-8 md:grid-cols-2">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-gray-50 p-8 transition-all duration-300 hover:bg-gray-900 hover:shadow-2xl"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex-shrink-0 text-red-600 transition-colors group-hover:text-red-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-white">
                      {item.title}
                    </h4>
                    <p className="mb-4 leading-relaxed text-gray-600 transition-colors group-hover:text-gray-300">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 transition-colors group-hover:border-gray-700 group-hover:bg-gray-800 group-hover:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="mb-20">
          <h3 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Technical <span className="text-red-600">Proficiency</span>
          </h3>
          <p className="mb-12 text-center text-gray-600">My skill level across different domains</p>
          
          <div className="mx-auto max-w-3xl space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="rounded-xl bg-gray-50 p-6 transition-shadow hover:shadow-lg">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">{skill.name}</span>
                  <span className="text-lg font-bold text-red-600">{skill.percentage}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Core <span className="text-red-600">Values</span>
          </h3>
          <p className="mb-12 text-center text-gray-600">Principles that guide my work</p>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-xl border-2 border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-red-600 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                  {value.icon}
                </div>
                <h4 className="mb-2 text-lg font-bold text-gray-900">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-1">
            <div className="rounded-xl bg-white px-8 py-6">
              <p className="mb-4 text-lg text-gray-700">
                Interested in working together or have a project in mind?
              </p>
              <a
                href="#contact"
                className="inline-block rounded-lg bg-red-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:shadow-xl"
              >
                Let's Create Something Amazing
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;