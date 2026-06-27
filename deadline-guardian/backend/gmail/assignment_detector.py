import re
from backend.agents.orchestrator import GuardianOrchestrator


class GmailAssignmentDetector:
    def detect(self, subject: str, body: str) -> dict:
        text = f"{subject}\n{body}"
        has_assignment = bool(re.search(r"assignment|project|submission|due|deadline", text, re.I))
        if not has_assignment:
            return {"detected": False, "reason": "No deadline language found."}
        plan = GuardianOrchestrator().create_task_plan(text)
        return {
            "detected": True,
            "message": "Assignment detected from Gmail",
            "task": plan.understanding.model_dump(),
            "risk": plan.risk.model_dump(),
            "schedule": plan.schedule,
            "calendar_action": "pending_user_approval",
        }
