import React, { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";
import { fetchMatchesApi } from "../../hooks/fetchMatches";

export default function MatchesTable() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMatchesApi();
      setMatches(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Lista de Partidas
      </Typography>
      <Box
        sx={{
          display: "flex",
          fontWeight: "bold",
          px: 0,
          py: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            pl: 2,
            pr: 1,
            py: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Match ID
        </Box>
        <Box
          sx={{
            flex: 1,
            px: 1,
            py: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Date
        </Box>
        <Box
          sx={{
            flex: 3,
            pl: 1,
            pr: 2,
            py: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Players (Commander - Win)
        </Box>
      </Box>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 0,
          maxWidth: 800,
          margin: "auto",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "left",
          }}
        >
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", padding: "16px" }}
                >
                  Cargando partidas...
                </td>
              </tr>
            ) : matches.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", padding: "16px" }}
                >
                  No hay partidas registradas.
                </td>
              </tr>
            ) : (
              matches.map((match) => (
                <tr key={match.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "8px 8px 8px 16px", width: "16%" }}>
                    {match.id}
                  </td>
                  <td style={{ padding: "8px", width: "16%" }}>
                    {new Date(match.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "8px 16px 8px 8px", width: "68%" }}>
                    <ul
                      style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}
                    >
                      {match.participations.map((p: any, idx: number) => (
                        <li key={idx}>
                          {p.player?.name ?? p.playerName} - {p.commander}{" "}
                          {p.isWinner ? "- 🏆 Winner" : ""}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Paper>
    </Box>
  );
}
