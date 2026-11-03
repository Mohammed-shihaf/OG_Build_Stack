import { Router } from "express";
import { createForecast, type WeatherForecast } from "../weatherForecast.js";

const summaries = [
  "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching",
];

const randomInt = (min: number, max: number) => min + Math.floor(Math.random() * (max - min));

export const weatherForecastRouter = Router();

weatherForecastRouter.get("/", (_req, res) => {
  const forecasts: WeatherForecast[] = [1, 2, 3, 4, 5].map((index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return createForecast(date, randomInt(-20, 55), summaries[randomInt(0, summaries.length)]);
  });
  res.json(forecasts);
});
