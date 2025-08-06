import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Checkbox,
  Typography,
  Paper,
} from "@mui/material";
import CommanderSearch from "../commanderSearch/CommanderSearch";

interface PlayerData {
  name: string;
  commander: string;
  winner: boolean;
}

export default function RegisterMatch() {
  const [players, setPlayers] = useState<PlayerData[]>([
    { name: "", commander: "", winner: false },
    { name: "", commander: "", winner: false },
    { name: "", commander: "", winner: false },
  ]);

  const updatePlayer = (index: number, field: keyof PlayerData, value: any) => {
    const updated = [...players];
    (updated[index] as any)[field] = value;
    setPlayers(updated);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom align="center">
          Register Match
        </Typography>

        {/* Titulos de columnas */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <Typography variant="subtitle2">Player</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle2">Commander</Typography>
          </Grid>
          <Grid item xs={2} textAlign="center">
            <Typography variant="subtitle2">Winner</Typography>
          </Grid>
        </Grid>

        {/* Filas de jugadores */}
        {players.map((player, index) => (
          <Grid
            container
            spacing={2}
            alignItems="center"
            key={index}
            sx={{ mt: 1 }}
          >
            {/* Nombre */}
            <Grid item xs={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Player name"
                value={player.name}
                onChange={(e) => updatePlayer(index, "name", e.target.value)}
              />
            </Grid>

            {/* Commander con caché */}
            <Grid item xs={5}>
              <CommanderSearch
                value={player.commander}
                onChange={(val) => updatePlayer(index, "commander", val)}
              />
            </Grid>

            {/* Winner a la derecha */}
            <Grid item xs={2} textAlign="center">
              <Checkbox
                checked={player.winner}
                onChange={(e) =>
                  updatePlayer(index, "winner", e.target.checked)
                }
              />
            </Grid>
          </Grid>
        ))}
      </Paper>
    </Container>
  );
}
