import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Fab,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PlayerRow from "../../components/playerRow";
import { useNavigate } from "react-router-dom";
import { CACHE_KEY } from "../../components/commanderSearch/CommanderSearch";
import { App_Name } from "vicios-mtg/common";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { validateMatch } from "../../utils/validateMatch";
import { registerMatch } from "../../hooks/useMatchesApi";

export interface PlayerData {
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

  const handleRegister = async () => {
    const errorMsg = validateMatch(players);
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    // Si pasa la validación, registrar partida
    try {
      await registerMatch(players);
      alert("Partida registrada correctamente");
      navigate(-1);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleAddPlayer = () => {
    setPlayers([...players, { name: "", commander: "", winner: false }]);
  };

  const handleRemovePlayer = () => {
    if (players.length > 1) {
      setPlayers(players.slice(0, -1));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      {/* Header bar */}
      <AppBar position="static" sx={{ borderRadius: 2, mb: 2 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleCancel}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, textAlign: "center", color: "primary" }}
          >
            {App_Name}
          </Typography>
          <div style={{ width: 48 }} />
        </Toolbar>
      </AppBar>

      {/* Formulario */}
      <Paper elevation={3} sx={{ p: 2 }}>
        {/* Column titles */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <Typography variant="h6">Participantes</Typography>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid
            item
            xs={2}
            textAlign="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EmojiEventsIcon color="primary" sx={{ fontSize: 30 }} />
          </Grid>
        </Grid>

        {/* Rows */}
        {players.map((p, i) => (
          <div key={i}>
            <PlayerRow
              player={p.name}
              onPlayerChange={(val) => updatePlayer(i, "name", val)}
              commander={p.commander}
              onCommanderChange={(val) => {
                updatePlayer(i, "commander", val);
                handleUpdateRecents(val);
              }}
              winner={p.winner}
              onWinnerChange={(val) => updatePlayer(i, "winner", val)}
              recent={recentCommanders}
              onRecentUpdate={handleUpdateRecents}
            />
            {i < players.length - 1 && (
              <Divider
                sx={{
                  my: 1,
                  borderBottomWidth: 2,
                  borderColor: "primary.main",
                }}
              />
            )}
          </div>
        ))}

        {/* Botones añadir / quitar jugador */}
        <Grid container spacing={1} justifyContent="flex-start" sx={{ mt: 2 }}>
          <Grid item>
            <Fab
              color="error"
              size="small"
              aria-label="remove player"
              onClick={handleRemovePlayer}
              disabled={players.length <= 1}
            >
              <RemoveIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab
              color="secondary"
              size="small"
              aria-label="add player"
              onClick={handleAddPlayer}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>

        {/* Register button */}
        <Grid container justifyContent="flex-start" sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Registrar partida
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
}
