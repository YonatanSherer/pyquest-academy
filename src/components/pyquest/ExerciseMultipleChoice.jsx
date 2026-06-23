import React from "react";
import { motion } from "framer-motion";

export default function ExerciseMultipleChoice({ exercise, onAnswer, selectedIndex, isAnswered, reducedMotion }) {
  return (
    <div className="space-y-2.5">
      {exercise.options.map((opt, i) => {
        const isCorrect = i === exercise.correctIndex;
        const isSelected = selectedIndex === i;
        let bg = "rgba(255,255,255,0.04)";
        let border = "1px solid rgba(255,255,255,0.08)";
        let glow = "none";

        if (isAnswered) {
          if (isCorrect) {
            bg = "rgba(16, 185, 129, 0.15)";
            border = "1px solid rgba(16, 185, 129, 0.4)";
            glow = "0 0 15px rgba(16, 185, 129, 0.2)";
          } else if (isSelected && !isCorrect) {
            bg = "rgba(239, 68, 68, 0.15)";
            border = "1px solid rgba(239, 68, 68, 0.4)";
          }
        }

        return (
          <motion.button
            key={i}
            onClick={() => !isAnswered && onAnswer(i)}
            disabled={isAnswered}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: bg, border, boxShadow: glow }}
            whileHover={!isAnswered && !reducedMotion ? { scale: 1.02 } : {}}
            whileTap={!isAnswered && !reducedMotion ? { scale: 0.98 } : {}}
            animate={
              isAnswered && isSelected && !isCorrect && !reducedMotion
                ? { x: [-4, 4, -4, 4, 0] }
                : isAnswered && isCorrect && !reducedMotion
                ? { scale: [1, 1.03, 1] }
                : {}
            }
          >
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  background: isAnswered && isCorrect
                    ? "rgba(16, 185, 129, 0.3)"
                    : isAnswered && isSelected && !isCorrect
                    ? "rgba(239, 68, 68, 0.3)"
                    : "rgba(255,255,255,0.06)",
                  color: isAnswered && isCorrect ? "#34d399" : isAnswered && isSelected ? "#f87171" : "#94a3b8",
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
              <span className={isAnswered && isCorrect ? "text-emerald-300" : isAnswered && isSelected && !isCorrect ? "text-red-300" : "text-slate-300"}>
                {opt}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}