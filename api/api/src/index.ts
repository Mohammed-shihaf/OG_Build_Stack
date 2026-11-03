import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 5125);

createApp().listen(port, () => {
  console.log(`Purchasing API listening on http://localhost:${port}`);
});
