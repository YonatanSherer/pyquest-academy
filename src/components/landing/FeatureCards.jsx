import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Gamepad2, Zap, Trophy } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Short Lessons", desc: "Bite-sized explanations with real code examples", color: "#6366f1" },
  { icon: Gamepad2, title: "Interactive Exercises", desc: "Multiple choice, fill-in-the-blank, arrange code & more", color: "#22d3ee" },
  { icon: Zap, title: "XP & Levels", desc: "Earn XP, level up, and track your growth", color: "#a855f7" },
  { icon: Trophy, title: "Badges & Streaks", desc: "Stay motivated with daily streaks and achievements", color: "#eab308" },
];

export default function FeatureCards() {
  return (
    <section className="px-4 py-12 max-w-lg mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-white font-heading text-center mb-6"
      >
        Why You'll Love It
      </motion.h2>
      <div className="grid grid-cols-2 gap-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
              <f.icon className="w-5 h-5" style={{ color: f.color }} />
            </div>
            <h3 className="text-white font-semibold text-sm">{f.title}</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}