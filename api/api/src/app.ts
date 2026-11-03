import express from "express";
import { weatherForecastRouter } from "./controllers/weatherForecastController.js";

export const app = express();

app.use("/weatherforecast", weatherForecastRouter);
