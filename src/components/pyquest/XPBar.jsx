import React from "react";
import { motion } from "framer-motion";
import { getXPForLevel, getNextLevelXP } from "@/lib/lessonData";

export default function XPBar({ xp, level, reducedMotion = false }) {
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getNextLevelXP(level);
  const progress = Math.min(((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold text-purple-300">Level {level}</span>
        <span className="text-xs text-slate-400">{xp} / {nextLevelXP} XP</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={reducedMotion ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              animation: reducedMotion ? "none" : "shimmer 2s infinite",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}