import { MenuOutlined, TurnedInNot } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateActivate } from "../../store/journal";
import { SideBarItem } from "./";

export const SideBar = ({ drawerWidth }) => {
  const dispatch = useDispatch();
  const { displayName } = useSelector((state) => state.auth);
  const { notes, active, sideBar } = useSelector((state) => state.journal);
  const [hideBar, setHideBar] = useState(false);
  const onHideSidebar = () => {
    dispatch(stateActivate(false));
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        open={sideBar}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
          <IconButton onClick={onHideSidebar} color="inherit" sx={{ mr: 2 }}>
            <MenuOutlined />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
