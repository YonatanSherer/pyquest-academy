import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/pyquest/AnimatedBackground";
import { LESSONS } from "@/lib/lessonData";
import DemoIntro from "@/components/demo/DemoIntro";
import DemoExercises from "@/components/demo/DemoExercises";
import DemoComplete from "@/components/demo/DemoComplete";

export default function DemoLesson() {
  const navigate = useNavigate();
  const lesson = LESSONS[0];
  const [phase, setPhase] = useState("intro");
  const [correctCount, setCorrectCount] = useState(0);

  return (
    <div className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #0f0a1e 0%, #1a1035 50%, #0d1b2a 100%)" }}>
      <AnimatedBackground />
      <div className="relative z-10">
        {phase === "intro" && (
          <DemoIntro lesson={lesson} onStart={() => setPhase("exercises")} onBack={() => navigate("/")} />
        )}
        {phase === "exercises" && (
          <DemoExercises
            lesson={lesson}
            onComplete={(count) => { setCorrectCount(count); setPhase("complete"); }}
            onBack={() => setPhase("intro")}
          />
        )}
        {phase === "complete" && (
          <DemoComplete
            lesson={lesson}
            correctCount={correctCount}
            total={lesson.exercises.length}
            onRetry={() => { setPhase("intro"); setCorrectCount(0); }}
          />
        )}
      </div>
    </div>
  );
}