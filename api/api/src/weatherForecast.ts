export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
}

export function createForecast(date: Date, temperatureC: number, summary: string | null): WeatherForecast {
  return {
    date: date.toISOString().slice(0, 10),
    temperatureC,
    temperatureF: 32 + Math.trunc(temperatureC / 0.5556),
    summary,
  };
}
