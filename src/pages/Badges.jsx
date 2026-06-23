import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppShell from "@/components/pyquest/AppShell";
import GlassCard from "@/components/pyquest/GlassCard";
import XPBar from "@/components/pyquest/XPBar";
import StatsBar from "@/components/pyquest/StatsBar";
import { BADGES, LESSONS, getLevelFromXP } from "@/lib/lessonData";
import { getOrCreateProgress } from "@/lib/progressUtils";

export default function Badges() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrCreateProgress().then(p => { setProgress(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  const earnedBadges = progress?.badges || [];
  const level = getLevelFromXP(progress?.xp || 0);
  const rm = progress?.reduced_motion || false;

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white font-heading">Progress & Badges</h1>
          <StatsBar hearts={progress?.hearts ?? 5} streak={progress?.streak ?? 0} xp={progress?.xp ?? 0} reducedMotion={rm} />
        </div>

        <XPBar xp={progress?.xp || 0} level={level} reducedMotion={rm} />

        {/* Stats overview */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Lessons", value: progress?.completed_lessons?.length || 0, sub: `/ ${LESSONS.length}` },
            { label: "Best Streak", value: progress?.best_streak || 0, sub: "days" },
            { label: "Exercises", value: progress?.total_exercises_completed || 0, sub: "total" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={rm ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-slate-500">{stat.label} {stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Badges grid */}
        <div>
          <h2 className="text-white font-semibold text-sm mb-3">Badges</h2>
          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((badge, i) => {
              const earned = earnedBadges.includes(badge.id);
              return (
                <motion.div
                  key={badge.id}
                  initial={rm ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard
                    neon={earned}
                    className={`text-center ${!earned ? "opacity-40" : ""}`}
                    reducedMotion={rm}
                    animate={false}
                  >
                    <span className="text-3xl">{badge.icon}</span>
                    <p className={`text-sm font-semibold mt-2 ${earned ? "text-white" : "text-slate-500"}`}>
                      {badge.title}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{badge.description}</p>
                    {earned && (
                      <span className="inline-block mt-1 text-[9px] text-emerald-400 font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(16,185,129,0.1)" }}>
                        Earned ✓
                      </span>
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lesson scores */}
        <div>
          <h2 className="text-white font-semibold text-sm mb-3">Lesson Scores</h2>
          <div className="space-y-2">
            {LESSONS.map((lesson) => {
              const score = progress?.lesson_scores?.[lesson.id];
              const completed = (progress?.completed_lessons || []).includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{
                    background: completed ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-lg">{lesson.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{lesson.title}</p>
                  </div>
                  {score ? (
                    <div className="text-right">
                      <p className="text-xs text-emerald-400 font-medium">{score.correct}/{score.total}</p>
                      {score.perfect && <p className="text-[9px] text-yellow-400">⭐ Perfect</p>}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-600">—</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}