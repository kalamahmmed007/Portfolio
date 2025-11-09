// src/components/ContactMe.jsx
import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ContactMe() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return alert("Name, email, and message are required!");

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    const inputStyle = {
        backgroundColor: "#111",
        border: "1px solid #1f1f1f",
        borderRadius: "10px",
        padding: "15px",
        color: "#fff",
        fontSize: "15px",
        transition: "all 0.3s ease",
    };

    const contactCards = [
        { icon: <FaEnvelope />, title: "Email", value: "0057kalamahmmed@gmail.com", link: "mailto:0057kalamahmmed@gmail.com" },
        { icon: <FaPhone />, title: "Phone", value: "+880 1723785084", link: "tel:+8801723785084" },
        { icon: <FaMapMarkerAlt />, title: "Location", value: "Greenroad Dhanmondi, Dhaka, Bangladesh", link: "#" },
    ];

    const socialLinks = [
        { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/kalam-ahmmed/" },
        { icon: <FaGithub />, link: "https://github.com/kalamahmmed007/" },

    ];

    return (
        <div style={{ backgroundColor: "#0a0a0a", color: "#fff", padding: "80px 0" }} id="contact">
            <div className="container">
                <h2 className="text-center fw-bold mb-5">Contact Me</h2>

                {/* Contact Info Cards */}
                <div className="row g-4 mb-5 justify-content-center">
                    {contactCards.map((card, idx) => (
                        <div className="col-md-4" key={idx}>
                            <a
                                href={card.link}
                                className="card text-center bg-dark border-0 shadow-sm p-4 rounded-4 d-flex align-items-center justify-content-center hover-glow transition-transform"
                                style={{ cursor: "pointer", textDecoration: "none", color: "#fff" }}
                            >
                                <div className="mb-2 fs-3">{card.icon}</div>
                                <h5 className="fw-bold">{card.title}</h5>
                                <p>{card.value}</p>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="row g-5">
                    {/* Form */}
                    <div className="col-lg-6">
                        <form
                            onSubmit={handleSubmit}
                            className="card p-5 shadow-lg rounded-4 bg-dark hover-glow transition-transform"
                        >
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone (optional)"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    style={inputStyle}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn w-100"
                                style={{
                                    backgroundColor: "#10b981",
                                    color: "#000",
                                    fontWeight: "600",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                            {success && (
                                <p className="mt-3 text-success text-center fw-medium">Message sent successfully!</p>
                            )}
                        </form>
                    </div>

                    {/* Social Links / Map */}
                    <div className="col-lg-6">
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <h4 className="mb-4">Follow Me</h4>
                            <div className="d-flex gap-3 mb-4">
                                {socialLinks.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="fs-3 text-white hover-glow"
                                        style={{ transition: "all 0.3s ease" }}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                            {/* Google Map Embed */}
                            <div style={{ width: "100%", height: "300px", borderRadius: "15px", overflow: "hidden", boxShadow: "0 5px 20px rgba(0,0,0,0.1)" }}>
                                <iframe
                                    title="Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.292295339171!2d90.3671077746541!3d23.806015986637553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c10bb217f1f7%3A0x36fa30278b29f2e5!2sDhaka!5e0!3m2!1sen!2sbd!4v1697049080660!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
        .hover-glow:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 12px 30px rgba(16,185,129,0.5);
        }
        .transition-transform {
          transition: all 0.3s ease;
        }
        ::placeholder {
          color: #6b7280;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #10b981 !important;
          box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.2) !important;
        }
      `}</style>
        </div>
    );
}
