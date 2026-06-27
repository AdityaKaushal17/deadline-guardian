from datetime import datetime
from pydantic import BaseModel, Field


class SubtaskOut(BaseModel):
    title: str
    estimated_minutes: int
    dependency: str | None = None
    priority: str
    progress: float = 0


class TaskCreate(BaseModel):
    text: str = Field(min_length=3, examples=["I have ML assignment due Friday"])


class TaskUnderstanding(BaseModel):
    task_name: str
    deadline: datetime
    estimated_hours: float
    difficulty: str
    priority: str
    category: str


class RiskPrediction(BaseModel):
    probability: float
    status: str
    factors: dict[str, float | str]


class TaskPlan(BaseModel):
    understanding: TaskUnderstanding
    risk: RiskPrediction
    subtasks: list[SubtaskOut]
    priority_score: float
    schedule: list[dict]
    rescue_mode: dict | None = None


class StandupOut(BaseModel):
    greeting: str
    focus_order: list[str]
    total_estimated_hours: float
    risks: list[str]
    suggestion: str
