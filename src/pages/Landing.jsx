import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/pyquest/AnimatedBackground";
import { useAuth } from "@/lib/AuthContext";
import PublicNav from "@/components/landing/PublicNav";
import Hero from "@/components/landing/Hero";
import AboutSection from "@/components/landing/AboutSection";
import FeatureCards from "@/components/landing/FeatureCards";
import LessonPathPreview from "@/components/landing/LessonPathPreview";
import CTASection from "@/components/landing/CTASection";

export default function Landing() {
  const { isAuthenticated, authChecked } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authChecked && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authChecked, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen relative overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #0f0a1e 0%, #1a1035 50%, #0d1b2a 100%)" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        <PublicNav />
        <Hero />
        <AboutSection />
        <FeatureCards />
        <LessonPathPreview />
        <CTASection />
        <footer className="pb-8 text-center">
          <a href="https://shererwebstudio.base44.app" target="_blank" rel="noopener noreferrer"
            className="inline-block px-3 py-1.5 rounded-full text-[10px] font-medium opacity-60 hover:opacity-100 transition-opacity"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa" }}>
            Made by Sherer Web Studio
          </a>
        </footer>
      </div>
    </div>
  );
}