import React from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/pyquest/GlassCard";

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-12 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold text-white font-heading">What is PyQuest Academy?</h2>
        <p className="text-slate-400 text-sm mt-2">A gamified way to learn Python from scratch</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <GlassCard animate={false}>
          <p className="text-slate-300 text-sm leading-relaxed">
            PyQuest Academy turns learning Python into an adventure. Instead of long lectures, you get
            <span className="text-purple-300"> bite-sized lessons</span>,
            <span className="text-cyan-300"> interactive exercises</span>, and
            <span className="text-amber-300"> instant feedback</span> — all wrapped in a game-like experience with XP, levels, streaks, and badges.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-3">
            Whether you're a complete beginner or brushing up on basics, PyQuest makes coding feel like play. 🎮
          </p>
        </GlassCard>
      </motion.div>
    </section>
  );
}