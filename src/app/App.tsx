import { useAppSelector } from "./store/hooks";
import { selectIsAuthenticated } from "@/shared/auth";
import { LoginPage } from "@/pages/login-page";

export function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <div>ChatPage (заглушка)</div> : <LoginPage />;
}
