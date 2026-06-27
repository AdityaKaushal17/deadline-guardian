from datetime import datetime, timedelta
from dateutil.parser import parse
from backend.schemas.tasks import TaskUnderstanding


class TaskAgent:
    """Extracts structured task details from natural language or integration text."""

    def understand(self, text: str, now: datetime | None = None) -> TaskUnderstanding:
        now = now or datetime.now()
        lowered = text.lower()
        deadline = self._deadline_from_text(lowered, now)
        category = self._category(lowered)
        difficulty = "High" if any(word in lowered for word in ["exam", "interview", "project", "system"]) else "Medium"
        estimated_hours = 8 if any(word in lowered for word in ["project", "system", "build"]) else 5
        priority = "Critical" if any(word in lowered for word in ["tomorrow", "interview", "exam"]) else "High"
        name = self._task_name(text)
        return TaskUnderstanding(
            task_name=name,
            deadline=deadline,
            estimated_hours=estimated_hours,
            difficulty=difficulty,
            priority=priority,
            category=category,
        )

    def _deadline_from_text(self, text: str, now: datetime) -> datetime:
        if "tomorrow" in text:
            return (now + timedelta(days=1)).replace(hour=23, minute=59, second=0, microsecond=0)
        if "friday" in text:
            days_ahead = (4 - now.weekday()) % 7 or 7
            return (now + timedelta(days=days_ahead)).replace(hour=23, minute=59, second=0, microsecond=0)
        if "next monday" in text:
            days_ahead = (7 - now.weekday()) % 7 or 7
            return (now + timedelta(days=days_ahead)).replace(hour=23, minute=59, second=0, microsecond=0)
        try:
            return parse(text, fuzzy=True, default=now.replace(hour=23, minute=59, second=0, microsecond=0))
        except Exception:
            return (now + timedelta(days=3)).replace(hour=23, minute=59, second=0, microsecond=0)

    def _category(self, text: str) -> str:
        if any(word in text for word in ["assignment", "submit"]):
            return "Assignment"
        if any(word in text for word in ["exam", "dsa", "interview"]):
            return "Preparation"
        if any(word in text for word in ["launch", "investor", "campaign"]):
            return "Entrepreneurship"
        return "General"

    def _task_name(self, text: str) -> str:
        cleaned = text.strip()
        for prefix in ["I have ", "i have ", "Submit ", "submit ", "Finish ", "finish ", "Prepare ", "prepare "]:
            cleaned = cleaned.removeprefix(prefix)
        for marker in [" due ", " by ", " next ", " tomorrow"]:
            if marker in cleaned.lower():
                index = cleaned.lower().find(marker)
                cleaned = cleaned[:index]
                break
        return cleaned.strip().title() or "New Task"
