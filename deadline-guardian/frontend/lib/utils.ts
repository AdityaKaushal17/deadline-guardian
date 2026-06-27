import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function riskTone(risk: number) {
  if (risk >= 70) return "text-guardian-danger";
  if (risk >= 45) return "text-guardian-amber";
  return "text-guardian-mint";
}

export function riskLabel(risk: number) {
  if (risk >= 70) return "High risk";
  if (risk >= 45) return "Watch";
  return "Stable";
}
