import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const BackgroundParticles = () => {
    
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particleConfig = {
        background: {
            color: {
                value: "transparent", // Use transparent so your black body background shows through
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                // Optional: Particles will move away when the mouse hovers
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#3b82f6", // Use a subtle primary/blue color for the dots
            },
            links: {
                color: "#3b82f6",
                distance: 150,
                enable: true,
                opacity: 0.2, // Subtle opacity
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                random: false,
                speed: 0.3, // Very slow movement
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 60, // Total number of particles
            },
            opacity: {
                value: 0.4,
            },
            size: {
                value: { min: 1, max: 2 },
            },
        },
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={particleConfig}
        />
    );
};

export default BackgroundParticles;
