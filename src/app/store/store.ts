import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer, saveSession } from "@/shared/auth";
import { greenApi } from "@/shared/api/green-api";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [greenApi.reducerPath]: greenApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(greenApi.middleware),
});

store.subscribe(() => {
  saveSession(store.getState().session);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
