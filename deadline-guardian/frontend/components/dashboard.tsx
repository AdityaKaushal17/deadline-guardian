"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  MailCheck,
  Mic,
  Radar,
  Sparkles,
  Target,
  TimerReset,
  Wand2
} from "lucide-react";
import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useMemo } from "react";
import { Panel, Pill, Progress, Stat } from "@/components/ui";
import { riskLabel, riskTone } from "@/lib/utils";
import { useGuardianStore } from "@/store/use-guardian-store";

const focusData = [
  { day: "Mon", focus: 82, delay: 19 },
  { day: "Tue", focus: 77, delay: 24 },
  { day: "Wed", focus: 88, delay: 15 },
  { day: "Thu", focus: 61, delay: 46 },
  { day: "Fri", focus: 84, delay: 20 },
  { day: "Sat", focus: 69, delay: 31 },
  { day: "Sun", focus: 74, delay: 27 }
];

const heatmap = [
  34, 52, 81, 91, 78, 61, 49,
  42, 68, 89, 86, 73, 55, 35,
  25, 41, 72, 80, 70, 44, 29
];

export function GuardianDashboard() {
  const {
    tasks,
    calendar,
    habits,
    profile,
    rescueMode,
    selectedTaskId,
    assistantInput,
    setAssistantInput,
    selectTask,
    addNaturalLanguageTask
  } = useGuardianStore();

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? tasks[0];
  const highestRisk = [...tasks].sort((a, b) => b.risk - a.risk)[0];
  const todayHours = tasks.reduce((sum, task) => sum + task.estimateHours * (1 - task.progress / 100), 0);

  const sortedTasks = useMemo(() => [...tasks].sort((a, b) => b.priorityScore - a.priorityScore), [tasks]);

  return (
    <main className="min-h-screen overflow-hidden bg-guardian-grid bg-[size:32px_32px]">
      <div className="mx-auto flex w-full max-w-7xl gap-5 px-4 py-5 lg:px-6">
        <aside className="hidden w-64 shrink-0 flex-col gap-3 lg:flex">
          <div className="glass rounded-lg p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-guardian-cyan/15 text-guardian-cyan">
                <Radar size={24} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Deadline Guardian AI</h1>
                <p className="text-xs text-slate-400">AI Chief of Staff</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Predicts missed deadlines before they happen and actively helps users complete tasks.
            </p>
          </div>

          {["Dashboard", "Calendar", "Tasks", "Productivity Twin", "Habits", "Voice"].map((item, index) => (
            <button
              key={item}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-slate-300 transition hover:border-guardian-cyan/40 hover:text-white"
            >
              {item}
              {index === 0 ? <span className="h-2 w-2 rounded-full bg-guardian-mint" /> : null}
            </button>
          ))}
        </aside>

        <div className="min-w-0 flex-1 space-y-5">
          <header className="glass flex flex-col gap-4 rounded-lg p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-guardian-mint">Good morning, Aditya</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white">Your deadline rescue cockpit is active.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Recommended order: Interview Prep, ML Assignment, then Gym. Start before 5 PM to keep projected success above 90%.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg border border-guardian-cyan/30 bg-guardian-cyan/10 px-4 py-2 text-sm font-medium text-guardian-cyan">
                Auto Schedule
              </button>
              <button className="rounded-lg bg-gradient-to-r from-guardian-cyan to-guardian-mint px-4 py-2 text-sm font-semibold text-slate-950">
                Start Focus
              </button>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Stat label="Productivity Score" value={`${profile.productivityScore}%`} hint={`${profile.peakHours} peak focus`} />
            <Stat label="Deadline Risk" value={`${highestRisk.risk}%`} hint={`${highestRisk.name} needs attention`} className="border-guardian-danger/20" />
            <Stat label="Work Remaining" value={`${todayHours.toFixed(1)}h`} hint="Across active tasks" />
            <Stat label="Procrastination" value={`${profile.procrastinationScore}/100`} hint="Improving this week" />
          </section>

          {rescueMode ? <RescueMode /> : null}

          <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <Panel>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">AI Task Intake</h3>
                  <p className="text-sm text-slate-400">Natural language turns into a risk-scored plan.</p>
                </div>
                <Pill tone="cyan">Task Agent</Pill>
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={assistantInput}
                  onChange={(event) => setAssistantInput(event.target.value)}
                  className="min-h-11 flex-1 rounded-lg border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-guardian-cyan/50"
                  placeholder="I have ML assignment due Friday"
                />
                <button
                  onClick={() => addNaturalLanguageTask(assistantInput)}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Parse Task
                </button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <AgentStep icon={<Wand2 size={18} />} label="Extracted" value="Deadline, hours, priority" />
                <AgentStep icon={<Target size={18} />} label="Predicted" value="Miss risk and success odds" />
                <AgentStep icon={<CalendarDays size={18} />} label="Scheduled" value="Best slots by focus profile" />
              </div>
            </Panel>

            <Panel>
              <div className="flex items-center gap-2">
                <MailCheck className="text-guardian-mint" size={20} />
                <h3 className="text-lg font-semibold text-white">Gmail Assignment Detector</h3>
              </div>
              <div className="mt-4 rounded-lg border border-guardian-mint/20 bg-guardian-mint/10 p-4">
                <p className="text-sm font-medium text-guardian-mint">Assignment detected from Gmail</p>
                <p className="mt-2 text-sm text-slate-300">Project Submission: Recommendation System, July 5 at 11:59 PM.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill tone="mint">Task created</Pill>
                  <Pill tone="cyan">Sessions scheduled</Pill>
                  <Pill tone="amber">Calendar pending</Pill>
                </div>
              </div>
            </Panel>
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <Panel>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Priority Queue</h3>
                <Pill tone="cyan">Dynamic scoring</Pill>
              </div>
              <div className="mt-4 space-y-3">
                {sortedTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => selectTask(task.id)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selectedTask.id === task.id ? "border-guardian-cyan/50 bg-guardian-cyan/10" : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{task.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{task.deadline} · {task.estimateHours}h · {task.source}</p>
                      </div>
                      <span className="text-xl font-semibold text-white">{task.priorityScore}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className={riskTone(task.risk)}>{riskLabel(task.risk)} · {task.risk}%</span>
                      <span className="text-slate-400">{task.progress}% done</span>
                    </div>
                    <Progress value={task.progress} className="mt-2" />
                  </button>
                ))}
              </div>
            </Panel>

            <TaskDetail taskId={selectedTask.id} />
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <CalendarPanel />
            <ReminderPanel />
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
            <ProductivityTwin />
            <HabitPanel />
          </section>
        </div>
      </div>
      <VoiceOrb />
    </main>
  );
}

