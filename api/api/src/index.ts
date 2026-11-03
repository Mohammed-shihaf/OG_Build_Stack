import { app } from "./app.js";

const port = Number(process.env.PORT ?? 5125);

app.listen(port, () => {
  console.log(`Now listening on: http://localhost:${port}`);
});
