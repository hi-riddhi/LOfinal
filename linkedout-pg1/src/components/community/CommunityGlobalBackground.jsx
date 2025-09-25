import { useEffect, useRef } from 'react';

// Simplified animated background without Three.js dependency
export default function CommunityGlobalBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Create animated particles using CSS
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 4 + 's';
      particle.style.animation = `float ${4 + Math.random() * 4}s ease-in-out infinite alternate`;
      
      mountRef.current.appendChild(particle);
      particles.push(particle);
    }

    // Create floating geometric shapes
    const shapeCount = 15;
    const shapes = [];

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');
      const isCircle = Math.random() > 0.5;
      
      if (isCircle) {
        shape.className = 'absolute w-4 h-4 border border-yellow-400/30 rounded-full';
      } else {
        shape.className = 'absolute w-4 h-4 border border-yellow-400/30 rotate-45';
      }
      
      shape.style.left = Math.random() * 100 + '%';
      shape.style.top = Math.random() * 100 + '%';
      shape.style.animationDelay = Math.random() * 6 + 's';
      shape.style.animation = `floatSlow ${6 + Math.random() * 6}s ease-in-out infinite alternate`;
      
      mountRef.current.appendChild(shape);
      shapes.push(shape);
    }

    return () => {
      particles.forEach(p => p.remove());
      shapes.forEach(s => s.remove());
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          100% { transform: translateY(-20px) translateX(10px); opacity: 0.2; }
        }
        @keyframes floatSlow {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          100% { transform: translateY(-30px) translateX(15px) rotate(180deg); }
        }
      `}</style>
      <div
        ref={mountRef}
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(250,204,21,0.05) 0%, rgba(0,0,0,0.95) 70%)'
        }}
      />
    </>
  );
}
