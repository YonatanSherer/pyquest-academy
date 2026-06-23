import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, BookOpen } from "lucide-react";
import AppShell from "@/components/pyquest/AppShell";
import Mascot from "@/components/pyquest/Mascot";
import StatsBar from "@/components/pyquest/StatsBar";
import XPBar from "@/components/pyquest/XPBar";
import GlassCard from "@/components/pyquest/GlassCard";
import { LESSONS, getLevelFromXP } from "@/lib/lessonData";
import { getOrCreateProgress, shouldRefillHearts, updateProgress, calculateStreak } from "@/lib/progressUtils";

export default function Dashboard() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    try {
      const p = await getOrCreateProgress();
      // Refill hearts if needed
      if (shouldRefillHearts(p.hearts_last_refill) && (p.hearts || 0) < 5) {
        const updated = await updateProgress(p.id, { hearts: 5, hearts_last_refill: new Date().toISOString() });
        setProgress(updated);
      } else {
        // Check streak
        const { streak: streakDelta, isNewDay } = calculateStreak(p.last_activity_date);
        if (isNewDay && streakDelta === 0 && (p.streak || 0) > 0) {
          const updated = await updateProgress(p.id, { streak: 0, last_activity_date: new Date().toISOString().split("T")[0] });
          setProgress(updated);
        } else {
          setProgress(p);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  const completedCount = progress?.completed_lessons?.length || 0;
  const currentLesson = LESSONS.find(l => l.id === progress?.current_lesson) || LESSONS[0];
  const level = getLevelFromXP(progress?.xp || 0);
  const rm = progress?.reduced_motion || false;

  const getMascotMessage = () => {
    if (completedCount === 0) return "Ready for your first lesson? Let's go! 🚀";
    if (completedCount >= 10) return "You're a Python Master! Amazing! 🏆";
    if ((progress?.streak || 0) >= 3) return `${progress.streak}-day streak! You're on fire! 🔥`;
    return "Keep going! You're doing great! 💪";
  };

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto space-y-5">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">PyQuest Academy</h1>
            <p className="text-slate-400 text-xs mt-0.5">Level {level} Coder</p>
          </div>
          <StatsBar hearts={progress?.hearts ?? 5} streak={progress?.streak ?? 0} xp={progress?.xp ?? 0} reducedMotion={rm} />
        </motion.div>

        {/* XP Bar */}
        <XPBar xp={progress?.xp || 0} level={level} reducedMotion={rm} />

        {/* Mascot */}
        <motion.div
          className="flex justify-center"
          initial={rm ? {} : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Mascot
            mood={completedCount >= 10 ? "celebrate" : completedCount > 0 ? "happy" : "idle"}
            size="lg"
            message={getMascotMessage()}
            reducedMotion={rm}
          />
        </motion.div>

        {/* Continue Lesson */}
        {completedCount < LESSONS.length && (
          <Link to={`/lesson/${currentLesson.id}`}>
            <GlassCard neon className="cursor-pointer" reducedMotion={rm}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
                    {currentLesson.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-purple-400 font-medium uppercase tracking-wider">Continue Learning</p>
                    <p className="text-white font-semibold text-sm">{currentLesson.title}</p>
                    <p className="text-slate-400 text-xs">+{currentLesson.xpReward} XP</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-400" />
              </div>
            </GlassCard>
          </Link>
        )}

        {/* Progress */}
        <GlassCard reducedMotion={rm}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Your Progress
            </h2>
            <span className="text-xs text-purple-300 font-bold">{completedCount}/{LESSONS.length}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #22d3ee)" }}
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / LESSONS.length) * 100}%` }}
              transition={rm ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
            />
          </div>
        </GlassCard>

        {/* Recent Lessons */}
        <div>
          <h2 className="text-white font-semibold text-sm mb-3">Recent Lessons</h2>
          <div className="space-y-2">
            {LESSONS.slice(0, 4).map((lesson, i) => {
              const completed = (progress?.completed_lessons || []).includes(lesson.id);
              const score = progress?.lesson_scores?.[lesson.id];
              return (
                <motion.div
                  key={lesson.id}
                  initial={rm ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <Link to={`/lesson/${lesson.id}`}>
                    <div
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
                      style={{
                        background: completed ? "rgba(16, 185, 129, 0.08)" : "rgba(255,255,255,0.03)",
                        border: completed ? "1px solid rgba(16, 185, 129, 0.15)" : "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span className="text-lg">{lesson.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{lesson.title}</p>
                        {score && <p className="text-emerald-400 text-[10px]">{score.correct}/{score.total} correct</p>}
                      </div>
                      {completed && <span className="text-emerald-400 text-sm">✓</span>}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <Link to="/lessons">
            <p className="text-center text-purple-400 text-xs mt-3 font-medium">View all lessons →</p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}