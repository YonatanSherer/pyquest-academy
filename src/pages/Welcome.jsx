import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Mascot from "@/components/pyquest/Mascot";
import AnimatedBackground from "@/components/pyquest/AnimatedBackground";
import { ChevronRight, Code2, Sparkles } from "lucide-react";

export default function Welcome() {
  const [step, setStep] = useState(0);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0a1e 0%, #1a1035 40%, #0d1b2a 100%)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)" }} />
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="splash"
            className="flex flex-col items-center gap-6 z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  boxShadow: "0 0 40px rgba(139,92,246,0.4)"
                }}>
                <Code2 className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold font-heading bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #e879f9, #22d3ee)" }}>
                PyQuest Academy
              </h1>
              <p className="text-slate-400 mt-2 text-sm">Learn Python. Level Up. Become a Coder.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <Mascot mood="wave" size="lg" message="Hey! Ready to code? 🐍" />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              onClick={() => setStep(1)}
              className="mt-4 px-8 py-3.5 rounded-2xl font-bold text-white flex items-center gap-2 text-lg"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                boxShadow: "0 0 30px rgba(139,92,246,0.3)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Quest
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="intro"
            className="flex flex-col items-center gap-6 z-10 text-center max-w-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Mascot mood="happy" size="lg" message="Here's how it works!" />
            <div className="space-y-4 w-full">
              {[
                { icon: "📖", text: "Learn Python with short, fun lessons" },
                { icon: "🎮", text: "Solve interactive exercises" },
                { icon: "⚡", text: "Earn XP and level up" },
                { icon: "🏆", text: "Collect badges and unlock new lessons" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-slate-300 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
            <Link to="/dashboard" className="w-full">
              <motion.button
                className="w-full mt-2 px-8 py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  boxShadow: "0 0 30px rgba(139,92,246,0.3)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Go!
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="absolute bottom-4 text-center z-10">
        <p className="text-slate-600 text-[10px]">A portfolio project by Sherer Web Studio</p>
      </div>
    </div>
  );
}