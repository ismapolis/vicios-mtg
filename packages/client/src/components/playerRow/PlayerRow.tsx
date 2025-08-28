import {
  Grid,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import CommanderSearch from "../commanderSearch";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../hooks/useUsersApi";

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
    <Grid container spacing={1} sx={{ mt: 1 }}>
      {/* Player */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth size="small" sx={{ maxWidth: 200 }}>
          <Select
            value={player}
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

      {/* Commander + Winner */}
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: { xs: 1, sm: 0 },
        }}
      >
        <Box sx={{ flex: 1, mr: 1, maxWidth: 280 }}>
          <CommanderSearch
            value={commander}
            onChange={onCommanderChange}
            recent={recent}
            onRecentUpdate={onRecentUpdate}
          />
        </Box>
        <Checkbox
          sx={{
            transform: "scale(1.25)",
          }}
          size="medium"
          checked={winner}
          onChange={(e) => onWinnerChange(e.target.checked)}
        />
      </Grid>
    </Grid>
  );
}
