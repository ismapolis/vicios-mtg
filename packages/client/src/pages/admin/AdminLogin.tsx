import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Alert,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    console.log("Login attempt:", { username, password, success });
    if (success) {
      navigate("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={6} sx={{ p: 3, mt: 8, borderRadius: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Icono arriba */}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* Título */}
          <Typography component="h1" variant="h5">
            Panel de Administración
          </Typography>

          {/* Formulario */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="off" // evita warnings de autocompletado
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="new-password" // evita warnings de current-password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Botones lado a lado */}
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/")}
                >
                  Volver
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" fullWidth variant="contained">
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
