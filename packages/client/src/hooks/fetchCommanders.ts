export async function fetchCommanders(
  query: string
): Promise<{ name: string }[]> {
  if (!query) return [];
  try {
    const res = await fetch(
      `https://api.scryfall.com/cards/search?q=is:commander+${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    if (data?.data) {
      return data.data.map((c: any) => ({ name: c.name }));
    }
    return [];
  } catch (err) {
    console.error("Error fetching commanders:", err);
    return [];
  }
}
