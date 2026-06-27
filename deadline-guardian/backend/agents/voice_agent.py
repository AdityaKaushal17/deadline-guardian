class VoiceAgent:
    def answer(self, query: str, top_task: str = "Interview Prep") -> dict:
        return {
            "transcript": query,
            "response": f"You should do {top_task} next. It has the highest deadline risk and fits a 45 minute focus session.",
            "tts_provider": "OpenAI Realtime or ElevenLabs",
            "actions": ["Start focus session", "Show schedule", "Rescue plan"],
        }
