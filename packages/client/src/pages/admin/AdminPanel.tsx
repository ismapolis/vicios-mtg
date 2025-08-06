import React, { useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminPanel() {
  const { logout } = useContext(AuthContext);

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel de Administración</h1>
      <Button variant="outlined" onClick={logout}>
        Cerrar sesión
      </Button>
    </div>
  );
}
