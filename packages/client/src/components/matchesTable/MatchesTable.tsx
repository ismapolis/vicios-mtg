import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from "@mui/material";
import { fetchMatchesApi } from "../../hooks/useMatchesApi";

interface Participation {
  player?: { name: string };
  playerName?: string;
  commander: string;
  isWinner: boolean;
}

interface Match {
  id: number;
  createdAt: string;
  participations: Participation[];
}

export default function MatchesTable() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMatchesApi();
      setMatches(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Partidas
      </Typography>

      <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
        {matches.length === 0 ? (
          <Box textAlign="center" py={3}>
            <Typography variant="body1" sx={{ fontSize: 18 }}>
              No hay partidas registradas.
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {matches.map((match, index) => (
              <React.Fragment key={match.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    px: 3,
                    py: 2,
                  }}
                >
                  <Box sx={{ width: "100%", display: "flex", mb: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: 18, fontWeight: "bold", flex: 1 }}
                    >
                      ID: {match.id}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    >
                      {new Date(match.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <List disablePadding sx={{ pl: 1 }}>
                    {match.participations.map((p, idx) => (
                      <ListItemText
                        key={idx}
                        primaryTypographyProps={{ fontSize: 18 }}
                        primary={`${p.player?.name ?? p.playerName} - ${
                          p.commander
                        } ${p.isWinner ? "🏆 Winner" : ""}`}
                      />
                    ))}
                  </List>
                </ListItem>
                {index < matches.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
