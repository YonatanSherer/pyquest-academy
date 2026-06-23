import React, { useState } from "react";
import { motion } from "framer-motion";
import CodeBlock from "./CodeBlock";

export default function ExerciseFillBlank({ exercise, onAnswer, isAnswered, isCorrect, reducedMotion }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    const acceptable = exercise.acceptableAnswers || [exercise.answer];
    const correct = acceptable.some(a => a.trim().toLowerCase() === input.trim().toLowerCase());
    onAnswer(input.trim(), correct);
  };

  return (
    <div className="space-y-4">
      <CodeBlock code={exercise.codeTemplate.replace("___", isAnswered ? (isCorrect ? input : exercise.answer) : "___")} small />

      {!isAnswered ? (
        <div className="space-y-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="Type your answer..."
            className="w-full px-4 py-3 rounded-xl text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
            }}
            autoFocus
          />
          <motion.button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="w-full py-3 rounded-xl font-bold text-white text-sm disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
            }}
            whileTap={reducedMotion ? {} : { scale: 0.97 }}
          >
            Check Answer
          </motion.button>
        </div>
      ) : (
        <div className={`px-4 py-3 rounded-xl text-sm ${isCorrect ? "text-emerald-300" : "text-red-300"}`}
          style={{
            background: isCorrect ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
            border: isCorrect ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(239,68,68,0.2)",
          }}>
          {isCorrect ? "✓ Correct!" : `✗ The answer is: ${exercise.answer}`}
        </div>
      )}
    </div>
  );
}