"use client";

import { create } from "zustand";
import type { CalendarBlock, Habit, ProductivityProfile, Task } from "@/lib/types";

const initialTasks: Task[] = [
  {
    id: "task-ml",
    name: "ML Assignment",
    category: "Assignment",
    deadline: "Friday 11:59 PM",
    estimateHours: 5,
    difficulty: "Medium",
    priority: "High",
    progress: 38,
    risk: 63,
    priorityScore: 89,
    source: "Text",
    subtasks: [
      { id: "ml-1", title: "Dataset cleaning", estimateMinutes: 50, priority: "High", progress: 100 },
      { id: "ml-2", title: "Exploratory data analysis", estimateMinutes: 60, priority: "High", progress: 45 },
      { id: "ml-3", title: "Model training", estimateMinutes: 90, dependency: "Exploratory data analysis", priority: "High", progress: 10 },
      { id: "ml-4", title: "Evaluation", estimateMinutes: 45, dependency: "Model training", priority: "Medium", progress: 0 },
      { id: "ml-5", title: "Report writing", estimateMinutes: 55, dependency: "Evaluation", priority: "High", progress: 0 }
    ]
  },
  {
    id: "task-interview",
    name: "Interview Prep",
    category: "Placement",
    deadline: "Tomorrow 10:00 AM",
    estimateHours: 3,
    difficulty: "High",
    priority: "Critical",
    progress: 22,
    risk: 78,
    priorityScore: 97,
    source: "Calendar",
    subtasks: [
      { id: "ip-1", title: "Dynamic programming revision", estimateMinutes: 45, priority: "Critical", progress: 30 },
      { id: "ip-2", title: "System design notes", estimateMinutes: 50, priority: "High", progress: 15 },
      { id: "ip-3", title: "Mock interview", estimateMinutes: 60, priority: "Critical", progress: 0 }
    ]
  },
  {
    id: "task-rec",
    name: "Recommendation System",
    category: "Project",
    deadline: "July 5 11:59 PM",
    estimateHours: 14,
    difficulty: "High",
    priority: "High",
    progress: 18,
    risk: 42,
    priorityScore: 76,
    source: "Gmail",
    subtasks: [
      { id: "rec-1", title: "Collect dataset", estimateMinutes: 60, priority: "High", progress: 100 },
      { id: "rec-2", title: "Clean dataset", estimateMinutes: 90, priority: "High", progress: 45 },
      { id: "rec-3", title: "Build user-item matrix", estimateMinutes: 120, priority: "High", progress: 0 },
      { id: "rec-4", title: "Matrix factorization", estimateMinutes: 180, dependency: "Build user-item matrix", priority: "Critical", progress: 0 },
      { id: "rec-5", title: "Dashboard and docs", estimateMinutes: 150, dependency: "Matrix factorization", priority: "Medium", progress: 0 }
    ]
  }
];

const initialCalendar: CalendarBlock[] = [
  { id: "c1", title: "Classes", day: "Mon", start: "09:00", end: "15:00", type: "class" },
  { id: "c2", title: "Interview Prep", day: "Mon", start: "17:00", end: "17:45", type: "rescue" },
  { id: "c3", title: "ML Assignment: EDA", day: "Mon", start: "18:00", end: "19:00", type: "deep-work" },
  { id: "c4", title: "Gym", day: "Mon", start: "19:15", end: "20:00", type: "habit" },
  { id: "c5", title: "Model Training", day: "Mon", start: "20:15", end: "21:15", type: "deep-work" },
  { id: "c6", title: "Team Sync", day: "Tue", start: "10:00", end: "11:00", type: "meeting" },
  { id: "c7", title: "Mock Interview", day: "Tue", start: "07:30", end: "08:30", type: "rescue" }
];

const initialHabits: Habit[] = [
  { id: "gym", name: "Gym", streak: 4, longest: 14, completion: 71, insight: "You skip gym mostly on Thursdays. Friday evening is more reliable." },
  { id: "coding", name: "Coding", streak: 8, longest: 21, completion: 84, insight: "Coding sessions before 7 PM finish 32% more often." },
  { id: "sleep", name: "Sleep", streak: 3, longest: 11, completion: 66, insight: "Late-night work increases missed morning sessions by 18%." },
  { id: "reading", name: "Reading", streak: 2, longest: 9, completion: 49, insight: "Reading performs best as a low-energy 25 minute block." }
];

const profile: ProductivityProfile = {
  productivityScore: 82,
  procrastinationScore: 37,
  peakHours: "8 AM - 11 AM",
  worstHours: "10 PM - 12 AM",
  focusDuration: 53,
  bestTasks: ["Coding", "Problem solving", "Writing"],
  worstTasks: ["Long reading", "Admin work"]
};

interface GuardianStore {
  tasks: Task[];
  calendar: CalendarBlock[];
  habits: Habit[];
  profile: ProductivityProfile;
  rescueMode: boolean;
  selectedTaskId: string;
  assistantInput: string;
  setAssistantInput: (value: string) => void;
  selectTask: (id: string) => void;
  activateRescueMode: () => void;
  addNaturalLanguageTask: (input: string) => void;
}

export const useGuardianStore = create<GuardianStore>((set, get) => ({
  tasks: initialTasks,
  calendar: initialCalendar,
  habits: initialHabits,
  profile,
  rescueMode: true,
  selectedTaskId: "task-interview",
  assistantInput: "I have ML assignment due Friday",
  setAssistantInput: (value) => set({ assistantInput: value }),
  selectTask: (id) => set({ selectedTaskId: id }),
  activateRescueMode: () => set({ rescueMode: true }),
  addNaturalLanguageTask: (input) => {
    const id = `task-${Date.now()}`;
    const task: Task = {
      id,
      name: input.replace(/^(i have|submit|finish|prepare)\s+/i, "").replace(/\s+(due|by|next|tomorrow).*/i, "") || "New AI Task",
      category: /exam|interview|dsa/i.test(input) ? "Preparation" : /assignment|project/i.test(input) ? "Assignment" : "General",
      deadline: /tomorrow/i.test(input) ? "Tomorrow 11:59 PM" : /friday/i.test(input) ? "Friday 11:59 PM" : "Next Monday 11:59 PM",
      estimateHours: /project|system/i.test(input) ? 8 : 5,
      difficulty: /exam|interview|project|system/i.test(input) ? "High" : "Medium",
      priority: /tomorrow|interview|exam/i.test(input) ? "Critical" : "High",
      progress: 0,
      risk: /tomorrow/i.test(input) ? 74 : 46,
      priorityScore: /tomorrow/i.test(input) ? 92 : 81,
      source: "Text",
      subtasks: [
        { id: `${id}-1`, title: "Clarify requirements", estimateMinutes: 30, priority: "High", progress: 0 },
        { id: `${id}-2`, title: "First focused work block", estimateMinutes: 60, priority: "High", progress: 0 },
        { id: `${id}-3`, title: "Review and submit", estimateMinutes: 45, priority: "Medium", progress: 0 }
      ]
    };
    set({ tasks: [task, ...get().tasks], selectedTaskId: id, assistantInput: input, rescueMode: task.risk > 70 || get().rescueMode });
  }
}));
