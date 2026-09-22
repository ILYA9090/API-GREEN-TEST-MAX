import type { RootState } from "@/app/store/store";

export const selectSession = (state: RootState) => state.session;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.session.idInstance && state.session.apiTokenInstance);
