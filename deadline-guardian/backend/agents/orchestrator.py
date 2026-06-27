from backend.agents.decomposer_agent import TaskDecomposerAgent
from backend.agents.learning_agent import LearningAgent
from backend.agents.priority_agent import PriorityAgent
from backend.agents.risk_agent import RiskPredictionAgent
from backend.agents.scheduler_agent import SchedulerAgent
from backend.agents.task_agent import TaskAgent
from backend.schemas.tasks import StandupOut, TaskPlan


class GuardianOrchestrator:
    """LangGraph-ready orchestration boundary for independent productivity agents."""

    def __init__(self) -> None:
        self.task_agent = TaskAgent()
        self.decomposer = TaskDecomposerAgent()
        self.priority = PriorityAgent()
        self.risk = RiskPredictionAgent()
        self.scheduler = SchedulerAgent()
        self.learning = LearningAgent()

    def create_task_plan(self, text: str) -> TaskPlan:
        understanding = self.task_agent.understand(text)
        subtasks = self.decomposer.decompose(understanding)
        risk = self.risk.predict(understanding)
        priority_score = self.priority.score(understanding)
        schedule = self.scheduler.schedule(understanding, subtasks)
        rescue_mode = self.scheduler.rescue_plan(understanding, risk.probability)
        return TaskPlan(
            understanding=understanding,
            risk=risk,
            subtasks=subtasks,
            priority_score=priority_score,
            schedule=schedule,
            rescue_mode=rescue_mode,
        )

    def daily_standup(self) -> StandupOut:
        return StandupOut(
            greeting="Good morning. You have 3 important tasks and 5 hours of focused work today.",
            focus_order=["DSA", "ML Project", "Gym"],
            total_estimated_hours=5,
            risks=["ML Project deadline approaching", "Interview Prep is high risk"],
            suggestion="Start by 5 PM to keep projected success above 90%.",
        )
