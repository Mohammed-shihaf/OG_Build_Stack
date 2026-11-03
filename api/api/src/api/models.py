from datetime import date

from pydantic import BaseModel, computed_field


class WeatherForecast(BaseModel):
    date: date
    temperatureC: int
    summary: str | None = None

    @computed_field
    @property
    def temperatureF(self) -> int:
        return 32 + int(self.temperatureC / 0.5556)
