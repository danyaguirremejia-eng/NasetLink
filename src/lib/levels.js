export const LEVELS = [
  { level: 2, seconds: 10, rate: 1.0 },
  { level: 4, seconds: 20, rate: 2.5 },
  { level: 6, seconds: 30, rate: 4.0 },
  { level: 8, seconds: 40, rate: 6.0 },
  { level: 10, seconds: 50, rate: 10.0 },
];

export const CURRENT_LEVEL = LEVELS[0];
export const RANK = { name: "BRONCE", icon: "🥉" };
export const MIN_PAYOUT = 5;
export const COUNTDOWN_SECONDS = 15;

// El pago es por cada 1000 clics; cada visita completada acredita la milésima parte.
export const RATE_PER_CLICK = CURRENT_LEVEL.rate / 1000;

/* ---------- Tabla pública de pagos y calculadora (landing) ---------- */

export const PAYOUT_STEPS = [2, 3, 4, 5];

// USD por cada 1000 clics válidos según el número de pasos del enlace.
export const STEP_RATES = { 1: 3, 2: 5, 3: 8, 4: 12, 5: 17, 6: 24 };

export const PLAN_LEVELS = [
  { id: 1, label: "LEVEL 1", multiplier: 1 },
  { id: 2, label: "LEVEL 2", multiplier: 1.4 },
  { id: 3, label: "LEVEL 3", multiplier: 1.9 },
  { id: 4, label: "LEVEL 4", multiplier: 2.5 },
  { id: 5, label: "LEVEL 5", multiplier: 3.4 },
  { id: 6, label: "LEVEL MAX", multiplier: 4.5 },
];

export function ecpmFor(levelId, steps) {
  const level = PLAN_LEVELS.find((item) => item.id === levelId) ?? PLAN_LEVELS[0];
  const base = STEP_RATES[steps] ?? STEP_RATES[1];
  return Math.round(base * level.multiplier * 100) / 100;
}