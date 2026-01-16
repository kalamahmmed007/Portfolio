import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, X, Download, Code2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav 
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 shadow-lg backdrop-blur-md' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-2xl font-bold transition-all"
          >
            
            <span className="text-gray-900">
            Kalam<span className="text-red-600"> Ahmmed</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className="relative text-sm font-medium text-gray-700 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:text-red-600 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="/path-to-your-cv.pdf"
              download
              className="group flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-red-600 hover:bg-red-50 hover:text-red-600"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download CV
            </a>
            
            <Link
              to="/contact"
              className="rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-300 text-gray-700 transition-all hover:border-red-600 hover:text-red-600 lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="border-t border-gray-200 bg-white px-4 py-6 shadow-lg">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-all hover:bg-red-50 hover:text-red-600"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile CTA Buttons */}
          <div className="mt-6 space-y-3">
            <a
              href="/path-to-your-cv.pdf"
              download
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-red-600 hover:bg-red-50 hover:text-red-600"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Hire Me
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;