import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, LogIn } from "lucide-react";
import { playTap } from "@/lib/soundUtils";

export default function PublicNav() {
  const scrollTo = (id) => {
    playTap();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
      style={{
        background: "rgba(15, 10, 30, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
      }}
    >
      <Link to="/" onClick={playTap} className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
          <Code2 className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold text-sm font-heading">PyQuest</span>
      </Link>

      <div className="flex items-center gap-1">
        <button onClick={() => scrollTo("hero")} className="px-2.5 py-1.5 text-slate-300 text-xs font-medium hover:text-white transition-colors">Home</button>
        <Link to="/demo" onClick={playTap} className="px-2.5 py-1.5 text-slate-300 text-xs font-medium hover:text-white transition-colors">Demo</Link>
        <button onClick={() => scrollTo("about")} className="px-2.5 py-1.5 text-slate-300 text-xs font-medium hover:text-white transition-colors">About</button>
        <Link to="/login" onClick={playTap} className="ml-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
          <LogIn className="w-3.5 h-3.5" />
          Login
        </Link>
      </div>
    </motion.nav>
  );
}