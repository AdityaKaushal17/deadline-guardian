class ReminderAgent:
    def create_contextual_reminder(self, task_name: str, minutes_needed: int, deadline_label: str, ignored_count: int = 0) -> dict:
        intensity = min(5, 1 + ignored_count)
        return {
            "message": f"You are free now. {task_name} needs {minutes_needed} minutes and is due {deadline_label}. Start now?",
            "actions": ["Start Timer", "Snooze", "Reschedule", "Ignore"],
            "intensity": intensity,
        }
