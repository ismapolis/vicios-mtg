import { useState } from "react";
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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function UsuariosView() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Alice" },
    { id: 2, nombre: "Bob" },
    { id: 3, nombre: "Charlie" },
  ]);

  const [editId, setEditId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState("");

  const handleAddUser = () => {
    const nuevo = {
      id: usuarios.length + 1,
      nombre: `Usuario ${usuarios.length + 1}`,
    };
    setUsuarios([...usuarios, nuevo]);
  };

  const handleDeleteUser = (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro que quieres borrar este usuario?"
    );
    if (confirmDelete) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
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

  const handleEditSave = (id: number) => {
    setUsuarios(
      usuarios.map((u) => (u.id === id ? { ...u, nombre: editNombre } : u))
    );
    setEditId(null);
    setEditNombre("");
  };

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
