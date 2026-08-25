// Thin localStorage wrapper. All app data lives in the browser —
// no backend required for the core tracker features.

const KEY_PREFIX = 'studyhub_';

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function daysUntil(dateStr) {
  const today = new Date(todayStr());
  const target = new Date(dateStr);
  return Math.round((target - today) / 86400000);
}
