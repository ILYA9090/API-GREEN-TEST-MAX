import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadSession } from "../lib/session-storage";

export interface SessionState {
  idInstance: string | null;
  apiTokenInstance: string | null;
}

const initialState: SessionState = loadSession();

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    credentialsSet: (
      state,
      action: PayloadAction<{ idInstance: string; apiTokenInstance: string }>,
    ) => {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
    sessionCleared: (state) => {
      state.idInstance = null;
      state.apiTokenInstance = null;
    },
  },
});

export const { credentialsSet, sessionCleared } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
