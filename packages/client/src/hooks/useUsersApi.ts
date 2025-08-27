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

export async function addUser(name: string) {
  const res = await fetch(`${API_URL}/api/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Error al añadir usuario");
  return await res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${API_URL}/api/players/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al borrar usuario");
  return true;
}

export async function updateUser(id: number, name: string) {
  const res = await fetch(`${API_URL}/api/players/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Error al guardar usuario");
  return await res.json();
}
