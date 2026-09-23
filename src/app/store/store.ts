import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer, saveSession } from "@/shared/auth";
import { chatsReducer, saveChats } from "@/entities/chat";
import { greenApi } from "@/shared/api/green-api";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    chats: chatsReducer,
    [greenApi.reducerPath]: greenApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(greenApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  saveSession(state.session);
  saveChats(state.chats);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
