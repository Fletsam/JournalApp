import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return note.title.length > 10
      ? note.title.substring(0, 17) + "..."
      : note.title;
  }, [note.title]);

  const onSetActiveNote = () => {
    dispatch(setActiveNote(note));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onSetActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
