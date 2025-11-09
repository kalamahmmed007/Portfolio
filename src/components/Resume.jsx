import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Star } from "lucide-react";
import reactLogo from "../assets/react.png";
import nodeLogo from "../assets/nodejs.png";
import mongoLogo from "../assets/mongodb.png";
import expressLogo from "../assets/express.png";

//  Company info mapping
import company1Logo from "../assets/logo1.webp";
import company2Logo from "../assets/logo2.png";

const companyData = {
    "#": {
        name: "Awesome Tech Ltd.",
        logo: company1Logo,
    },
    "$": {
        name: "Startup Hub",
        logo: company2Logo,
    },
};

const Experience = () => {
    const experiences = [
        {
            id: 1,
            role: "Upcoming",
            companyLink: "#",
            companyDuration: "",
            tasks: [
                "Built full-stack MERN applications with React, Node.js, Express, and MongoDB.",
                "Developed REST APIs and integrated frontend with backend services.",
                "Managed deployments on cloud platforms and ensured scalable architecture.",
            ],
            tech: [reactLogo, nodeLogo, expressLogo, mongoLogo],
        },
        {
            id: 2,
            role: "Upcoming",
            companyLink: "#",
            companyDuration: "",
            tasks: [
                "Implemented responsive UI components with React & Bootstrap.",
                "Integrated APIs and optimized application performance.",
            ],
            tech: [reactLogo, nodeLogo, mongoLogo],
        },
    ];

    return (
        <div className="container py-5" id="experience">
            <h2 className="fw-bold text-center mb-5">Professional Experience</h2>
            <div className="row g-4">
                {experiences.map((exp) => {
                    const company = companyData[exp.companyLink]; // auto fetch from map
                    return (
                        <div key={exp.id} className="col-md-6">
                            <div className="card h-100 shadow-sm p-3 hover-scale">
                                <div className="d-flex align-items-center mb-3">
                                    {/* logo + name clickable */}
                                    {company && (
                                        <a
                                            href={exp.companyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="me-3"
                                        >
                                            <img
                                                src={company.logo}
                                                alt={company.name}
                                                className="rounded"
                                                style={{ width: "60px", height: "60px", objectFit: "contain" }}
                                            />
                                        </a>
                                    )}
                                    <div>
                                        <h5 className="fw-bold mb-1">{exp.role}</h5>
                                        <p className="text-muted mb-1">{exp.companyDuration}</p>
                                        {company && (
                                            <a
                                                href={exp.companyLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="fw-semibold text-decoration-none text-primary"
                                            >
                                                {company.name}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <ul className="list-unstyled ms-3">
                                    {exp.tasks.map((task, index) => (
                                        <li key={index} className="d-flex gap-2 align-items-start mb-2">
                                            <Star size={16} className="text-success mt-1" />
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-3 d-flex gap-2">
                                    {exp.tech.map((tech, i) => (
                                        <img key={i} src={tech} alt="tech" style={{ width: 30 }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
        .hover-scale:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default Experience;
