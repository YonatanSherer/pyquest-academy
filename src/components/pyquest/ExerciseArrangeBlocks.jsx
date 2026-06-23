import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExerciseArrangeBlocks({ exercise, onAnswer, isAnswered, isCorrect, reducedMotion }) {
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState(exercise.blocks.map((_, i) => i));

  const selectBlock = (idx) => {
    setSelected([...selected, idx]);
    setAvailable(available.filter(i => i !== idx));
  };

  const unselectBlock = (idx) => {
    setAvailable([...available, idx]);
    setSelected(selected.filter(i => i !== idx));
  };

  const handleSubmit = () => {
    const correct = JSON.stringify(selected) === JSON.stringify(exercise.correctOrder);
    onAnswer(selected, correct);
  };

  return (
    <div className="space-y-4">
      {/* Selected blocks (answer area) */}
      <div
        className="min-h-[100px] rounded-xl p-3 space-y-2"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: isAnswered
            ? isCorrect ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(239,68,68,0.3)"
            : "1px dashed rgba(139,92,246,0.3)",
        }}
      >
        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Your answer (tap to remove)</p>
        <AnimatePresence>
          {selected.map((idx, i) => (
            <motion.button
              key={`sel-${idx}`}
              layout
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => !isAnswered && unselectBlock(idx)}
              disabled={isAnswered}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono"
              style={{
                background: isAnswered
                  ? isCorrect ? "rgba(16,185,129,0.15)" : exercise.correctOrder[i] === idx ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)"
                  : "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.2)",
                color: "#e2e8f0",
              }}
            >
              {exercise.blocks[idx]}
            </motion.button>
          ))}
        </AnimatePresence>
        {selected.length === 0 && (
          <p className="text-slate-600 text-xs text-center py-4">Tap blocks below to arrange them</p>
        )}
      </div>

      {/* Available blocks */}
      {!isAnswered && (
        <div className="space-y-2">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Available blocks</p>
          <AnimatePresence>
            {available.map(idx => (
              <motion.button
                key={`avl-${idx}`}
                layout
                initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => selectBlock(idx)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#cbd5e1",
                }}
                whileTap={reducedMotion ? {} : { scale: 0.97 }}
              >
                {exercise.blocks[idx]}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isAnswered && selected.length === exercise.blocks.length && (
        <motion.button
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-bold text-white text-sm"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          whileTap={reducedMotion ? {} : { scale: 0.97 }}
        >
          Check Answer
        </motion.button>
      )}

      {isAnswered && !isCorrect && (
        <div className="px-4 py-3 rounded-xl text-sm text-slate-300"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
          <p className="text-red-300 text-xs mb-2">Correct order:</p>
          {exercise.correctOrder.map((idx, i) => (
            <p key={i} className="text-emerald-300 font-mono text-xs">{exercise.blocks[idx]}</p>
          ))}
        </div>
      )}
    </div>
  );
}