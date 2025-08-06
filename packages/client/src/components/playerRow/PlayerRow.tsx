import { Grid, Checkbox, TextField } from "@mui/material";
import CommanderSearch from "../commanderSearch";

interface PlayerRowProps {
  winner: boolean;
  onWinnerChange: (val: boolean) => void;
  player: string;
  onPlayerChange: (val: string) => void;
  commander: string;
  onCommanderChange: (val: string) => void;
  recent: string[]; // 🔑 se agregan
  onRecentUpdate: (val: string) => void; // 🔑 se agregan
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
  return (
    <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
      <Grid item xs={5}>
        <TextField
          fullWidth
          size="small"
          label="Player"
          value={player}
          onChange={(e) => onPlayerChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={5}>
        <CommanderSearch
          value={commander}
          onChange={onCommanderChange}
          recent={recent} // 🔑 pasa al componente
          onRecentUpdate={onRecentUpdate} // 🔑 también pasa
        />
      </Grid>
      <Grid item xs={2} textAlign="center">
        <Checkbox
          checked={winner}
          onChange={(e) => onWinnerChange(e.target.checked)}
        />
      </Grid>
    </Grid>
  );
}
