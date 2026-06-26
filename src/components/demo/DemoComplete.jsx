import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw } from "lucide-react";
import Mascot from "@/components/pyquest/Mascot";
import GlassCard from "@/components/pyquest/GlassCard";
import { playTap } from "@/lib/soundUtils";

export default function DemoComplete({ lesson, correctCount, total, onRetry }) {
  const [countXP, setCountXP] = useState(0);
  const xpGain = lesson.xpReward;
  const perfect = correctCount === total;

  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#6366f1", "#a855f7", "#22d3ee"] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#6366f1", "#a855f7", "#22d3ee"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  useEffect(() => {
    if (xpGain <= 0) return;
    const step = Math.ceil(xpGain / 30);
    const interval = setInterval(() => {
      setCountXP(prev => {
        const next = prev + step;
        if (next >= xpGain) { clearInterval(interval); return xpGain; }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [xpGain]);

  return (
    <div className="px-4 pt-8 pb-8 max-w-lg mx-auto flex flex-col items-center gap-6 text-center min-h-[80vh] justify-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
        <Mascot mood="celebrate" size="lg" message={perfect ? "PERFECT SCORE!! 🎉" : "Lesson Complete! 🏆"} />
      </motion.div>

      <motion.h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #e879f9, #22d3ee)" }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {lesson.title} Complete!
      </motion.h1>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
        <GlassCard neon animate={false} className="text-center px-8 py-6">
          <p className="text-sm text-purple-300 mb-1">XP Earned</p>
          <motion.p className="text-5xl font-bold font-heading" style={{ color: "#a78bfa" }}>+{countXP}</motion.p>
        </GlassCard>
      </motion.div>

      <motion.div className="flex gap-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="px-4 py-3 rounded-xl text-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <p className="text-2xl font-bold text-emerald-400">{correctCount}</p>
          <p className="text-[10px] text-emerald-400/60">Correct</p>
        </div>
        <div className="px-4 py-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-2xl font-bold text-slate-300">{total}</p>
          <p className="text-[10px] text-slate-500">Total</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        className="w-full rounded-2xl p-5"
        style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" }}>
        <p className="text-white font-semibold text-sm mb-1">Want to save your progress?</p>
        <p className="text-slate-400 text-xs leading-relaxed mb-4">
          Create an account to save your progress, XP, streaks, and badges.
        </p>
        <div className="flex flex-col gap-2">
          <Link to="/register" onClick={playTap}>
            <motion.button className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 text-sm"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
              whileTap={{ scale: 0.97 }}>
              <Sparkles className="w-4 h-4" />
              Create Free Account
            </motion.button>
          </Link>
          <Link to="/login" onClick={playTap}>
            <motion.button className="w-full py-3 rounded-xl font-medium text-slate-300 text-sm"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.97 }}>
              Log In
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div className="w-full space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <motion.button onClick={onRetry} className="w-full py-3 rounded-2xl font-medium text-slate-400 text-sm flex items-center justify-center gap-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          whileTap={{ scale: 0.97 }}>
          <RotateCcw className="w-4 h-4" />
          Try Again
        </motion.button>
        <Link to="/" onClick={playTap}>
          <p className="text-purple-400 text-xs text-center">← Back to Home</p>
        </Link>
      </motion.div>
    </div>
  );
}