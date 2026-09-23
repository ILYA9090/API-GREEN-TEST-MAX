import type { RootState } from "@/app/store/store";

export const selectAllChats = (state: RootState) =>
  Object.values(state.chats.chats).sort((a, b) => b.createdAt - a.createdAt);

export const selectActiveChatId = (state: RootState) =>
  state.chats.activeChatId;

export const selectMessagesForChat =
  (chatId: string | null) => (state: RootState) =>
    chatId ? (state.chats.messages[chatId] ?? []) : [];

export const selectChatById = (chatId: string) => (state: RootState) =>
  state.chats.chats[chatId];
