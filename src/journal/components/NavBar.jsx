import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";
import {
  savingNewNote,
  setActiveNote,
  stateActivate,
} from "../../store/journal";

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(startLogout());
  };

  const onSideBar = () => {
    dispatch(stateActivate(true));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xl: "100%" },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton onClick={onSideBar} color="inherit" sx={{ mr: 2 }}>
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-around "
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Journal App
          </Typography>
          <IconButton onClick={onLogout} color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
