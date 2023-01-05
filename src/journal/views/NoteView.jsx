import {
  DeleteOutline,
  SaveOutlined,
  TextFieldsRounded,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import {
  setActiveNote,
  setSaving,
  startDeletingNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formstate } = useForm(note);

  const dispatch = useDispatch();

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const onSaveNote = () => {
    dispatch(startSavingNote(formstate));
  };
  useEffect(() => {
    dispatch(setActiveNote(formstate));
  }, [formstate]);
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota Actualizada", messageSaved, "success");
    }
  }, [messageSaved]);
  const fileInputRef = useRef();
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
      alignItems="center"
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="ligth">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontsize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          name="title"
          value={title}
          onChange={onInputChange}
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          name="body"
          value={body}
          onChange={onInputChange}
          fullWidth
          multiline
          placeholder="Que sucedio Hoy?"
          minRows={5}
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
        </Button>
      </Grid>

      <Grid>
        <ImageGallery images={note.imageUrls} />
      </Grid>
    </Grid>
  );
};
