import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
const router = Router();

// Obtener todas las partidas (con participaciones y jugadores)
router.get("/", async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      include: {
        participations: {
          include: { player: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener partidas" });
  }
});

// Crear nueva partida con participaciones
router.post("/", async (req, res) => {
  // Espera un array de participaciones: [{ name, commander, winner }]
  const participationsRaw = req.body;
  if (
    !participationsRaw ||
    !Array.isArray(participationsRaw) ||
    participationsRaw.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Las participaciones son obligatorias" });
  }

  try {
    // Busca los jugadores por nombre y obtiene sus IDs
    const participations: {
      playerId: number;
      commander: any;
      isWinner: boolean;
    }[] = [];
    for (const p of participationsRaw) {
      const player = await prisma.player.findUnique({
        where: { name: p.name },
      });
      if (!player) {
        return res
          .status(400)
          .json({ error: `Jugador no encontrado: ${p.name}` });
      }
      participations.push({
        playerId: player.id,
        commander: p.commander,
        isWinner: !!p.winner,
      });
    }

    // Crea la partida con las participaciones
    const match = await prisma.match.create({
      data: {
        participations: {
          create: participations,
        },
      },
      include: {
        participations: {
          include: { player: true },
        },
      },
    });

    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: "Error al crear partida" });
  }
});

export default router;
