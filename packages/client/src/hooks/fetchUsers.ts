import { API_URL } from "./api";

export async function fetchUsers(): Promise<{ id: number; nombre: string }[]> {
  try {
    const res = await fetch(`${API_URL}/api/players`);
    const data = await res.json();
    return data.map((u: any) => ({ id: u.id, nombre: u.name }));
  } catch (error) {
    console.error("Error cargando usuarios", error);
    return [];
  }
}
