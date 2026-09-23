import type { SessionState } from "../model/session-slice";
import { readFromStorage, writeToStorage } from "@/shared/lib/local-storage";

const STORAGE_KEY = "green-api-session";
const emptyState: SessionState = { idInstance: null, apiTokenInstance: null };

export function loadSession(): SessionState {
  return readFromStorage(STORAGE_KEY, emptyState);
}

export function saveSession(session: SessionState): void {
  writeToStorage(STORAGE_KEY, session);
}
