from datetime import datetime, timedelta


class GoogleCalendarClient:
    """Google Calendar adapter placeholder. Swap mock methods with OAuth-backed API calls."""

    def find_free_slots(self) -> list[dict]:
        now = datetime.now().replace(minute=0, second=0, microsecond=0)
        return [
            {"start": (now + timedelta(hours=2)).isoformat(), "end": (now + timedelta(hours=3)).isoformat(), "confidence": 0.91},
            {"start": (now + timedelta(hours=5)).isoformat(), "end": (now + timedelta(hours=6)).isoformat(), "confidence": 0.84},
            {"start": (now + timedelta(days=1, hours=1)).isoformat(), "end": (now + timedelta(days=1, hours=2)).isoformat(), "confidence": 0.88},
        ]

    def create_event(self, title: str, start: str, end: str) -> dict:
        return {"provider": "google_calendar", "status": "queued", "title": title, "start": start, "end": end}
