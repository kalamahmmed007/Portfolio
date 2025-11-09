// src/pages/Projects.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';

// Import project images
import EcommerceImg from '../assets/ecomarce.png';
import EcommerceImg2 from '../assets/ecomarace2.png';
import PortfolioImg from '../assets/Portfolio.png';

const SuccessWorkSection = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const projects = [
        {
            id: 1,
            category: 'Web App Development',
            title: 'Ecommerce Website Frontend Design',
            image: EcommerceImg,
            link: 'https://shop-ecomarce.vercel.app/'
        },
        {
            id: 2,
            category: 'React Single Page Application',
            title: 'Ecommerce app with Redux',
            image: EcommerceImg2,
            link: 'https://e-comarceweb.vercel.app/'
        },
        {
            id: 3,
            category: 'Web Application',
            title: 'Portfolio Website',
            image: PortfolioImg,
            link: 'https://portfolio-nd8u.vercel.app/'
        }
    ];

    const particlesInit = async (engine) => {
        await loadFull(engine);
    };

    const particlesOptions = {
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 100 } },
        },
        particles: {
            color: { value: '#10b981' },
            links: { enable: true, color: '#10b981', distance: 150 },
            collisions: { enable: true },
            move: { enable: true, speed: 2, outModes: { default: 'bounce' } },
            number: { value: 50 },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { value: { min: 2, max: 5 } },
        },
        detectRetina: true,
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Background particles */}
            <Particles id="tsparticles" init={particlesInit} options={particlesOptions} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />

            {/* Projects content */}
            <div className="container py-5" style={{ position: 'relative', zIndex: 1 }} id="projects">
                <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap">
                    <div>
                        <div className="d-inline-flex align-items-center gap-2 px-4 py-2 bg-success bg-opacity-10 border border-success rounded-pill mb-3">
                            <span>✦</span>
                            <span className="fw-semibold text-success">Project</span>
                        </div>
                        <h1 className="fw-bold display-4">My Success Work</h1>
                    </div>
                    <button className="btn btn-success btn-lg d-flex align-items-center gap-2">
                        View All Project <span>→</span>
                    </button>
                </div>

                <div className="row g-4">
                    {projects.map((project) => (
                        <div key={project.id} className="col-lg-6 col-md-6 col-12">
                            <div
                                className="card h-100 shadow-sm border-0"
                                style={{
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transform: hoveredCard === project.id ? 'translateY(-8px)' : 'translateY(0)',
                                    boxShadow: hoveredCard === project.id
                                        ? '0 20px 40px rgba(0, 0, 0, 0.2)'
                                        : '0 4px 15px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={() => setHoveredCard(project.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <img src={project.image} alt={project.title} className="card-img-top" style={{ objectFit: 'cover', height: '280px', transition: 'transform 0.3s ease' }} />
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="text-muted mb-1">{project.category}</p>
                                        <h5 className="fw-bold">{project.title}</h5>
                                    </div>
                                    <a href={project.link} className={`btn btn-success btn-lg`} target="_blank" rel="noreferrer">
                                        ↗
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessWorkSection;
