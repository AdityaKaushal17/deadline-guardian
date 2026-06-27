# Deadline Guardian AI

An AI productivity companion that predicts missed deadlines before they happen and actively helps users complete tasks.

Deadline Guardian AI is a production-oriented scaffold for an AI Chief of Staff: it understands natural-language tasks, predicts deadline risk, decomposes goals, schedules focus sessions, adapts to productivity habits, detects assignment emails, and activates Deadline Rescue Mode when work is likely to slip.

## What Is Included

- Next.js 15 + TypeScript dashboard with dark glassmorphism UI
- AI task intake, priority queue, risk cards, rescue mode, scheduler, reminders, habits, productivity twin, and voice assistant shell
- FastAPI backend with structured agent orchestration
- SQLAlchemy models for users, tasks, subtasks, habits, calendar events, risk scores, focus sessions, notifications, productivity profiles, and Gmail messages
- Deterministic local risk predictor with an XGBoost/Random Forest replacement point
- Gmail and Google Calendar adapter stubs
- Prompt files for task understanding, scheduling, and rescue planning

## Run Frontend

```bash
cd deadline-guardian/frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run Backend

```bash
cd deadline-guardian
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

Open `http://localhost:8000/docs`.

## Key API Routes

- `POST /api/v1/tasks/understand`
- `GET /api/v1/standup`
- `GET /api/v1/productivity-twin`
- `POST /api/v1/reminders/contextual`
- `POST /api/v1/voice/ask`
- `POST /api/v1/gmail/detect-assignment`
- `GET /api/v1/calendar/free-slots`

## Next Production Steps

- Replace heuristic agents with LangGraph nodes backed by OpenAI GPT-5 tool calls.
- Train `DeadlineRiskPredictor` on real or synthetic productivity data and persist model artifacts.
- Add OAuth for Gmail and Google Calendar.
- Add JWT auth flows and tenant-safe data access.
- Add Celery workers for reminders, calendar sync, daily standups, and rescue-mode monitors.
- Add push notification providers and voice streaming.
