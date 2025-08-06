import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayerRow from "../../components/playerRow";
import { useNavigate } from "react-router-dom";
import { CACHE_KEY } from "../../components/commanderSearch/CommanderSearch";

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

  const [recentCommanders, setRecentCommanders] = useState<string[]>(() => {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  const updatePlayer = (index: number, field: keyof PlayerData, value: any) => {
    const updated = [...players];
    (updated[index] as any)[field] = value;
    setPlayers(updated);
  };

  const handleUpdateRecents = (val: string) => {
    if (!val) return;
    const updated = [val, ...recentCommanders.filter((c) => c !== val)].slice(
      0,
      5
    );
    setRecentCommanders(updated);
    localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleRegister = () => {
    console.log("Datos de la partida:", players);
    // Aquí lógica para guardar partida
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        {/* Header */}
        <Grid container alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={1}>
            <IconButton onClick={handleCancel}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h6" gutterBottom align="center">
              Register Match
            </Typography>
          </Grid>
        </Grid>

        {/* Column titles */}
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

        {/* Rows */}
        {players.map((p, i) => (
          <PlayerRow
            key={i}
            player={p.name}
            onPlayerChange={(val) => updatePlayer(i, "name", val)}
            commander={p.commander}
            onCommanderChange={(val) => {
              updatePlayer(i, "commander", val);
              handleUpdateRecents(val);
            }}
            winner={p.winner}
            onWinnerChange={(val) => updatePlayer(i, "winner", val)}
            recent={recentCommanders} // 🔑 se pasa a PlayerRow
            onRecentUpdate={handleUpdateRecents} // 🔑 también se pasa
          />
        ))}

        {/* Register button */}
        <Grid container justifyContent="flex-start" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Registrar partida
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}
