import { useAppSelector } from "./store/hooks";
import { selectIsAuthenticated } from "@/shared/auth";
import { LoginPage } from "@/pages/login-page";
import { ChatPage } from "@/pages/chat-page";

export function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <ChatPage /> : <LoginPage />;
}
