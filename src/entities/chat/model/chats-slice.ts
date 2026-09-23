import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Chat, Message } from "./types";

interface ChatsState {
  chats: Record<string, Chat>;
  messages: Record<string, Message[]>;
  activeChatId: string | null;
}

const initialState: ChatsState = {
  chats: {},
  messages: {},
  activeChatId: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    chatAdded: (state, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      if (!state.chats[chat.chatId]) {
        state.chats[chat.chatId] = chat;
        state.messages[chat.chatId] = [];
      }
      state.activeChatId = chat.chatId;
    },
    activeChatSet: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    messageAdded: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
    },
  },
});

export const { chatAdded, activeChatSet, messageAdded } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
