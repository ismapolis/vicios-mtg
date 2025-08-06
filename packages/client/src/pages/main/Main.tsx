import React, { useState } from "react";
import { Grid, Fab } from "@mui/material";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import { useNavigate } from "react-router-dom";
import { App_Name } from "@my-app/common";

export default function Main() {
  const [apiResponse, setApiResponse] = useState("");
  const navigate = useNavigate();

  const onCallApi = async () => {
    try {
      const response = await fetch("/api", { method: "GET" });
      const text = await response.text();
      setApiResponse(text);
    } catch (error) {
      console.error(error);
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
            <CloudDownloadRoundedIcon className="icon" />
            Call API
          </Fab>
        </Grid>
        {apiResponse && <Grid item>{`Server Response - ${apiResponse}`}</Grid>}
      </Grid>
    </div>
  );
}