function AgentStep({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
      <div className="flex items-center gap-2 text-guardian-cyan">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{value}</p>
    </div>
  );
}

function RescueMode() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-guardian-danger/30 bg-guardian-danger/10 p-5 shadow-panel"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-guardian-danger/15 text-guardian-danger">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Deadline Rescue Mode</h3>
            <p className="mt-1 text-sm text-slate-300">Interview Prep crossed 70% risk. The scheduler found 5 hours by moving low-value blocks.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill tone="danger">Move Gym</Pill>
          <Pill tone="amber">Reduce Netflix</Pill>
          <Pill tone="mint">Predicted success 94%</Pill>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Stat label="Tonight" value="2h" hint="Available focus time" />
        <Stat label="Tomorrow" value="3h" hint="Recovered schedule" />
        <Stat label="New Plan" value="7-10 PM" hint="ML Assignment + DSA" />
      </div>
    </motion.section>
  );
}

function TaskDetail({ taskId }: { taskId: string }) {
  const task = useGuardianStore((state) => state.tasks.find((item) => item.id === taskId) ?? state.tasks[0]);
  return (
    <Panel>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{task.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{task.category} · {task.deadline}</p>
        </div>
        <Pill tone={task.risk >= 70 ? "danger" : task.risk >= 45 ? "amber" : "mint"}>{task.risk}% miss risk</Pill>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Stat label="Estimate" value={`${task.estimateHours}h`} />
        <Stat label="Difficulty" value={task.difficulty} />
        <Stat label="Priority" value={task.priority} />
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-300">Completion</span>
          <span className="text-white">{task.progress}%</span>
        </div>
        <Progress value={task.progress} />
      </div>
      <div className="mt-5 space-y-3">
        {task.subtasks.map((subtask, index) => (
          <div key={subtask.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-800 text-xs text-slate-300">{index + 1}</span>
                <div>
                  <p className="font-medium text-white">{subtask.title}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {subtask.estimateMinutes} min{subtask.dependency ? ` · after ${subtask.dependency}` : ""}
                  </p>
                </div>
              </div>
              {subtask.progress === 100 ? <CheckCircle2 className="text-guardian-mint" size={20} /> : <Pill tone="neutral">{subtask.priority}</Pill>}
            </div>
            <Progress value={subtask.progress} className="mt-3 h-1.5" />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CalendarPanel() {
  const calendar = useGuardianStore((state) => state.calendar);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const tone = {
    "deep-work": "border-guardian-cyan/30 bg-guardian-cyan/10 text-guardian-cyan",
    meeting: "border-slate-400/20 bg-slate-500/10 text-slate-300",
    habit: "border-guardian-mint/30 bg-guardian-mint/10 text-guardian-mint",
    class: "border-white/10 bg-white/[0.05] text-slate-300",
    rescue: "border-guardian-danger/30 bg-guardian-danger/10 text-guardian-danger"
  };

  return (
    <Panel>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Smart Calendar Scheduler</h3>
        <Pill tone="cyan">Drag-ready weekly view</Pill>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2 overflow-x-auto">
        {days.map((day) => (
          <div key={day} className="min-w-32 rounded-lg border border-white/10 bg-slate-950/30 p-3">
            <p className="text-sm font-medium text-white">{day}</p>
            <div className="mt-3 space-y-2">
              {calendar.filter((block) => block.day === day).map((block) => (
                <div key={block.id} className={`rounded-md border p-2 ${tone[block.type]}`}>
                  <p className="text-xs font-medium">{block.title}</p>
                  <p className="mt-1 text-[11px] opacity-80">{block.start} - {block.end}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ReminderPanel() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <TimerReset className="text-guardian-amber" size={20} />
        <h3 className="text-lg font-semibold text-white">Context-Aware Reminder</h3>
      </div>
      <div className="mt-4 rounded-lg border border-guardian-amber/20 bg-guardian-amber/10 p-4">
        <p className="text-sm text-slate-300">You are free now. ML Assignment needs 45 minutes and is due Friday.</p>
        <p className="mt-3 font-medium text-white">Start EDA session now?</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["Start Timer", "Snooze", "Reschedule", "Ignore"].map((action) => (
            <button key={action} className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-200">
              {action}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">Ignored reminders increase intensity and raise the procrastination feature weight in future schedules.</p>
    </Panel>
  );
}

function ProductivityTwin() {
  const profile = useGuardianStore((state) => state.profile);
  return (
    <Panel>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Productivity Twin</h3>
        <Pill tone="mint">Learning Agent</Pill>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Stat label="Peak Focus" value={profile.peakHours} />
        <Stat label="Avg Session" value={`${profile.focusDuration}m`} />
      </div>
      <div className="mt-5 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={focusData}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 8 }} />
            <Area type="monotone" dataKey="focus" stroke="#44D7F6" fill="rgba(68,215,246,0.18)" />
            <Line type="monotone" dataKey="delay" stroke="#FF6B7A" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1">
        {heatmap.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="aspect-square rounded"
            style={{ backgroundColor: `rgba(68, 215, 246, ${0.12 + value / 130})` }}
            title={`Focus score ${value}`}
          />
        ))}
      </div>
    </Panel>
  );
}

function HabitPanel() {
  const habits = useGuardianStore((state) => state.habits);
  return (
    <Panel>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Habit Tracking</h3>
        <Pill tone="cyan">Adaptive coaching</Pill>
      </div>
      <div className="mt-4 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={habits}>
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,0.2)", borderRadius: 8 }} />
            <Bar dataKey="completion" radius={[6, 6, 0, 0]}>
              {habits.map((habit) => (
                <Cell key={habit.id} fill={habit.completion > 75 ? "#7CF8CF" : habit.completion > 60 ? "#44D7F6" : "#F9C86A"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-3">
        {habits.map((habit) => (
          <div key={habit.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-white">{habit.name}</p>
              <span className="flex items-center gap-1 text-sm text-guardian-amber"><Flame size={15} /> {habit.streak}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{habit.insight}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function VoiceOrb() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-5 right-5 z-20 w-[min(25rem,calc(100vw-2.5rem))] rounded-lg border border-guardian-cyan/30 bg-slate-950/85 p-4 shadow-glow backdrop-blur-xl"
    >
      <div className="flex items-start gap-3">
        <button className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-guardian-cyan to-guardian-mint text-slate-950">
          <Mic size={22} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Bot size={16} className="text-guardian-cyan" />
            <p className="text-sm font-medium text-white">Voice Assistant</p>
            <Sparkles size={14} className="text-guardian-mint" />
          </div>
          <p className="mt-1 text-sm leading-5 text-slate-300">
            “You have Interview Prep due tomorrow. Recommended: 45 minute session. Start?”
          </p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-950">Start</button>
            <button className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-200">
              Ask why <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
