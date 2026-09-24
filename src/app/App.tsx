import { selectIsAuthenticated } from "@/shared/auth";
import { LoginPage } from "@/pages/login-page";
import { ChatPage } from "@/pages/chat-page";
import { useAppSelector } from "@/shared/lib/store-hooks";

export function App() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <ChatPage /> : <LoginPage />;
}
