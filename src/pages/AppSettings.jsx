import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Eye, EyeOff, Info, ExternalLink, LogOut } from "lucide-react";
import AppShell from "@/components/pyquest/AppShell";
import GlassCard from "@/components/pyquest/GlassCard";
import Mascot from "@/components/pyquest/Mascot";
import { getOrCreateProgress, updateProgress } from "@/lib/progressUtils";
import { base44 } from "@/api/base44Client";

export default function AppSettings() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrCreateProgress().then(p => { setProgress(p); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  const toggleSetting = async (key) => {
    const updated = await updateProgress(progress.id, { [key]: !progress[key] });
    setProgress(updated);
  };

  const rm = progress?.reduced_motion || false;

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto space-y-6">
        <h1 className="text-xl font-bold text-white font-heading">Settings</h1>

        <div className="flex justify-center">
          <Mascot mood="idle" message="Customize your experience! ⚙️" reducedMotion={rm} />
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <GlassCard reducedMotion={rm} animate={false}>
            <button onClick={() => toggleSetting("sound_enabled")} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                {progress?.sound_enabled ? <Volume2 className="w-5 h-5 text-purple-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
                <div className="text-left">
                  <p className="text-white text-sm font-medium">Sound Effects</p>
                  <p className="text-slate-500 text-xs">Toggle in-app sounds</p>
                </div>
              </div>
              <div
                className="w-11 h-6 rounded-full relative transition-colors"
                style={{ background: progress?.sound_enabled ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)" }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  animate={{ left: progress?.sound_enabled ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </button>
          </GlassCard>

          <GlassCard reducedMotion={rm} animate={false}>
            <button onClick={() => toggleSetting("reduced_motion")} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                {progress?.reduced_motion ? <EyeOff className="w-5 h-5 text-slate-500" /> : <Eye className="w-5 h-5 text-purple-400" />}
                <div className="text-left">
                  <p className="text-white text-sm font-medium">Reduced Motion</p>
                  <p className="text-slate-500 text-xs">Minimize animations</p>
                </div>
              </div>
              <div
                className="w-11 h-6 rounded-full relative transition-colors"
                style={{ background: progress?.reduced_motion ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)" }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-white absolute top-0.5"
                  animate={{ left: progress?.reduced_motion ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </button>
          </GlassCard>
        </div>

        {/* About */}
        <div>
          <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-purple-400" />
            About
          </h2>
          <GlassCard reducedMotion={rm} animate={false}>
            <div className="space-y-3">
              <p className="text-slate-300 text-sm leading-relaxed">
                <span className="font-semibold text-white">PyQuest Academy</span> is a portfolio educational app project designed to teach Python programming to beginners through gamified, interactive lessons.
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                This app features short lessons, interactive exercises, XP rewards, badges, and a fun learning path — making coding accessible and engaging for school students.
              </p>
              <a
                href="https://shererwebstudio.base44.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-purple-400 font-medium hover:text-purple-300 transition-colors"
              >
                Made by Sherer Web Studio
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Logout */}
        <button
          onClick={() => base44.auth.logout("/")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-red-400 transition-colors"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </AppShell>
  );
}