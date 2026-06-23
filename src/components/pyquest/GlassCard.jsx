import React from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", onClick, animate = true, reducedMotion = false, neon = false }) {
  return (
    <motion.div
      className={`rounded-2xl p-4 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(12px)",
        border: neon
          ? "1px solid rgba(139, 92, 246, 0.4)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: neon
          ? "0 0 20px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      onClick={onClick}
      whileHover={animate && !reducedMotion ? { scale: 1.01, y: -2 } : {}}
      whileTap={animate && onClick && !reducedMotion ? { scale: 0.98 } : {}}
      initial={animate && !reducedMotion ? { opacity: 0, y: 10 } : {}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}