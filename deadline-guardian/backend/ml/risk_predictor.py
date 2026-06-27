import math


class DeadlineRiskPredictor:
    """Production slot for XGBoost/RandomForest. Uses calibrated heuristic until trained artifact exists."""

    difficulty_map = {"Low": 0.15, "Medium": 0.32, "High": 0.52}

    def predict_probability(
        self,
        remaining_days: float,
        estimated_hours: float,
        calendar_occupancy: float,
        completion_percent: float,
        difficulty: str,
        past_delay_score: float,
        productivity_score: float,
    ) -> float:
        work_pressure = estimated_hours / max(remaining_days * 3.0, 0.5)
        completion_gap = 1 - completion_percent / 100
        z = (
            1.4 * work_pressure
            + 1.8 * calendar_occupancy
            + 1.5 * completion_gap
            + 1.2 * self.difficulty_map.get(difficulty, 0.32)
            + 1.4 * past_delay_score
            - 1.7 * productivity_score
            - 1.1
        )
        return 100 / (1 + math.exp(-z))
