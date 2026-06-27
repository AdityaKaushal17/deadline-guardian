from fastapi import APIRouter
from backend.agents.learning_agent import LearningAgent
from backend.agents.orchestrator import GuardianOrchestrator
from backend.agents.reminder_agent import ReminderAgent
from backend.agents.voice_agent import VoiceAgent
from backend.calendar.google_calendar import GoogleCalendarClient
from backend.gmail.assignment_detector import GmailAssignmentDetector
from backend.schemas.tasks import TaskCreate, TaskPlan

router = APIRouter()
orchestrator = GuardianOrchestrator()


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "Deadline Guardian AI"}


@router.post("/tasks/understand", response_model=TaskPlan)
def understand_task(payload: TaskCreate) -> TaskPlan:
    return orchestrator.create_task_plan(payload.text)


@router.get("/standup")
def daily_standup():
    return orchestrator.daily_standup()


@router.get("/productivity-twin")
def productivity_twin():
    return LearningAgent().productivity_twin()


@router.post("/reminders/contextual")
def contextual_reminder(task_name: str, minutes_needed: int = 45, deadline_label: str = "tomorrow", ignored_count: int = 0):
    return ReminderAgent().create_contextual_reminder(task_name, minutes_needed, deadline_label, ignored_count)


@router.post("/voice/ask")
def voice_ask(query: str):
    return VoiceAgent().answer(query)


@router.post("/gmail/detect-assignment")
def detect_assignment(subject: str, body: str):
    return GmailAssignmentDetector().detect(subject=subject, body=body)


@router.get("/calendar/free-slots")
def free_slots():
    return GoogleCalendarClient().find_free_slots()
