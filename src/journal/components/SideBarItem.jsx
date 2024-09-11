import PropTypes from "prop-types";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const onOpenNote = () => {
    // console.log("note opened");

    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onOpenNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
};
