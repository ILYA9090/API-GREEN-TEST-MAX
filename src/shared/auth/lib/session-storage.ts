import type { SessionState } from "../model/session-slice";

const STORAGE_KEY = "green-api-session";

export function loadSession(): SessionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? (JSON.parse(raw) as SessionState)
      : { idInstance: null, apiTokenInstance: null };
  } catch {
    return { idInstance: null, apiTokenInstance: null };
  }
}

export function saveSession(session: SessionState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    //
  }
}
