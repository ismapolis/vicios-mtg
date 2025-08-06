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
      <Grid item xs={4}>
        <TextField
          fullWidth
          size="small"
          label="Player"
          value={player}
          onChange={(e) => onPlayerChange(e.target.value)}
          inputProps={{ maxLength: 10 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CommanderSearch
          value={commander}
          onChange={onCommanderChange}
          recent={recent} // 🔑 pasa al componente
          onRecentUpdate={onRecentUpdate} // 🔑 también pasa
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
            transform: "scale(1.25)", // escala el checkbox al 150%
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
