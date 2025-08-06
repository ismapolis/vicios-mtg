import { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Paper,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface Usuario {
  id: number;
  nombre: string;
}

export default function UsuariosView() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState("");

  // Cargar usuarios al montar
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/players");
      const data = await res.json();
      // Mapea player.name a usuario.nombre para mantener consistencia
      const mapped = data.map((u: any) => ({ id: u.id, nombre: u.name }));
      setUsuarios(mapped);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
    setLoading(false);
  };

  const handleAddUser = async () => {
    try {
      const res = await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `Usuario ${usuarios.length + 1}` }),
      });
      if (!res.ok) throw new Error("Error al añadir usuario");
      await fetchUsuarios();
    } catch (error) {
      alert("Error añadiendo usuario");
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro que quieres borrar este usuario?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/players/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al borrar usuario");
      await fetchUsuarios();
    } catch (error) {
      alert("Error borrando usuario");
    }
  };

  const handleEditStart = (id: number, nombre: string) => {
    setEditId(id);
    setEditNombre(nombre);
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditNombre("");
  };

  const handleEditSave = async (id: number) => {
    try {
      const res = await fetch(`/api/players/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editNombre }),
      });
      if (!res.ok) throw new Error("Error al guardar usuario");
      await fetchUsuarios();
      setEditId(null);
      setEditNombre("");
    } catch (error) {
      alert("Error guardando usuario");
    }
  };

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
        Gestión de Usuarios
      </Typography>

      <Paper elevation={4} sx={{ pt: 0, pb: 2, px: 3, borderRadius: 3 }}>
        <List>
          {usuarios.map((user) => (
            <ListItem
              key={user.id}
              divider
              secondaryAction={
                editId === user.id ? (
                  <>
                    <IconButton
                      edge="end"
                      aria-label="guardar"
                      onClick={() => handleEditSave(user.id)}
                      sx={{ fontSize: 28 }}
                    >
                      <CheckIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="cancelar"
                      onClick={handleEditCancel}
                      sx={{ fontSize: 28 }}
                    >
                      <CloseIcon fontSize="large" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton
                      edge="end"
                      aria-label="editar"
                      onClick={() => handleEditStart(user.id, user.nombre)}
                      sx={{ fontSize: 28 }}
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="borrar"
                      onClick={() => handleDeleteUser(user.id)}
                      sx={{ fontSize: 28 }}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </>
                )
              }
            >
              <Box sx={{ flexGrow: 1 }}>
                {editId === user.id ? (
                  <TextField
                    size="small"
                    value={editNombre}
                    onChange={(e) => setEditNombre(e.target.value)}
                    autoFocus
                    inputProps={{ style: { fontSize: 20 } }}
                    sx={{ width: "20ch" }}
                  />
                ) : (
                  <ListItemText
                    primary={user.nombre}
                    primaryTypographyProps={{ fontSize: 20 }}
                  />
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box textAlign="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          size="large"
        >
          Añadir Usuario
        </Button>
      </Box>
    </Box>
  );
}
