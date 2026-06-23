// Web Audio API-based sound system — no external files needed.
// Generates simple tones programmatically for gamification feedback.

let audioContext = null;
let enabled = true;

export function setSoundEnabled(value) {
  enabled = value;
}

function getAudioContext() {
  if (!audioContext) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioContext = new AC();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

function playTone(frequency, duration, type = "sine", volume = 0.1, delay = 0) {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const startTime = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

export function playCorrect() {
  playTone(523.25, 0.12, "sine", 0.12, 0);    // C5
  playTone(659.25, 0.15, "sine", 0.12, 0.1);   // E5
  playTone(783.99, 0.2, "sine", 0.1, 0.2);     // G5
}

export function playWrong() {
  playTone(196, 0.15, "sawtooth", 0.08, 0);    // G3
  playTone(130.81, 0.25, "sawtooth", 0.08, 0.1); // C3
}

export function playComplete() {
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    playTone(freq, 0.25, "sine", 0.12, i * 0.12);
  });
  playTone(1318.51, 0.4, "sine", 0.1, 0.5); // E6 sustain
}

export function playTap() {
  playTone(800, 0.04, "sine", 0.04, 0);
}

export function playBadge() {
  const notes = [783.99, 987.77, 1318.51]; // G5, B5, E6
  notes.forEach((freq, i) => {
    playTone(freq, 0.15, "sine", 0.1, i * 0.08);
  });
}