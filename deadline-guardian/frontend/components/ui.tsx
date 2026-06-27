import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <section className={cn("glass rounded-lg p-5", className)} {...props}>
      {children}
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  className
}: {
  label: string;
  value: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-white/10 bg-white/[0.035] p-4", className)}>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-1 text-sm text-slate-400">{hint}</p> : null}
    </div>
  );
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-slate-800", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-guardian-cyan to-guardian-mint"
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </div>
  );
}

export function Pill({ children, tone = "neutral" }: PropsWithChildren<{ tone?: "neutral" | "mint" | "amber" | "danger" | "cyan" }>) {
  const tones = {
    neutral: "border-slate-600/50 bg-slate-700/30 text-slate-200",
    mint: "border-guardian-mint/30 bg-guardian-mint/10 text-guardian-mint",
    amber: "border-guardian-amber/30 bg-guardian-amber/10 text-guardian-amber",
    danger: "border-guardian-danger/30 bg-guardian-danger/10 text-guardian-danger",
    cyan: "border-guardian-cyan/30 bg-guardian-cyan/10 text-guardian-cyan"
  };
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone])}>{children}</span>;
}
