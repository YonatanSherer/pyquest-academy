import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Play, ChevronRight, Code2 } from "lucide-react";
import Mascot from "@/components/pyquest/Mascot";
import { playTap } from "@/lib/soundUtils";

export default function Hero() {
  return (
    <section id="hero" className="flex flex-col items-center justify-center text-center px-4 pt-28 pb-12 min-h-[90vh]">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
      >
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 40px rgba(139,92,246,0.4)" }}>
          <Code2 className="w-10 h-10 text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-4xl md:text-5xl font-bold font-heading bg-clip-text text-transparent mt-6"
        style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #e879f9, #22d3ee)" }}
      >
        PyQuest Academy
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-slate-400 mt-3 text-sm md:text-base max-w-md"
      >
        Learn Python through short lessons and playful coding challenges.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6"
      >
        <Mascot mood="wave" size="lg" message="Hey! Ready to code? 🐍" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col gap-3 mt-8 w-full max-w-xs"
      >
        <Link to="/demo" onClick={playTap}>
          <motion.button
            className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-base"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Play className="w-5 h-5" />
            Try Demo Lesson
          </motion.button>
        </Link>
        <Link to="/register" onClick={playTap}>
          <motion.button
            className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 text-base"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-5 h-5" />
            Start Learning
          </motion.button>
        </Link>
        <Link to="/login" onClick={playTap}>
          <motion.button
            className="w-full py-3 rounded-2xl font-medium text-slate-300 flex items-center justify-center gap-2 text-sm"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronRight className="w-4 h-4" />
            Log In
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}