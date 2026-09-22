import { useAppSelector } from "./store/hooks";
import { selectIsAuthenticated } from "@/shared/auth";

export function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? (
    <div>ChatPage (заглушка)</div>
  ) : (
    <div>LoginPage (заглушка)</div>
  );
}
