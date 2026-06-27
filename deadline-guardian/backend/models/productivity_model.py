class ProductivityModel:
    def predict_score(self, focus_minutes: int, completed_sessions: int, missed_sessions: int) -> float:
        raw = 55 + completed_sessions * 4 + min(focus_minutes / 20, 20) - missed_sessions * 7
        return round(max(0, min(100, raw)), 1)
