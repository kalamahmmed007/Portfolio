import React, { useState, useEffect } from 'react';
import { Code2, Github, Linkedin, Mail, ArrowDown, Sparkles, Terminal, Coffee } from 'lucide-react';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const roles = [
    "Full Stack Developer",
    "React Specialist",
    "Backend Engineer",
    "Problem Solver"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = roles[currentRole];
      
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
          setTypingSpeed(150);
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentFullText.substring(0, displayText.length - 1));
          setTypingSpeed(100);
        } else {
          // Move to next role
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, typingSpeed]);

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, href: "/contact", label: "Email" }
  ];

  const floatingIcons = [
    { icon: <Code2 />, delay: "0s", duration: "3s" },
    { icon: <Terminal />, delay: "1s", duration: "4s" },
    { icon: <Coffee />, delay: "2s", duration: "3.5s" },
    { icon: <Sparkles />, delay: "0.5s", duration: "4.5s" }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-red-600 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-red-500 opacity-20 blur-3xl" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="absolute text-red-600 opacity-10"
            style={{
              top: `${20 + index * 20}%`,
              left: `${10 + index * 20}%`,
              animation: `float ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay
            }}
          >
            {React.cloneElement(item.icon, { className: "h-12 w-12" })}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center gap-12 py-20 lg:flex-row-reverse lg:gap-16">
          
          {/* Profile Image */}
          <div className="animate-scaleIn opacity-0 lg:w-1/2" style={{ animationDelay: '0.3s' }}>
            <div className="relative mx-auto max-w-md">
              {/* Decorative rings */}
              <div className="absolute inset-0 animate-pulse rounded-full border-4 border-red-600 opacity-20" style={{ animationDelay: '0s' }}></div>
              <div className="absolute inset-4 animate-pulse rounded-full border-4 border-red-500 opacity-30" style={{ animationDelay: '0.5s' }}></div>
              
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-full border-8 border-gray-800 bg-gradient-to-br from-red-600 to-gray-900 p-2 shadow-2xl">
                <div className="overflow-hidden rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                    alt="Profile"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="animate-bounce-slow absolute -bottom-4 left-1/2 -translate-x-1/2">
                <div className="rounded-full border-4 border-gray-900 bg-red-600 px-6 py-3 shadow-xl">
                  <span className="items-center gap-2 text-sm font-bold text-white">
                    <Sparkles className="h-4 w-4" />
                    Available for Work
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center lg:w-1/2 lg:text-left">
            {/* Name */}
            <h1 className="animate-slideInLeft mb-4 opacity-0" style={{ animationDelay: '0.4s' }}>
              <span className="block text-4xl font-bold text-gray-400 sm:text-5xl md:text-4xl">
                Hello, I'm
              </span>
              <span className="mt-2 block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-6xl font-extrabold text-transparent sm:text-8xl md:text-5xl">
                Kalam Ahmmed
              </span>
            </h1>

            {/* Animated Role with Typing Effect */}
            <div className="animate-slideInRight mb-8 h-16 opacity-0" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <Code2 className="h-8 w-8 text-red-500" />
                <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-3xl">
                  <span className="inline-block">
                    {displayText}
                    <span className="ml-1 inline-block h-10 w-1 animate-pulse bg-red-500"></span>
                  </span>
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="animate-fadeInUp mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-300 opacity-0 sm:text-xl lg:mx-0" style={{ animationDelay: '0.8s' }}>
              Crafting beautiful, scalable web applications with modern technologies.
              Passionate about creating exceptional digital experiences that make a difference.
            </p>

            {/* CTA Buttons */}
            <div className="animate-scaleIn mb-12 flex flex-wrap items-center justify-center gap-4 opacity-0 lg:justify-start" style={{ animationDelay: '1s' }}>
              <a
                href="#projects"
                className="group relative overflow-hidden rounded-lg bg-red-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-2xl"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </a>
              
              <a
                href="#contact"
                className="rounded-lg border-2 border-gray-600 bg-transparent px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-red-600 hover:bg-red-600 hover:shadow-xl"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="animate-fadeInUp mb-16 flex items-center justify-center gap-4 opacity-0 lg:justify-start" style={{ animationDelay: '1.2s' }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-600 bg-transparent text-gray-400 transition-all duration-300 hover:scale-110 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="animate-bounce-slow hidden lg:block">
              <a
                href="#about"
                className="inline-flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-red-500"
              >
                <span className="text-sm font-medium">Scroll Down</span>
                <ArrowDown className="h-6 w-6" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;