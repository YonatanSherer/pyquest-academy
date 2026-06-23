import { base44 } from "@/api/base44Client";
import { getLevelFromXP, BADGES } from "./lessonData";

export async function getOrCreateProgress() {
  const list = await base44.entities.StudentProgress.list();
  if (list.length > 0) return list[0];
  const newProgress = await base44.entities.StudentProgress.create({
    xp: 0,
    level: 1,
    hearts: 5,
    streak: 0,
    last_activity_date: new Date().toISOString().split("T")[0],
    completed_lessons: [],
    current_lesson: "what-is-programming",
    badges: [],
    lesson_scores: {},
    total_exercises_completed: 0,
    best_streak: 0,
    hearts_last_refill: new Date().toISOString(),
    sound_enabled: true,
    reduced_motion: false
  });
  return newProgress;
}

export async function updateProgress(progressId, updates) {
  return await base44.entities.StudentProgress.update(progressId, updates);
}

export function checkNewBadges(progress) {
  const currentBadges = progress.badges || [];
  const newBadges = [];
  for (const badge of BADGES) {
    if (!currentBadges.includes(badge.id) && badge.condition(progress)) {
      newBadges.push(badge.id);
    }
  }
  return newBadges;
}

export function calculateStreak(lastActivityDate) {
  if (!lastActivityDate) return { streak: 1, isNewDay: true };
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  if (lastActivityDate === today) return { streak: null, isNewDay: false };
  if (lastActivityDate === yesterday) return { streak: 1, isNewDay: true };
  return { streak: 0, isNewDay: true };
}

export function shouldRefillHearts(heartsLastRefill) {
  if (!heartsLastRefill) return true;
  const refillTime = new Date(heartsLastRefill).getTime();
  const now = Date.now();
  return (now - refillTime) > 4 * 60 * 60 * 1000;
}