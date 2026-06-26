import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lightbulb } from "lucide-react";
import confetti from "canvas-confetti";
import Mascot from "@/components/pyquest/Mascot";
import CodeBlock from "@/components/pyquest/CodeBlock";
import ExerciseMultipleChoice from "@/components/pyquest/ExerciseMultipleChoice";
import ExerciseFillBlank from "@/components/pyquest/ExerciseFillBlank";
import ExerciseArrangeBlocks from "@/components/pyquest/ExerciseArrangeBlocks";
import XPPopup from "@/components/pyquest/XPPopup";
import { playCorrect, playWrong, playComplete } from "@/lib/soundUtils";

export default function DemoExercises({ lesson, onComplete, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [mascotMood, setMascotMood] = useState("thinking");
  const [mascotMsg, setMascotMsg] = useState("You got this! 💪");
  const [showXPPopup, setShowXPPopup] = useState(false);

  const exercises = lesson.exercises;
  const exercise = exercises[currentIndex];
  const progressPct = ((currentIndex + (isAnswered ? 1 : 0)) / exercises.length) * 100;

  const handleCorrect = () => {
    setIsCorrect(true);
    setIsAnswered(true);
    setCorrectCount(c => c + 1);
    setMascotMood("happy");
    setMascotMsg(["Nice one! 🎉", "Perfect! ⚡", "You're a natural! 🌟"][Math.floor(Math.random() * 3)]);
    playCorrect();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, colors: ["#6366f1", "#a855f7", "#22d3ee", "#10b981"] });
    setShowXPPopup(true);
    setTimeout(() => setShowXPPopup(false), 1000);
  };

  const handleWrong = () => {
    setIsCorrect(false);
    setIsAnswered(true);
    setMascotMood("sad");
    setMascotMsg(["Don't worry, try the next one!", "Almost! Keep going! 💪"][Math.floor(Math.random() * 2)]);
    playWrong();
  };

  const handleMCAnswer = (index) => {
    setSelectedIndex(index);
    if (index === exercise.correctIndex) handleCorrect();
    else handleWrong();
  };

  const handleFillAnswer = (value, correct) => {
    if (correct) handleCorrect();
    else handleWrong();
  };

  const handleArrangeAnswer = (order, correct) => {
    if (correct) handleCorrect();
    else handleWrong();
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setSelectedIndex(null);
      setShowHint(false);
      setMascotMood("thinking");
      setMascotMsg("You got this! 💪");
    } else {
      playComplete();
      onComplete(correctCount);
    }
  };

  const getExerciseTypeLabel = (type) => {
    const map = {
      "multiple-choice": "Multiple Choice",
      "fill-blank": "Fill in the Blank",
      "arrange-blocks": "Arrange the Code",
      "predict-output": "Predict the Output",
      "find-bug": "Find the Bug",
      "complete-code": "Complete the Code",
    };
    return map[type] || "Exercise";
  };

  return (
    <div className="px-4 pt-4 pb-8 max-w-lg mx-auto space-y-4">
      <XPPopup show={showXPPopup} amount={Math.round(lesson.xpReward / exercises.length)} reducedMotion={false} />

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <span className="text-[10px] text-purple-400 uppercase tracking-wider font-medium">Demo</span>
      </div>

      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }} />
      </div>
      <p className="text-slate-500 text-xs text-center">{currentIndex + 1} / {exercises.length}</p>

      <div className="flex justify-center">
        <Mascot mood={mascotMood} size="sm" message={mascotMsg} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] text-purple-400 uppercase tracking-wider font-medium">{getExerciseTypeLabel(exercise.type)}</span>
            <h2 className="text-white font-semibold text-base">{exercise.question}</h2>
          </div>

          {exercise.code && <CodeBlock code={exercise.code} small />}

          {(exercise.type === "multiple-choice" || exercise.type === "predict-output" || exercise.type === "find-bug") && (
            <ExerciseMultipleChoice exercise={exercise} onAnswer={handleMCAnswer} selectedIndex={selectedIndex} isAnswered={isAnswered} reducedMotion={false} />
          )}
          {(exercise.type === "fill-blank" || exercise.type === "complete-code") && (
            <ExerciseFillBlank exercise={exercise} onAnswer={handleFillAnswer} isAnswered={isAnswered} isCorrect={isCorrect} reducedMotion={false} />
          )}
          {exercise.type === "arrange-blocks" && (
            <ExerciseArrangeBlocks exercise={exercise} onAnswer={handleArrangeAnswer} isAnswered={isAnswered} isCorrect={isCorrect} reducedMotion={false} />
          )}
        </motion.div>
      </AnimatePresence>

      {!isAnswered && exercise.hint && (
        <motion.button onClick={() => setShowHint(!showHint)} className="flex items-center gap-1.5 text-xs text-amber-400/70 mx-auto" whileTap={{ scale: 0.95 }}>
          <Lightbulb className="w-3.5 h-3.5" />
          {showHint ? "Hide hint" : "Show hint"}
        </motion.button>
      )}
      <AnimatePresence>
        {showHint && !isAnswered && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2.5 rounded-xl text-xs text-amber-300/80"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
            💡 {exercise.hint}
          </motion.div>
        )}
      </AnimatePresence>

      {isAnswered && (
        <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={handleNext}
          className="w-full py-3.5 rounded-2xl font-bold text-white text-sm"
          style={{ background: currentIndex === exercises.length - 1 ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #6366f1, #a855f7)" }}
          whileTap={{ scale: 0.97 }}>
          {currentIndex === exercises.length - 1 ? "Complete Lesson 🎉" : "Next →"}
        </motion.button>
      )}
    </div>
  );
}