import { API_URL } from "./api";

export async function registerMatch(players: any[]) {
  const res = await fetch(`${API_URL}/api/matches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(players),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error al registrar la partida");
  }
  return await res.json();
}
