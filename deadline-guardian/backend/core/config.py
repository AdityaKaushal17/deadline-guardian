from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Deadline Guardian AI"
    api_prefix: str = "/api/v1"
    database_url: str = "sqlite:///./deadline_guardian.db"
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: str = "change-me-in-production"
    openai_api_key: str | None = None
    google_client_id: str | None = None
    google_client_secret: str | None = None
    elevenlabs_api_key: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    return Settings()
