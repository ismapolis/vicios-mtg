import express from "express";
import cors from "cors";

import playersRouter from "./routes/players";
import matchesRouter from "./routes/matches";

import { App_Name } from "@vicios-mtg/common";
import { testPrisma } from "./testPrisma";

(async () => {
  await testPrisma();
})();

const app = express();

// Puerto configurable vía variables de entorno
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const nodeEnv = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.json());

// API básica
app.get("/api", (_req, res) => {
  res.send(`Hello ${App_Name}, From server [${nodeEnv}]`);
});

// Rutas de la API
app.use("/api/players", playersRouter);
app.use("/api/matches", matchesRouter);

// Levanta servidor
app.listen(port, () => {
  console.log(
    `Server ${App_Name} running at http://localhost:${port} [${nodeEnv}]`
  );
});
