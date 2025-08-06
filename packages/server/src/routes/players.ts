import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
const router = Router();

// Obtener todos los jugadores
router.get("/", async (req, res) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener jugadores" });
  }
});

// Crear nuevo jugador
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "El nombre es obligatorio" });

  try {
    const newPlayer = await prisma.player.create({ data: { name } });
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: "Error al crear jugador" });
  }
});

// Actualizar jugador
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "El nombre es obligatorio" });

  try {
    const updatedPlayer = await prisma.player.update({
      where: { id },
      data: { name },
    });
    res.json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar jugador" });
  }
});

// Borrar jugador
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.player.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al borrar jugador" });
  }
});

export default router;
