import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Check, ChevronRight } from "lucide-react";
import AppShell from "@/components/pyquest/AppShell";
import StatsBar from "@/components/pyquest/StatsBar";
import { LESSONS, isLessonUnlocked, getLevelFromXP } from "@/lib/lessonData";
import { getOrCreateProgress } from "@/lib/progressUtils";

export default function LessonPath() {
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

  const completed = progress?.completed_lessons || [];
  const rm = progress?.reduced_motion || false;

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white font-heading">Learning Path</h1>
          <StatsBar hearts={progress?.hearts ?? 5} streak={progress?.streak ?? 0} xp={progress?.xp ?? 0} reducedMotion={rm} />
        </div>

        {/* Path */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-6 top-10 bottom-10 w-0.5"
            style={{ background: "linear-gradient(180deg, #6366f1, #22d3ee, #a855f7)" }}
          />

          <div className="space-y-3">
            {LESSONS.map((lesson, i) => {
              const isCompleted = completed.includes(lesson.id);
              const unlocked = isLessonUnlocked(lesson.id, completed);
              const isCurrent = progress?.current_lesson === lesson.id;

              return (
                <motion.div
                  key={lesson.id}
                  initial={rm ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {unlocked || isCompleted ? (
                    <Link to={`/lesson/${lesson.id}`}>
                      <LessonNode
                        lesson={lesson}
                        index={i}
                        isCompleted={isCompleted}
                        isCurrent={isCurrent}
                        unlocked={true}
                        score={progress?.lesson_scores?.[lesson.id]}
                        rm={rm}
                      />
                    </Link>
                  ) : (
                    <LessonNode lesson={lesson} index={i} isCompleted={false} isCurrent={false} unlocked={false} rm={rm} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function LessonNode({ lesson, index, isCompleted, isCurrent, unlocked, score, rm }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-3 rounded-xl relative transition-all ${
        !unlocked ? "opacity-40" : ""
      }`}
      style={{
        background: isCurrent
          ? "rgba(139, 92, 246, 0.12)"
          : isCompleted
          ? "rgba(16, 185, 129, 0.08)"
          : "rgba(255,255,255,0.03)",
        border: isCurrent
          ? "1px solid rgba(139, 92, 246, 0.3)"
          : isCompleted
          ? "1px solid rgba(16, 185, 129, 0.15)"
          : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Node circle */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 relative z-10"
        style={{
          background: isCompleted
            ? "linear-gradient(135deg, #10b981, #059669)"
            : isCurrent
            ? "linear-gradient(135deg, #6366f1, #a855f7)"
            : "rgba(255,255,255,0.06)",
          boxShadow: isCurrent ? "0 0 15px rgba(139,92,246,0.3)" : "none",
        }}
      >
        {isCompleted ? (
          <Check className="w-5 h-5 text-white" />
        ) : !unlocked ? (
          <Lock className="w-4 h-4 text-slate-500" />
        ) : (
          <span>{lesson.icon}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
          Lesson {index + 1}
        </p>
        <p className={`text-sm font-semibold truncate ${unlocked ? "text-white" : "text-slate-500"}`}>
          {lesson.title}
        </p>
        {score && (
          <p className="text-[10px] text-emerald-400">{score.correct}/{score.total} • +{lesson.xpReward} XP</p>
        )}
        {isCurrent && !isCompleted && (
          <p className="text-[10px] text-purple-400 font-medium">In progress</p>
        )}
      </div>

      {unlocked && (
        <ChevronRight className={`w-4 h-4 shrink-0 ${isCurrent ? "text-purple-400" : "text-slate-500"}`} />
      )}
    </div>
  );
}