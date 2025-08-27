import { API_URL } from "./api";

export async function fetchMatchesApi(): Promise<any[]> {
  try {
    const res = await fetch(`${API_URL}/api/matches`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener partidas", error);
    return [];
  }
}
