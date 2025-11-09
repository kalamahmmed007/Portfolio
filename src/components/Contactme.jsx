<<<<<<< HEAD
// src/components/ContactMe.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ContactMe() {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.message) {
            return alert("Name, email, and message are required!");
        }

        setLoading(true);
        try {
            const res = await fetch("https://portfolio-backend-15r3.onrender.com/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Message submitted successfully");
                setFormData({ name: "", number: "", email: "", message: "" });
            } else {
                alert("Failed to submit message");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        backgroundColor: "#0a0a0a",
        border: "1px solid #1f1f1f",
        borderRadius: "10px",
        padding: "15px",
        color: "#fff",
        fontSize: "15px",
    };

    return (
        <div
            style={{
                backgroundColor: "#0a0a0a",
                minHeight: "100vh",
                padding: "60px 0",
                color: "#fff",
            }}
        >
            <div className="container" id="contact">
                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-lg-6">
                        <button
                            style={{
                                backgroundColor: "transparent",
                                border: "2px solid #10b981",
                                borderRadius: "25px",
                                padding: "8px 20px",
                                color: "#fff",
                                fontSize: "14px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <span style={{ color: "#10b981" }}>✦</span> Contact Me
                        </button>

                        <h1 className="display-4 fw-bold mb-4" style={{ fontSize: "3rem" }}>
                            Contact With Me Today
                        </h1>

                        <p className="text-secondary mb-4" style={{ fontSize: "1.1rem" }}>
                            Let's bring your ideas to life! Contact me today for innovative web, app, and software development solutions.
                        </p>

                        {/* Google Map */}
                        <div
                            style={{
                                borderRadius: "15px",
                                overflow: "hidden",
                                border: "1px solid #1f1f1f",
                                height: "400px",
                            }}
                        >
                            <iframe
                                title="Google Map"
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

                    {/* Right Column - Form */}
                    <div className="col-lg-6">
                        <div
                            style={{
                                backgroundColor: "#111",
                                border: "1px solid #1f1f1f",
                                borderRadius: "20px",
                                padding: "40px",
                            }}
                        >
                            <h2 className="h3 mb-4 fw-bold">Get In Touch</h2>

                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Your Number"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Your Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-4">
                                <textarea
                                    className="form-control"
                                    placeholder="Your Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    style={inputStyle}
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="btn w-100"
                                disabled={loading}
                                style={{
                                    backgroundColor: "#10b981",
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    color: "#000",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styling */}
            <style>{`
        .form-control:focus {
          background-color: #0a0a0a !important;
          border-color: #10b981 !important;
          box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.15) !important;
          color: #fff !important;
        }
        .form-control::placeholder {
          color: #6b7280;
        }
      `}</style>
        </div>
    );
}
=======
// src/components/ContactMe.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ContactMe() {
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.message) {
            return alert("Name, email, and message are required!");
        }

        setLoading(true);
        try {
            const res = await fetch("https://portfolio-backend-15r3.onrender.com/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Message submitted successfully");
                setFormData({ name: "", number: "", email: "", message: "" });
            } else {
                alert("Failed to submit message");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        backgroundColor: "#0a0a0a",
        border: "1px solid #1f1f1f",
        borderRadius: "10px",
        padding: "15px",
        color: "#fff",
        fontSize: "15px",
    };

    return (
        <div
            style={{
                backgroundColor: "#0a0a0a",
                minHeight: "100vh",
                padding: "60px 0",
                color: "#fff",
            }}
        >
            <div className="container" id="contact">
                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-lg-6">
                        <button
                            style={{
                                backgroundColor: "transparent",
                                border: "2px solid #10b981",
                                borderRadius: "25px",
                                padding: "8px 20px",
                                color: "#fff",
                                fontSize: "14px",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <span style={{ color: "#10b981" }}>✦</span> Contact Me
                        </button>

                        <h1 className="display-4 fw-bold mb-4" style={{ fontSize: "3rem" }}>
                            Contact With Me Today
                        </h1>

                        <p className="text-secondary mb-4" style={{ fontSize: "1.1rem" }}>
                            Let's bring your ideas to life! Contact me today for innovative web, app, and software development solutions.
                        </p>

                        {/* Google Map */}
                        <div
                            style={{
                                borderRadius: "15px",
                                overflow: "hidden",
                                border: "1px solid #1f1f1f",
                                height: "400px",
                            }}
                        >
                            <iframe
                                title="Google Map"
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

                    {/* Right Column - Form */}
                    <div className="col-lg-6">
                        <div
                            style={{
                                backgroundColor: "#111",
                                border: "1px solid #1f1f1f",
                                borderRadius: "20px",
                                padding: "40px",
                            }}
                        >
                            <h2 className="h3 mb-4 fw-bold">Get In Touch</h2>

                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Your Number"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Your Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div className="mb-4">
                                <textarea
                                    className="form-control"
                                    placeholder="Your Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    style={inputStyle}
                                ></textarea>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="btn w-100"
                                disabled={loading}
                                style={{
                                    backgroundColor: "#10b981",
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    color: "#000",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styling */}
            <style>{`
        .form-control:focus {
          background-color: #0a0a0a !important;
          border-color: #10b981 !important;
          box-shadow: 0 0 0 0.2rem rgba(16, 185, 129, 0.15) !important;
          color: #fff !important;
        }
        .form-control::placeholder {
          color: #6b7280;
        }
      `}</style>
        </div>
    );
}
>>>>>>> 7aec2cd (Update API endpoint in ContactMe component and fix social media links in Contact page; update project links in Projects page)
