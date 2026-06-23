import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Lock } from "lucide-react";
import AppShell from "@/components/pyquest/AppShell";
import Mascot from "@/components/pyquest/Mascot";
import CodeBlock from "@/components/pyquest/CodeBlock";
import GlassCard from "@/components/pyquest/GlassCard";
import { LESSONS, isLessonUnlocked } from "@/lib/lessonData";
import { getOrCreateProgress } from "@/lib/progressUtils";

export default function LessonContent() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const lesson = LESSONS.find(l => l.id === lessonId);

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

  if (!lesson) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-white gap-4">
          <p>Lesson not found</p>
          <Link to="/lessons" className="text-purple-400">← Back to lessons</Link>
        </div>
      </AppShell>
    );
  }

  const unlocked = isLessonUnlocked(lessonId, progress?.completed_lessons || []);
  const rm = progress?.reduced_motion || false;

  if (!unlocked) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-white gap-4 px-4">
          <Lock className="w-12 h-12 text-slate-500" />
          <p className="text-slate-400 text-center">Complete the previous lesson to unlock this one!</p>
          <Link to="/lessons" className="text-purple-400 text-sm">← Back to lessons</Link>
        </div>
      </AppShell>
    );
  }

  const lessonIndex = LESSONS.findIndex(l => l.id === lessonId);

  return (
    <AppShell>
      <div className="px-4 pt-4 pb-8 max-w-lg mx-auto space-y-5">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button onClick={() => navigate("/lessons")} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div>
            <p className="text-[10px] text-purple-400 uppercase tracking-wider font-medium">Lesson {lessonIndex + 1}</p>
            <h1 className="text-xl font-bold text-white font-heading">{lesson.title}</h1>
          </div>
        </motion.div>

        {/* Mascot */}
        <motion.div
          className="flex justify-center"
          initial={rm ? {} : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Mascot mood="thinking" message="Let's learn something new! 📚" reducedMotion={rm} />
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={rm ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard reducedMotion={rm}>
            <div className="space-y-2">
              {lesson.explanation.split("\n").filter(Boolean).map((line, i) => (
                <p key={i} className="text-slate-300 text-sm leading-relaxed">{line}</p>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={rm ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
            <span className="text-purple-400">{'</>'}</span> Example
          </h2>
          <CodeBlock code={lesson.codeExample} output={lesson.codeOutput} />
        </motion.div>

        {/* Start Exercise Button */}
        <motion.div
          initial={rm ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to={`/exercise/${lesson.id}`}>
            <motion.button
              className="w-full py-4 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                boxShadow: "0 0 30px rgba(139,92,246,0.25)",
              }}
              whileHover={rm ? {} : { scale: 1.02 }}
              whileTap={rm ? {} : { scale: 0.98 }}
            >
              Start Exercises
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <p className="text-center text-slate-500 text-xs mt-2">
            {lesson.exercises.length} exercises • +{lesson.xpReward} XP
          </p>
        </motion.div>
      </div>
    </AppShell>
  );
}