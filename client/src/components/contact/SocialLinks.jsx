import { 
  Facebook, Twitter, Instagram, Linkedin, Github, 
  Youtube, Mail, Globe, MessageCircle, Send 
} from "lucide-react";

const SocialLinks = ({ socialData }) => {
  const defaultSocials = [
    { 
      name: "Facebook", 
      url: socialData?.facebook || "https://facebook.com", 
      icon: Facebook, 
      color: "bg-blue-600 hover:bg-blue-700" 
    },
    { 
      name: "Twitter", 
      url: socialData?.twitter || "https://twitter.com", 
      icon: Twitter, 
      color: "bg-sky-500 hover:bg-sky-600" 
    },
    { 
      name: "LinkedIn", 
      url: socialData?.linkedin || "https://linkedin.com", 
      icon: Linkedin, 
      color: "bg-blue-700 hover:bg-blue-800" 
    },
    { 
      name: "GitHub", 
      url: socialData?.github || "https://github.com", 
      icon: Github, 
      color: "bg-gray-800 hover:bg-gray-900" 
    },
    { 
      name: "Instagram", 
      url: socialData?.instagram || "https://instagram.com", 
      icon: Instagram, 
      color: "bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600" 
    },
    { 
      name: "YouTube", 
      url: socialData?.youtube || "https://youtube.com", 
      icon: Youtube, 
      color: "bg-red-600 hover:bg-red-700" 
    },
  ];

  // Filter out socials without URLs
  const activeSocials = defaultSocials.filter(social => socialData?.[social.name.toLowerCase()]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-xl font-bold text-gray-900">Connect With Me</h3>
        <p className="mb-6 text-gray-600">
          Follow me on social media to stay updated with my latest work and projects
        </p>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {(activeSocials.length > 0 ? activeSocials : defaultSocials).map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center gap-3 px-4 py-3 ${social.color} text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{social.name}</span>
            </a>
          );
        })}
      </div>

      {/* Alternative Contact Methods */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Other Ways to Reach Me:</h4>
        <div className="space-y-2">
          {socialData?.email && (
            <a
              href={`mailto:${socialData.email}`}
              className="flex items-center gap-3 text-gray-700 transition-colors hover:text-blue-600"
            >
              <Mail className="h-5 w-5" />
              <span>{socialData.email}</span>
            </a>
          )}
          {socialData?.website && (
            <a
              href={socialData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 transition-colors hover:text-blue-600"
            >
              <Globe className="h-5 w-5" />
              <span>Visit My Website</span>
            </a>
          )}
          {socialData?.whatsapp && (
            <a
              href={`https://wa.me/${socialData.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 transition-colors hover:text-green-600"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;