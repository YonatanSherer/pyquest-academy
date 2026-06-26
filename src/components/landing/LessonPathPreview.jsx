import React from "react";
import { motion } from "framer-motion";
import { LESSONS } from "@/lib/lessonData";

export default function LessonPathPreview() {
  return (
    <section className="px-4 py-12 max-w-lg mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-white font-heading text-center mb-2"
      >
        The Learning Path
      </motion.h2>
      <p className="text-slate-400 text-sm text-center mb-6">10 lessons from basics to mastery</p>

      <div className="relative">
        <div className="absolute left-6 top-6 bottom-6 w-0.5"
          style={{ background: "linear-gradient(180deg, #6366f1, #22d3ee, #a855f7)" }} />
        <div className="space-y-2.5">
          {LESSONS.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl relative"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 relative z-10"
                style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
                {lesson.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Lesson {i + 1}</p>
                <p className="text-sm font-semibold text-white truncate">{lesson.title}</p>
              </div>
              <span className="text-[10px] text-purple-400 font-medium">+{lesson.xpReward} XP</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}