import { ChatSidebar } from "@/widgets/chat-sidebar";
import { ChatWindow } from "@/widgets/chat-window";
import cls from "./ChatPage.module.scss";

export function ChatPage() {
  return (
    <div className={cls.layout}>
      <ChatSidebar />
      <main className={cls.content}>
        <ChatWindow />
      </main>
    </div>
  );
}
