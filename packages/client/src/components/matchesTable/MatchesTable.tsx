import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const matchesMock = [
  {
    id: 1,
    date: "2025-08-05",
    participations: [
      { playerName: "Alice", commander: "Azami, Lady of Scrolls", win: false },
      { playerName: "Bob", commander: "Nicol Bolas", win: true },
      { playerName: "Charlie", commander: "Edgar Markov", win: false },
    ],
  },
  {
    id: 2,
    date: "2025-08-04",
    participations: [
      { playerName: "Dave", commander: "Atraxa, Praetors' Voice", win: true },
      { playerName: "Eve", commander: "Chulane, Teller of Tales", win: false },
    ],
  },
];

export default function MatchesTable() {
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
            {matchesMock.map((match) => (
              <tr key={match.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px 8px 8px 16px", width: "16%" }}>
                  {match.id}
                </td>
                <td style={{ padding: "8px", width: "16%" }}>{match.date}</td>
                <td style={{ padding: "8px 16px 8px 8px", width: "68%" }}>
                  <ul style={{ paddingLeft: 0, listStyle: "none", margin: 0 }}>
                    {match.participations.map((p, idx) => (
                      <li key={idx}>
                        {p.playerName} - {p.commander}{" "}
                        {p.win ? "- 🏆 Winner" : ""}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Box>
  );
}
