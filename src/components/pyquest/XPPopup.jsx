import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

export default function XPPopup({ show, amount, reducedMotion = false }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-1.5"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5, y: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: -50 }}
          exit={{ opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
        >
          <Zap className="w-7 h-7 text-purple-300 fill-purple-400" style={{ filter: "drop-shadow(0 0 8px rgba(139,92,246,0.6))" }} />
          <span
            className="text-3xl font-bold font-heading"
            style={{ color: "#c4b5fd", textShadow: "0 0 20px rgba(139,92,246,0.6)" }}
          >
            +{amount} XP
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}