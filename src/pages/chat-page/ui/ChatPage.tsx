import { ChatSidebar } from "@/widgets/chat-sidebar";
import cls from "./ChatPage.module.scss";

export function ChatPage() {
  return (
    <div className={cls.layout}>
      <ChatSidebar />
      <main className={cls.content}>
        <p className={cls.placeholder}>окно с чатами</p>
      </main>
    </div>
  );
}
