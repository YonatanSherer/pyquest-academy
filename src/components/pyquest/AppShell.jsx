import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Map, Trophy, Settings } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { playTap } from "@/lib/soundUtils";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Home" },
  { path: "/lessons", icon: Map, label: "Path" },
  { path: "/badges", icon: Trophy, label: "Badges" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function AppShell({ children }) {
  const { pathname } = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ background: "linear-gradient(180deg, #0f0a1e 0%, #1a1035 50%, #0d1b2a 100%)" }}
    >
      <AnimatedBackground />
      {/* Content */}
      <div className="flex-1 pb-20 overflow-y-auto" style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>

      {/* Bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 safe-area-bottom"
        style={{
          background: "rgba(15, 10, 30, 0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(139, 92, 246, 0.15)",
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={playTap} className="flex flex-col items-center gap-0.5 px-4 py-1 relative">
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 w-8 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }}
                />
              )}
              <item.icon
                className={`w-5 h-5 transition-colors ${isActive ? "text-purple-400" : "text-slate-500"}`}
              />
              <span className={`text-[10px] font-medium ${isActive ? "text-purple-400" : "text-slate-500"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Made by badge */}
      <a
        href="https://shererwebstudio.base44.app"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-3 z-50 px-2.5 py-1 rounded-full text-[9px] font-medium transition-opacity hover:opacity-100 opacity-50"
        style={{
          background: "rgba(139, 92, 246, 0.15)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          color: "#a78bfa",
        }}
      >
        Made by Sherer Web Studio
      </a>
    </div>
  );
}