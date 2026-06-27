from datetime import datetime
from backend.schemas.tasks import TaskUnderstanding


class PriorityAgent:
    def score(self, task: TaskUnderstanding, procrastination_score: float = 35, importance: float = 80) -> float:
        hours_until_deadline = max((task.deadline - datetime.now()).total_seconds() / 3600, 1)
        urgency = min(40, 120 / hours_until_deadline * 10)
        difficulty_weight = {"Low": 5, "Medium": 12, "High": 18}.get(task.difficulty, 12)
        effort_weight = min(task.estimated_hours * 2.5, 20)
        priority_weight = {"Low": 5, "Medium": 12, "High": 20, "Critical": 28}.get(task.priority, 12)
        procrastination_weight = procrastination_score * 0.12
        return round(min(100, urgency + importance * 0.18 + difficulty_weight + effort_weight + priority_weight + procrastination_weight), 1)
