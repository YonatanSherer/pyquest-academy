import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";
import { playTap } from "@/lib/soundUtils";

export default function CTASection() {
  return (
    <section className="px-4 py-16 max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl p-8"
        style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}
      >
        <h2 className="text-2xl font-bold text-white font-heading">Ready to Start Your Quest?</h2>
        <p className="text-slate-400 text-sm mt-2 mb-6">Join PyQuest Academy and learn Python the fun way.</p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <Link to="/demo" onClick={playTap}>
            <motion.button
              className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Play className="w-5 h-5" />
              Try Demo Lesson
            </motion.button>
          </Link>
          <Link to="/register" onClick={playTap}>
            <motion.button
              className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles className="w-5 h-5" />
              Create Free Account
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}