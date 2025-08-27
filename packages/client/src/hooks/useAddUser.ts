import { API_URL } from "./api";

export async function addUser(name: string) {
  const res = await fetch(`${API_URL}/api/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Error al añadir usuario");
  return await res.json();
}
