import { createSlice } from "@reduxjs/toolkit";
export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    sideBar: true,
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    /* active: {
      id: "",
      titlte: "",
      body: "",
      date: 1,
      imageUrls: [],
    }, */
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
      state.sideBar = false;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.messageSaved = `${action.payload.title}`;
    },

    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },

    deleteNotebyId: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => action.payload !== note.id);
    },
    stateActivate: (state, action) => {
      state.sideBar = action.payload;
    },
  },
});
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNotebyId,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogout,
  stateActivate,
} = journalSlice.actions;
