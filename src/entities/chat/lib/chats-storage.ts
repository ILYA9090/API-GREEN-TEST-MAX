import type { ChatsState } from "../model/chats-slice";
import { readFromStorage, writeToStorage } from "@/shared/lib/local-storage";

const STORAGE_KEY = "green-api-chats";
const emptyState: ChatsState = { chats: {}, messages: {}, activeChatId: null };

export function loadChats(): ChatsState {
  return readFromStorage(STORAGE_KEY, emptyState);
}

export function saveChats(state: ChatsState): void {
  writeToStorage(STORAGE_KEY, state);
}
