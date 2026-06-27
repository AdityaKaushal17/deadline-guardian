# Architecture

## Product Loop

1. User submits a task through text, voice, Gmail, or calendar.
2. Task Agent extracts structured task details.
3. Task Decomposer breaks the goal into dependency-aware subtasks.
4. Risk Prediction Agent estimates missed-deadline probability.
5. Priority Agent computes a dynamic priority score.
6. Scheduler Agent finds high-probability focus slots.
7. Reminder Agent creates context-aware reminders.
8. Learning Agent updates the productivity twin.
9. Rescue Agent replans when risk exceeds 70%.

## Backend Modules

- `backend/agents`: independent agent classes and orchestration boundary.
- `backend/ml`: deadline risk prediction model slot.
- `backend/database`: SQLAlchemy base, session, and data models.
- `backend/api`: FastAPI route layer.
- `backend/gmail`: Gmail assignment detection adapter.
- `backend/calendar`: Google Calendar scheduling adapter.
- `backend/prompts`: production prompt templates.

## Frontend Modules

- `frontend/app`: Next.js app router entry points.
- `frontend/components`: dashboard and UI primitives.
- `frontend/store`: Zustand state for the interactive demo.
- `frontend/lib`: shared types and helpers.

## Data Model

The schema supports the requested core tables:

- users
- tasks
- subtasks
- habits
- calendar_events
- risk_scores
- focus_sessions
- notifications
- productivity_profiles
- gmail_messages

## ML Strategy

The current predictor uses a calibrated logistic heuristic so the product is runnable without model artifacts. Replace it with an XGBoost or Random Forest pipeline trained on synthetic productivity records, then retrain from real user outcomes after consented telemetry exists.
