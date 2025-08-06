import React from "react";
import { Grid, Typography, Fab, Paper, Box } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useNavigate } from "react-router-dom";
import { App_Name } from "@my-app/common";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="App" style={{ position: "relative" }}>
      {/* Logo Magic arriba derecha */}
      <Box
        component="img"
        src="/images/Magic-The-Gathering-Logo-1993.png"
        alt="Magic The Gathering Logo"
        sx={{
          position: "absolute",
          top: 32,
          right: 32,
          width: 120,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ minHeight: "100vh", backgroundColor: "background.default" }}
      >
        {/* Título de la app */}
        <Grid item>
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {App_Name}
          </Typography>
        </Grid>

        {/* Botón principal */}
        <Grid item>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              backgroundColor: "background.paper",
            }}
          >
            <Fab
              variant="extended"
              color="secondary"
              onClick={() => navigate("/register-match")}
              aria-label="register match"
              sx={{ px: 4, py: 2, fontSize: "1.1rem" }}
            >
              <SportsEsportsIcon sx={{ mr: 1 }} />
              Registrar Partida
            </Fab>
          </Paper>
        </Grid>

        {/* Imagen de colores Magic */}
        <Grid item>
          <Box
            component="img"
            src="/images/colors.png"
            alt="Magic Colors Wheel"
            sx={{ width: 240, userSelect: "none", pointerEvents: "none" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
