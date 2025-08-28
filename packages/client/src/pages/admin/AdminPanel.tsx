// src/App.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import UsuariosView from "../../components/usuariosView";
import MatchesTable from "../../components/matchesTable";

const drawerWidth = 220;

const sections = [
  { key: "principal", label: "Principal", icon: <HomeIcon /> },
  { key: "usuarios", label: "Usuarios", icon: <PeopleIcon /> },
  { key: "partidas", label: "Partidas", icon: <SportsEsportsIcon /> },
];

export default function AdminPanel() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("principal");

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (section: string) => {
    setActive(section);
    if (!isDesktop) setMobileOpen(false);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Panel
        </Typography>
      </Toolbar>

      <List>
        {sections.map((section) => (
          <ListItem key={section.key} disablePadding>
            <ListItemButton
              selected={active === section.key}
              onClick={() => handleMenuClick(section.key)}
            >
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Espacio flexible para empujar el botón hacia abajo */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Botón de salir */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleBackToHome}>
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4" noWrap sx={{ color: "primary.main" }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            [`& .MuiDrawer-paper`]: { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {active === "principal" && (
          <Typography variant="h4">{sections[0].label}</Typography>
        )}
        {active === "usuarios" && <UsuariosView />}
        {active === "partidas" && <MatchesTable />}
      </Box>
    </Box>
  );
}
