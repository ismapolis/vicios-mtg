import React, { useState } from "react";
import { Grid, Fab } from "@material-ui/core";
import { CloudDownloadRounded } from "@material-ui/icons";
import { App_Name } from "@my-app/common";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import RegisterMatch from "../registerMatch/RegisterMatch";

import "./App.css";

// Componente para la pantalla principal
function Main() {
  const [apiResponse, setApiResponse] = useState("");
  const navigate = useNavigate();

  const onCallApi = async () => {
    try {
      const response = await fetch("/api", { method: "GET" });
      const text = await response.text();
      console.log(text);
      setApiResponse(text);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="App">
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item style={{ alignSelf: "flex-start" }}>
          <Fab
            size="small"
            color="secondary"
            onClick={() => navigate("/register-match")}
            aria-label="register match"
          >
            +
          </Fab>
        </Grid>

        <Grid item>{`Client App Name - ${App_Name}`}</Grid>
        <Grid item>
          <Fab variant="extended" color="primary" onClick={onCallApi}>
            <CloudDownloadRounded className="icon" />
            Call API
          </Fab>
        </Grid>
        {apiResponse && <Grid item>{`Server Response - ${apiResponse}`}</Grid>}
      </Grid>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register-match" element={<RegisterMatch />} />
      </Routes>
    </Router>
  );
}
