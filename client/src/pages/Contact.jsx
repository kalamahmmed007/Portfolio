import { useState, useEffect } from "react";
import ContactForm from "../components/contact/ContactForm";
import SocialLinks from "../components/contact/SocialLinks";
import { 
  Mail, Phone, MapPin, Clock, MessageCircle, 
  Send, Loader 
} from "lucide-react";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch("/api/contact/info");
        const data = await response.json();
        setContactInfo(data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
        // Demo data if API fails
        setContactInfo({
          email: "contact@example.com",
          phone: "+1 234 567 8900",
          address: "123 Main Street, Dhaka, Bangladesh",
          workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
          social: {
            facebook: "https://facebook.com/username",
            twitter: "https://twitter.com/username",
            linkedin: "https://linkedin.com/in/username",
            github: "https://github.com/username",
            instagram: "https://instagram.com/username",
            youtube: "https://youtube.com/@username",
            email: "contact@example.com",
            whatsapp: "1234567890",
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleFormSubmit = (formData) => {
    console.log("Form submitted:", formData);
    // Additional actions after form submission
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <MessageCircle className="h-4 w-4" />
            Get In Touch
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Let's Work Together
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 bg-blue-600"></div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Have a project in mind? I'd love to hear from you. Send me a message and let's discuss how we can work together.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Email */}
            <div className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Email</h3>
              <a 
                href={`mailto:${contactInfo?.email}`}
                className="break-all text-gray-600 transition-colors hover:text-blue-600"
              >
                {contactInfo?.email}
              </a>
            </div>

            {/* Phone */}
            <div className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Phone</h3>
              <a 
                href={`tel:${contactInfo?.phone}`}
                className="text-gray-600 transition-colors hover:text-green-600"
              >
                {contactInfo?.phone}
              </a>
            </div>

            {/* Location */}
            <div className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Location</h3>
              <p className="text-gray-600">{contactInfo?.address}</p>
            </div>

            {/* Working Hours */}
            <div className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Working Hours</h3>
              <p className="text-gray-600">{contactInfo?.workingHours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Form & Social Links */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Form - 2/3 width */}
            <div className="lg:col-span-2">
              <ContactForm 
                onSubmit={handleFormSubmit}
                contactInfo={contactInfo}
              />
            </div>

            {/* Social Links - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-2xl bg-white p-8 shadow-lg">
                <SocialLinks socialData={contactInfo?.social} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;