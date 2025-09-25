import React, { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let cancelled = false;
    let resizeRaf = null;

    (async () => {
      const THREE = await import('three');
      if (cancelled || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // Particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 150;
      const posArray = new Float32Array(particlesCount * 3);
      const velocities = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 15;
        posArray[i + 1] = (Math.random() - 0.5) * 15;
        posArray[i + 2] = (Math.random() - 0.5) * 15;
        velocities[i] = (Math.random() - 0.5) * 0.02;
        velocities[i + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i + 2] = (Math.random() - 0.5) * 0.02;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xFFC300,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Floating geometric shapes
      const shapes = [];
      for (let i = 0; i < 20; i++) {
        const geometry = Math.random() > 0.5
          ? new THREE.BoxGeometry(0.1, 0.1, 0.1)
          : new THREE.SphereGeometry(0.05, 8, 8);

        const material = new THREE.MeshBasicMaterial({
          color: 0xFFC300,
          transparent: true,
          opacity: 0.3,
          wireframe: true,
        });

        const shape = new THREE.Mesh(geometry, material);
        shape.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        );

        shapes.push({
          mesh: shape,
          velocity: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
          },
        });

        scene.add(shape);
      }

      // Connections
      const connections = [];
      for (let i = 0; i < shapes.length - 1; i++) {
        const points = [shapes[i].mesh.position, shapes[i + 1].mesh.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xFFC300, transparent: true, opacity: 0.2 });
        const line = new THREE.Line(geometry, material);
        connections.push({ line, from: i, to: i + 1 });
        scene.add(line);
      }

      camera.position.z = 5;

      let time = 0;
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        time += 0.01;

        const positions = particlesMesh.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1] + Math.sin(time + i) * 0.001;
          positions[i + 2] += velocities[i + 2];
          if (Math.abs(positions[i]) > 7.5) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 7.5) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 7.5) velocities[i + 2] *= -1;
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true;

        shapes.forEach((shape, index) => {
          shape.mesh.position.x += shape.velocity.x;
          shape.mesh.position.y += shape.velocity.y + Math.sin(time + index) * 0.002;
          shape.mesh.position.z += shape.velocity.z;
          shape.mesh.rotation.x += 0.01;
          shape.mesh.rotation.y += 0.01;
          if (Math.abs(shape.mesh.position.x) > 5) shape.velocity.x *= -1;
          if (Math.abs(shape.mesh.position.y) > 5) shape.velocity.y *= -1;
          if (Math.abs(shape.mesh.position.z) > 5) shape.velocity.z *= -1;
        });

        connections.forEach((connection) => {
          const points = [shapes[connection.from].mesh.position, shapes[connection.to].mesh.position];
          connection.line.geometry.setFromPoints(points);
        });

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(() => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      };

      window.addEventListener('resize', handleResize);

      const cleanup = () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener('resize', handleResize);
        if (resizeRaf) cancelAnimationFrame(resizeRaf);
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };

      if (cancelled) cleanup();

      // store cleanup
      ThreeBackground._cleanup = cleanup;
    })();

    return () => {
      cancelled = true;
      if (ThreeBackground._cleanup) ThreeBackground._cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
