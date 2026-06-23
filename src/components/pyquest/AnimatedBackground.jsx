import React from "react";
import { motion } from "framer-motion";

// Subtle floating gradient orbs for ambient background movement.
export default function AnimatedBackground({ reducedMotion = false }) {
  if (reducedMotion) return null;

  const orbs = [
    { size: 320, color: "rgba(139,92,246,0.12)", x: "5%", y: "15%", duration: 22, delay: 0 },
    { size: 260, color: "rgba(34,211,238,0.08)", x: "65%", y: "55%", duration: 28, delay: 2 },
    { size: 220, color: "rgba(168,85,247,0.1)", x: "35%", y: "75%", duration: 20, delay: 4 },
    { size: 180, color: "rgba(99,102,241,0.08)", x: "75%", y: "20%", duration: 26, delay: 1 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}