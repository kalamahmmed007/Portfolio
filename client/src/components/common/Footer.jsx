import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:youremail@example.com", label: "Email" },
  ];

  const quickLinks = [
    { label: "Home", href: "/hero" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 py-16 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-3">
        
        {/* Logo + Description */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">YourName</h2>
          <p className="mb-6 text-gray-400">
            MERN Stack Developer creating modern, responsive, and scalable web applications. Let's connect!
          </p>

          <div className="flex gap-4">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full p-2 text-gray-300 transition hover:bg-gray-700 hover:text-white"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="transition hover:text-red-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">Contact Me</h3>
          <p className="mb-4 text-gray-400">youremail@example.com</p>

          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        &copy; {currentYear} YourName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
