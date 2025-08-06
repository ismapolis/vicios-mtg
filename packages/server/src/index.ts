import express from "express";
import cors from "cors";
import { join } from "path";

import playersRouter from "./routes/players";

import { App_Name } from "@my-app/common";

const clientPath = "../../client/build";
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json()); // Para poder leer JSON en body

// Sirve archivos estáticos
app.use(express.static(join(__dirname, clientPath)));

// API básica
app.get("/api", (req, res) => {
  res.send(`Hello ${App_Name}, From server`);
});

// Usa el router modular para /api/players
app.use("/api/players", playersRouter);

// Ruta catch-all para servir index.html (React SPA)
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

// Levanta servidor
app.listen(port, () => {
  console.log(`app ${App_Name} started at http://localhost:${port}`);
});
