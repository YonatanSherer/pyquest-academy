import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const expressions = {
  idle: { eyes: "😊", body: "🤖" },
  happy: { eyes: "🎉", body: "🤖" },
  sad: { eyes: "😢", body: "🤖" },
  thinking: { eyes: "🤔", body: "🤖" },
  celebrate: { eyes: "🥳", body: "🤖" },
  wave: { eyes: "👋", body: "🤖" },
};

export default function Mascot({ mood = "idle", size = "md", message, reducedMotion = false }) {
  const sizeMap = { sm: 48, md: 72, lg: 96 };
  const px = sizeMap[size] || 72;

  const anim = reducedMotion
    ? {}
    : mood === "happy"
    ? { y: [0, -8, 0], rotate: [0, 5, -5, 0], transition: { duration: 0.6, repeat: 1 } }
    : mood === "sad"
    ? { x: [-4, 4, -4, 4, 0], transition: { duration: 0.4 } }
    : mood === "celebrate"
    ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0], transition: { duration: 0.8, repeat: 2 } }
    : { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } };

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        animate={anim}
        className="relative flex items-center justify-center"
        style={{ width: px, height: px }}
      >
        {/* Robot body */}
        <div
          className="rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            width: px,
            height: px,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)",
          }}
        >
          {/* Face plate */}
          <div
            className="rounded-xl flex items-center justify-center"
            style={{
              width: px * 0.7,
              height: px * 0.5,
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(4px)",
            }}
          >
            {/* Eyes */}
            <div className="flex gap-1">
              <motion.div
                className="rounded-full bg-cyan-400"
                style={{ width: px * 0.15, height: px * 0.15, boxShadow: "0 0 8px rgba(34,211,238,0.8)" }}
                animate={
                  mood === "happy" ? { scale: [1, 1.3, 1] } :
                  mood === "sad" ? { opacity: [1, 0.5, 1] } :
                  { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity } }
                }
              />
              <motion.div
                className="rounded-full bg-cyan-400"
                style={{ width: px * 0.15, height: px * 0.15, boxShadow: "0 0 8px rgba(34,211,238,0.8)" }}
                animate={
                  mood === "happy" ? { scale: [1, 1.3, 1] } :
                  mood === "sad" ? { opacity: [1, 0.5, 1] } :
                  { scale: [1, 1.1, 1], transition: { duration: 2, repeat: Infinity, delay: 0.3 } }
                }
              />
            </div>
          </div>
          {/* Antenna */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 3, height: px * 0.2, background: "#a855f7" }}
          >
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400"
              style={{ width: 8, height: 8, boxShadow: "0 0 10px rgba(34,211,238,0.9)" }}
              animate={{ opacity: [0.5, 1, 0.5], transition: { duration: 1.5, repeat: Infinity } }}
            />
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-1 px-3 py-1.5 rounded-xl text-xs font-medium text-center max-w-[200px]"
            style={{
              background: "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#c4b5fd",
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}