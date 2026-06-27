from datetime import datetime
from backend.ml.risk_predictor import DeadlineRiskPredictor
from backend.schemas.tasks import RiskPrediction, TaskUnderstanding


class RiskPredictionAgent:
    def __init__(self) -> None:
        self.model = DeadlineRiskPredictor()

    def predict(
        self,
        task: TaskUnderstanding,
        completion_percent: float = 0,
        calendar_occupancy: float = 0.58,
        past_delay_score: float = 0.35,
        productivity_score: float = 0.82,
    ) -> RiskPrediction:
        remaining_days = max((task.deadline - datetime.now()).total_seconds() / 86400, 0.1)
        probability = self.model.predict_probability(
            remaining_days=remaining_days,
            estimated_hours=task.estimated_hours,
            calendar_occupancy=calendar_occupancy,
            completion_percent=completion_percent,
            difficulty=task.difficulty,
            past_delay_score=past_delay_score,
            productivity_score=productivity_score,
        )
        status = "HIGH RISK" if probability >= 70 else "WATCH" if probability >= 45 else "ON TRACK"
        return RiskPrediction(
            probability=round(probability, 1),
            status=status,
            factors={
                "remaining_days": round(remaining_days, 2),
                "calendar_occupancy": calendar_occupancy,
                "past_delay_score": past_delay_score,
                "productivity_score": productivity_score,
            },
        )
