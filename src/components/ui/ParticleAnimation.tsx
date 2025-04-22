import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  brightness: number;
  alpha: number;
}

export const ParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const colors = [
    { h: 0, s: 100, l: 65 },    // Red
    { h: 180, s: 100, l: 45 },  // Turquoise
    { h: 280, s: 100, l: 65 },  // Purple
    { h: 200, s: 100, l: 55 },  // Blue
    { h: 30, s: 100, l: 55 },   // Orange
    { h: 320, s: 100, l: 65 },  // Pink
    { h: 140, s: 100, l: 45 },  // Green
    { h: 60, s: 100, l: 55 },   // Yellow
    { h: 300, s: 100, l: 55 },  // Magenta
    { h: 160, s: 100, l: 45 },  // Sea Green
  ];

  const createParticle = (x?: number, y?: number): Particle => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const brightness = Math.random() * 30 + 70; // 70-100%
    return {
      x: x ?? Math.random() * dimensions.width,
      y: y ?? Math.random() * dimensions.height,
      size: Math.random() * 3 + 1,
      color: `hsla(${color.h}, ${color.s}%, ${color.l}%, `,
      speed: Math.random() * 1 + 0.5,
      angle: Math.random() * Math.PI * 2,
      brightness,
      alpha: Math.random() * 0.5 + 0.5
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      setDimensions({ width: innerWidth, height: innerHeight });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = Array.from({ length: 200 }, () => createParticle());
    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      particles.forEach((particle, i) => {
        // Update particle position with a flowing motion
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.x += Math.cos(particle.angle) * particle.speed;

        // Gradually change angle for flowing effect
        particle.angle += Math.random() * 0.02 - 0.01;

        // Reset particles when they move off screen
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;

        // Create glowing effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );

        gradient.addColorStop(0, particle.color + particle.alpha + ')');
        gradient.addColorStop(1, particle.color + '0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add connecting lines between nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `${particle.color}${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Add occasional new particles for extra sparkle
      if (Math.random() < 0.05) {
        const edge = Math.floor(Math.random() * 4);
        let x, y;
        switch (edge) {
          case 0: // top
            x = Math.random() * dimensions.width;
            y = 0;
            break;
          case 1: // right
            x = dimensions.width;
            y = Math.random() * dimensions.height;
            break;
          case 2: // bottom
            x = Math.random() * dimensions.width;
            y = dimensions.height;
            break;
          default: // left
            x = 0;
            y = Math.random() * dimensions.height;
        }
        particles.push(createParticle(x, y));
        if (particles.length > 250) particles.shift();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}; 