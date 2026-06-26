import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Mascot from "@/components/pyquest/Mascot";
import CodeBlock from "@/components/pyquest/CodeBlock";
import GlassCard from "@/components/pyquest/GlassCard";

export default function DemoIntro({ lesson, onStart, onBack }) {
  return (
    <div className="px-4 pt-4 pb-8 max-w-lg mx-auto space-y-5">
      <motion.div className="flex items-center gap-3" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <button onClick={onBack} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div>
          <p className="text-[10px] text-purple-400 uppercase tracking-wider font-medium">Demo Lesson</p>
          <h1 className="text-xl font-bold text-white font-heading">{lesson.title}</h1>
        </div>
      </motion.div>

      <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
        <Mascot mood="thinking" message="Let's learn something new! 📚" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <GlassCard animate={false}>
          <div className="space-y-2">
            {lesson.explanation.split("\n").filter(Boolean).map((line, i) => (
              <p key={i} className="text-slate-300 text-sm leading-relaxed">{line}</p>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
          <span className="text-purple-400">{'</>'}</span> Example
        </h2>
        <CodeBlock code={lesson.codeExample} output={lesson.codeOutput} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <motion.button
          onClick={onStart}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 30px rgba(139,92,246,0.25)" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Exercises
          <ChevronRight className="w-5 h-5" />
        </motion.button>
        <p className="text-center text-slate-500 text-xs mt-2">{lesson.exercises.length} exercises • +{lesson.xpReward} XP</p>
      </motion.div>
    </div>
  );
}