import { PlayerData } from "../pages/registerMatch/RegisterMatch";

// Valida los datos de la partida antes de registrar
export function validateMatch(players: PlayerData[]): string | null {
  // Validación: no campos vacíos
  for (const p of players) {
    if (!p.name.trim() || !p.commander.trim()) {
      return "Todos los jugadores deben tener nombre y comandante.";
    }
  }

  // Validación: nombres únicos
  const nombres = players.map((p) => p.name.trim().toLowerCase());
  const nombresSet = new Set(nombres);
  if (nombres.length !== nombresSet.size) {
    return "No puede haber jugadores con el mismo nombre.";
  }

  // Validación: al menos un ganador
  const isWinner = players.some((p) => p.winner);
  if (!isWinner) {
    return "Debe haber al menos un ganador.";
  }

  // Si todo OK, retorna null
  return null;
}
