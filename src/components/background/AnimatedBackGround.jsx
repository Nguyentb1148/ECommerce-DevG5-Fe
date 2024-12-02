import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const particlesRef = useRef(null);
    const animationSpeedRef = useRef(1);

    useEffect(() => {
        const initScene = () => {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.51, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.position.z = 5;

            sceneRef.current = scene;
            cameraRef.current = camera;
            rendererRef.current = renderer;

            createParticles();
            animate();
        };

        const createParticles = () => {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];

            for (let i = 0; i < 5000; i++) {
                const x = Math.random() * 2000 - 1000;
                const y = Math.random() * 2000 - 1000;
                const z = Math.random() * 2000 - 1000;
                vertices.push(x, y, z);
            }

            geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

            const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
            const particles = new THREE.Points(geometry, material);

            sceneRef.current.add(particles);
            particlesRef.current = particles;
        };

        const animate = () => {
            requestAnimationFrame(animate);

            if (particlesRef.current) {
                particlesRef.current.rotation.x += 0.00005 * animationSpeedRef.current;
                particlesRef.current.rotation.y += 0.0001 * animationSpeedRef.current;
            }

            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };

        const handleResize = () => {
            const { current: camera } = cameraRef;
            const { current: renderer } = rendererRef;

            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        };

        initScene();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
        <div className="overflow-hidden w-full h-90v">
            <canvas ref={canvasRef} className="overflow-hidden"></canvas>
        </div>
        </>
    );
};

export default AnimatedBackground;