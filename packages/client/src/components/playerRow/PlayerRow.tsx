import {
  Grid,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CommanderSearch from "../commanderSearch";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../hooks/fetchUsers";

interface PlayerRowProps {
  winner: boolean;
  onWinnerChange: (val: boolean) => void;
  player: string;
  onPlayerChange: (val: string) => void;
  commander: string;
  onCommanderChange: (val: string) => void;
  recent: string[];
  onRecentUpdate: (val: string) => void;
}

export default function PlayerRow({
  winner,
  onWinnerChange,
  player,
  onPlayerChange,
  commander,
  onCommanderChange,
  recent,
  onRecentUpdate,
}: PlayerRowProps) {
  const [players, setPlayers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetchUsers();
        const users = res.map((u, index) => ({ id: index, name: u.nombre }));
        setPlayers(users);
      } catch (error) {
        setPlayers([]);
      }
    };
    fetchPlayers();
  }, []);

  return (
    <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
      <Grid item xs={4}>
        <FormControl fullWidth size="small">
          <InputLabel id="player-select-label">Player</InputLabel>
          <Select
            labelId="player-select-label"
            value={player}
            label="Player"
            onChange={(e) => onPlayerChange(e.target.value)}
          >
            {players.map((p) => (
              <MenuItem key={p.id} value={p.name}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <CommanderSearch
          value={commander}
          onChange={onCommanderChange}
          recent={recent}
          onRecentUpdate={onRecentUpdate}
        />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Checkbox
          sx={{
            transform: "scale(1.25)",
            paddingLeft: 2,
          }}
          size="medium"
          checked={winner}
          onChange={(e) => onWinnerChange(e.target.checked)}
        />
      </Grid>
    </Grid>
  );
}
