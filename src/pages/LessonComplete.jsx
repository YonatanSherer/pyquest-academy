import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ChevronRight, Star, RotateCcw } from "lucide-react";
import AppShell from "@/components/pyquest/AppShell";
import Mascot from "@/components/pyquest/Mascot";
import GlassCard from "@/components/pyquest/GlassCard";
import { LESSONS, BADGES } from "@/lib/lessonData";
import { setSoundEnabled, playComplete, playBadge } from "@/lib/soundUtils";
import { getOrCreateProgress } from "@/lib/progressUtils";

export default function LessonComplete() {
  const { lessonId } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const lesson = LESSONS.find(l => l.id === lessonId);
  const [countXP, setCountXP] = useState(0);

  const { xpGain = 0, correctCount = 0, total = 0, newBadges = [], perfect = false } = state;

  useEffect(() => {
    // Play completion sound
    getOrCreateProgress().then(p => {
      setSoundEnabled(p.sound_enabled !== false);
      if (newBadges.length > 0) playBadge();
      else playComplete();
    });

    // Celebration confetti
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#6366f1", "#a855f7", "#22d3ee"] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#6366f1", "#a855f7", "#22d3ee"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  // XP count-up
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

  const lessonIndex = LESSONS.findIndex(l => l.id === lessonId);
  const nextLesson = lessonIndex + 1 < LESSONS.length ? LESSONS[lessonIndex + 1] : null;

  return (
    <AppShell>
      <div className="px-4 pt-8 pb-8 max-w-lg mx-auto flex flex-col items-center gap-6 text-center min-h-[80vh] justify-center">
        {/* Celebration header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <Mascot mood="celebrate" size="lg" message={perfect ? "PERFECT SCORE!! 🎉" : "Lesson Complete! 🏆"} />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold font-heading bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #e879f9, #22d3ee)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {lesson?.title || "Lesson"} Complete!
        </motion.h1>

        {/* XP Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard neon className="text-center px-8 py-6">
            <p className="text-sm text-purple-300 mb-1">XP Earned</p>
            <motion.p
              className="text-5xl font-bold font-heading"
              style={{ color: "#a78bfa" }}
            >
              +{countXP}
            </motion.p>
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="px-4 py-3 rounded-xl text-center" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <p className="text-2xl font-bold text-emerald-400">{correctCount}</p>
            <p className="text-[10px] text-emerald-400/60">Correct</p>
          </div>
          <div className="px-4 py-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-2xl font-bold text-slate-300">{total}</p>
            <p className="text-[10px] text-slate-500">Total</p>
          </div>
          {perfect && (
            <div className="px-4 py-3 rounded-xl text-center" style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)" }}>
              <Star className="w-6 h-6 text-yellow-400 mx-auto fill-yellow-400" />
              <p className="text-[10px] text-yellow-400/60">Perfect!</p>
            </div>
          )}
        </motion.div>

        {/* New Badges */}
        {newBadges.length > 0 && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-sm text-purple-300 mb-2">New Badges Unlocked! 🎖️</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {newBadges.map(badgeId => {
                const badge = BADGES.find(b => b.id === badgeId);
                return badge ? (
                  <div key={badgeId} className="px-3 py-2 rounded-xl text-center" style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)" }}>
                    <span className="text-2xl">{badge.icon}</span>
                    <p className="text-[10px] text-yellow-300 mt-1">{badge.title}</p>
                  </div>
                ) : null;
              })}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          className="w-full space-y-3 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          {nextLesson ? (
            <Link to={`/lesson/${nextLesson.id}`} className="block">
              <motion.button
                className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 25px rgba(139,92,246,0.25)" }}
                whileTap={{ scale: 0.97 }}
              >
                Next Lesson: {nextLesson.title}
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          ) : (
            <Link to="/badges" className="block">
              <motion.button
                className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                whileTap={{ scale: 0.97 }}
              >
                You finished all lessons! View Badges 🏆
              </motion.button>
            </Link>
          )}

          <Link to={`/exercise/${lessonId}`}>
            <button className="w-full py-3 rounded-2xl font-medium text-slate-400 text-sm flex items-center justify-center gap-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <RotateCcw className="w-4 h-4" />
              Retry Lesson
            </button>
          </Link>

          <Link to="/dashboard">
            <p className="text-purple-400 text-xs mt-2 text-center">← Back to Dashboard</p>
          </Link>
        </motion.div>
      </div>
    </AppShell>
  );
}