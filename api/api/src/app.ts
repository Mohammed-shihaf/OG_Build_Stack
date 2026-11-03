import express, { type ErrorRequestHandler } from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BadRequestError, NotFoundError, PurchasingService } from "./purchasingService.js";
import { purchasingRoutes } from "./routes/purchasingRoutes.js";

const defaultUiDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../app/build");

export function createApp(service = new PurchasingService(), uiDir = process.env.UI_DIR ?? defaultUiDir) {
  const app = express();
  app.use(express.json());
  app.use("/api", purchasingRoutes(service));

  if (existsSync(uiDir)) {
    app.use(express.static(uiDir));
    app.get(/^(?!\/api\/).*/, (_req, res) => {
      res.sendFile(path.join(uiDir, "index.html"));
    });
  }

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: err.message });
    } else if (err instanceof BadRequestError) {
      res.status(400).json({ error: err.message });
    } else if (err?.type === "entity.parse.failed") {
      res.status(400).json({ error: "Request body must be valid JSON" });
    } else {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  app.use(errorHandler);

  return app;
}
