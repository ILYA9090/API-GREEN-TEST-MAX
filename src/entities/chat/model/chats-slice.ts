import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Chat, Message } from "./types";
import { loadChats } from "../lib/chats-storage";

export interface ChatsState {
  chats: Record<string, Chat>;
  messages: Record<string, Message[]>;
  activeChatId: string | null;
}

const initialState: ChatsState = loadChats();

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    chatAdded: (state, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      const alreadyExists = Boolean(state.chats[chat.chatId]);

      if (!alreadyExists) {
        state.chats[chat.chatId] = chat;
        state.messages[chat.chatId] = [];
        state.activeChatId = chat.chatId;
      }
    },
    activeChatSet: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    chatPhoneNumberSet: (
      state,
      action: PayloadAction<{ chatId: string; phoneNumber: string }>,
    ) => {
      const chat = state.chats[action.payload.chatId];
      if (chat) {
        chat.phoneNumber = action.payload.phoneNumber;
      }
    },
    activeChatCleared: (state) => {
      state.activeChatId = null;
    },
    messageAdded: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      const alreadyExists = state.messages[chatId].some(
        (existing) => existing.id === message.id,
      );
      if (!alreadyExists) {
        state.messages[chatId].push(message);
      }
    },
  },
});

export const {
  chatAdded,
  activeChatSet,
  activeChatCleared,
  messageAdded,
  chatPhoneNumberSet,
} = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
