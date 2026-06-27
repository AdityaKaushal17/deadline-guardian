export type Difficulty = "Low" | "Medium" | "High";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Subtask {
  id: string;
  title: string;
  estimateMinutes: number;
  dependency?: string;
  priority: Priority;
  progress: number;
}

export interface Task {
  id: string;
  name: string;
  category: string;
  deadline: string;
  estimateHours: number;
  difficulty: Difficulty;
  priority: Priority;
  progress: number;
  risk: number;
  priorityScore: number;
  source: "Text" | "Voice" | "Gmail" | "Calendar";
  subtasks: Subtask[];
}

export interface CalendarBlock {
  id: string;
  title: string;
  day: string;
  start: string;
  end: string;
  type: "deep-work" | "meeting" | "habit" | "class" | "rescue";
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  longest: number;
  completion: number;
  insight: string;
}

export interface ProductivityProfile {
  productivityScore: number;
  procrastinationScore: number;
  peakHours: string;
  worstHours: string;
  focusDuration: number;
  bestTasks: string[];
  worstTasks: string[];
}
