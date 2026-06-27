from datetime import datetime, timedelta
from backend.schemas.tasks import SubtaskOut, TaskUnderstanding


class SchedulerAgent:
    def schedule(self, task: TaskUnderstanding, subtasks: list[SubtaskOut]) -> list[dict]:
        start = datetime.now().replace(hour=17, minute=0, second=0, microsecond=0)
        if start < datetime.now():
            start = start + timedelta(days=1)
        blocks: list[dict] = []
        cursor = start
        for subtask in subtasks[:4]:
            duration = min(max(subtask.estimated_minutes, 30), 90)
            end = cursor + timedelta(minutes=duration)
            blocks.append(
                {
                    "title": f"{task.task_name}: {subtask.title}",
                    "start": cursor.isoformat(),
                    "end": end.isoformat(),
                    "type": "deep-work",
                    "confidence": 0.86,
                }
            )
            cursor = end + timedelta(minutes=15)
        return blocks

    def rescue_plan(self, task: TaskUnderstanding, risk_probability: float) -> dict | None:
        if risk_probability < 70:
            return None
        return {
            "mode": "DEADLINE_RESCUE",
            "remaining_work_hours": task.estimated_hours,
            "available": {"tonight_hours": 2, "tomorrow_hours": 3},
            "sacrifices": ["Move Gym", "Reduce Netflix", "Postpone Movie"],
            "new_plan": [
                {"time": "7 PM - 9 PM", "task": task.task_name},
                {"time": "9 PM - 10 PM", "task": "DSA"},
            ],
            "predicted_success": 94,
        }
