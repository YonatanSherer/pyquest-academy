import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Lightbulb } from "lucide-react";
import confetti from "canvas-confetti";
import AppShell from "@/components/pyquest/AppShell";
import Mascot from "@/components/pyquest/Mascot";
import CodeBlock from "@/components/pyquest/CodeBlock";
import ExerciseMultipleChoice from "@/components/pyquest/ExerciseMultipleChoice";
import ExerciseFillBlank from "@/components/pyquest/ExerciseFillBlank";
import ExerciseArrangeBlocks from "@/components/pyquest/ExerciseArrangeBlocks";
import { LESSONS, isLessonUnlocked, getLevelFromXP } from "@/lib/lessonData";
import { getOrCreateProgress, updateProgress, calculateStreak, checkNewBadges } from "@/lib/progressUtils";
import { setSoundEnabled, playCorrect, playWrong, playComplete, playBadge } from "@/lib/soundUtils";
import XPPopup from "@/components/pyquest/XPPopup";

export default function Exercise() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = LESSONS.find(l => l.id === lessonId);

  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [showHint, setShowHint] = useState(false);
  const [mascotMood, setMascotMood] = useState("thinking");
  const [mascotMsg, setMascotMsg] = useState("You got this! 💪");
  const [showXPPopup, setShowXPPopup] = useState(false);

  useEffect(() => {
    getOrCreateProgress().then(p => {
      setProgress(p);
      setHearts(p.hearts ?? 5);
      setSoundEnabled(p.sound_enabled !== false);
      setLoading(false);
    }).catch(() => setLoading(false));
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

  if (!lesson || !isLessonUnlocked(lessonId, progress?.completed_lessons || [])) {
    navigate("/lessons");
    return null;
  }

  const rm = progress?.reduced_motion || false;
  const exercises = lesson.exercises;
  const exercise = exercises[currentIndex];
  const progressPct = ((currentIndex + (isAnswered ? 1 : 0)) / exercises.length) * 100;

  const handleCorrectAnswer = () => {
    setIsCorrect(true);
    setIsAnswered(true);
    setCorrectCount(c => c + 1);
    setMascotMood("happy");
    setMascotMsg(["Nice one! 🎉", "Perfect! ⚡", "You're a natural! 🌟", "Awesome! 🚀"][Math.floor(Math.random() * 4)]);
    playCorrect();
    if (!rm) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, colors: ["#6366f1", "#a855f7", "#22d3ee", "#10b981"] });
      setShowXPPopup(true);
      setTimeout(() => setShowXPPopup(false), 1000);
    }
  };

  const handleWrongAnswer = () => {
    setIsCorrect(false);
    setIsAnswered(true);
    const newHearts = Math.max(0, hearts - 1);
    setHearts(newHearts);
    setMascotMood("sad");
    setMascotMsg(["Don't worry, try the next one!", "Almost! Keep going! 💪", "Learning from mistakes! 📚"][Math.floor(Math.random() * 3)]);
    playWrong();
  };

  const handleMultipleChoiceAnswer = (index) => {
    setSelectedIndex(index);
    if (index === exercise.correctIndex) handleCorrectAnswer();
    else handleWrongAnswer();
  };

  const handleFillBlankAnswer = (value, correct) => {
    if (correct) handleCorrectAnswer();
    else handleWrongAnswer();
  };

  const handleArrangeAnswer = (order, correct) => {
    if (correct) handleCorrectAnswer();
    else handleWrongAnswer();
  };

  const handleNext = async () => {
    if (hearts <= 0) {
      await updateProgress(progress.id, { hearts: 0 });
      navigate("/dashboard");
      return;
    }

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setSelectedIndex(null);
      setShowHint(false);
      setMascotMood("thinking");
      setMascotMsg("You got this! 💪");
    } else {
      // Lesson complete
      const completed = [...(progress.completed_lessons || [])];
      if (!completed.includes(lessonId)) completed.push(lessonId);

      const nextLessonIdx = LESSONS.findIndex(l => l.id === lessonId) + 1;
      const nextLesson = nextLessonIdx < LESSONS.length ? LESSONS[nextLessonIdx].id : lessonId;

      const xpGain = lesson.xpReward;
      const newXP = (progress.xp || 0) + xpGain;
      const totalExercises = (progress.total_exercises_completed || 0) + exercises.length;
      const { streak: streakDelta, isNewDay } = calculateStreak(progress.last_activity_date);
      let newStreak = progress.streak || 0;
      if (isNewDay) newStreak = streakDelta === 0 ? 1 : newStreak + 1;
      const bestStreak = Math.max(progress.best_streak || 0, newStreak);

      const perfect = correctCount === exercises.length;
      const lessonScores = { ...(progress.lesson_scores || {}) };
      lessonScores[lessonId] = { correct: correctCount, total: exercises.length, perfect };

      const updatedData = {
        xp: newXP,
        level: getLevelFromXP(newXP),
        hearts,
        streak: newStreak,
        best_streak: bestStreak,
        last_activity_date: new Date().toISOString().split("T")[0],
        completed_lessons: completed,
        current_lesson: nextLesson,
        lesson_scores: lessonScores,
        total_exercises_completed: totalExercises,
      };

      const newBadges = checkNewBadges({ ...progress, ...updatedData });
      if (newBadges.length > 0) {
        updatedData.badges = [...(progress.badges || []), ...newBadges];
        playBadge();
      }

      playComplete();
      await updateProgress(progress.id, updatedData);

      navigate(`/lesson-complete/${lessonId}`, {
        state: { xpGain, correctCount, total: exercises.length, newBadges, perfect }
      });
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
    <AppShell>
      <XPPopup show={showXPPopup} amount={Math.round(lesson.xpReward / exercises.length)} reducedMotion={rm} />
      <div className="px-4 pt-4 pb-8 max-w-lg mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(`/lesson/${lessonId}`)} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} className={`w-4 h-4 transition-all ${i < hearts ? "text-red-400 fill-red-400" : "text-slate-600"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }}
            animate={{ width: `${progressPct}%` }}
            transition={rm ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className="text-slate-500 text-xs text-center">{currentIndex + 1} / {exercises.length}</p>

        {/* Mascot */}
        <div className="flex justify-center">
          <Mascot mood={mascotMood} size="sm" message={mascotMsg} reducedMotion={rm} />
        </div>

        {/* Exercise */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={rm ? {} : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={rm ? {} : { opacity: 0, x: -30 }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-purple-400 uppercase tracking-wider font-medium">
                {getExerciseTypeLabel(exercise.type)}
              </span>
              <h2 className="text-white font-semibold text-base">{exercise.question}</h2>
            </div>

            {exercise.code && (
              <CodeBlock code={exercise.code} small />
            )}

            {/* Exercise type renderers */}
            {(exercise.type === "multiple-choice" || exercise.type === "predict-output" || exercise.type === "find-bug") && (
              <ExerciseMultipleChoice
                exercise={exercise}
                onAnswer={handleMultipleChoiceAnswer}
                selectedIndex={selectedIndex}
                isAnswered={isAnswered}
                reducedMotion={rm}
              />
            )}

            {(exercise.type === "fill-blank" || exercise.type === "complete-code") && (
              <ExerciseFillBlank
                exercise={exercise}
                onAnswer={handleFillBlankAnswer}
                isAnswered={isAnswered}
                isCorrect={isCorrect}
                reducedMotion={rm}
              />
            )}

            {exercise.type === "arrange-blocks" && (
              <ExerciseArrangeBlocks
                exercise={exercise}
                onAnswer={handleArrangeAnswer}
                isAnswered={isAnswered}
                isCorrect={isCorrect}
                reducedMotion={rm}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Hint */}
        {!isAnswered && exercise.hint && (
          <motion.button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs text-amber-400/70 mx-auto"
            whileTap={rm ? {} : { scale: 0.95 }}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? "Hide hint" : "Show hint"}
          </motion.button>
        )}
        <AnimatePresence>
          {showHint && !isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-2.5 rounded-xl text-xs text-amber-300/80"
              style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.15)" }}
            >
              💡 {exercise.hint}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next / Continue */}
        {isAnswered && (
          <motion.button
            initial={rm ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-sm"
            style={{
              background: hearts <= 0
                ? "linear-gradient(135deg, #ef4444, #dc2626)"
                : currentIndex === exercises.length - 1
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "linear-gradient(135deg, #6366f1, #a855f7)",
            }}
            whileTap={rm ? {} : { scale: 0.97 }}
          >
            {hearts <= 0 ? "Out of Hearts — Return" : currentIndex === exercises.length - 1 ? "Complete Lesson 🎉" : "Next →"}
          </motion.button>
        )}
      </div>
    </AppShell>
  );
}