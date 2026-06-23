import React from "react";
import { motion } from "framer-motion";
import { Heart, Flame, Zap } from "lucide-react";

export default function StatsBar({ hearts, streak, xp, reducedMotion = false }) {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
        style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.25)" }}
        whileTap={reducedMotion ? {} : { scale: 0.95 }}
      >
        <Heart className="w-4 h-4 text-red-400 fill-red-400" />
        <span className="text-sm font-bold text-red-300">{hearts}</span>
      </motion.div>

      <motion.div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
        style={{ background: "rgba(249, 115, 22, 0.15)", border: "1px solid rgba(249, 115, 22, 0.25)" }}
        whileTap={reducedMotion ? {} : { scale: 0.95 }}
      >
        <Flame className="w-4 h-4 text-orange-400" />
        <span className="text-sm font-bold text-orange-300">{streak}</span>
      </motion.div>

      <motion.div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
        style={{ background: "rgba(139, 92, 246, 0.15)", border: "1px solid rgba(139, 92, 246, 0.25)" }}
        whileTap={reducedMotion ? {} : { scale: 0.95 }}
      >
        <Zap className="w-4 h-4 text-purple-400 fill-purple-400" />
        <span className="text-sm font-bold text-purple-300">{xp}</span>
      </motion.div>
    </div>
  );
}