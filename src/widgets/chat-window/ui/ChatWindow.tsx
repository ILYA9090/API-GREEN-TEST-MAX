import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectActiveChatId,
  selectMessagesForChat,
  selectChatById,
  MessageBubble,
  activeChatCleared,
} from "@/entities/chat";
import { MessageInput } from "@/features/send-message";
import cls from "./ChatWindow.module.scss";

export function ChatWindow() {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector(selectActiveChatId);
  const messages = useAppSelector(selectMessagesForChat(activeChatId));
  const activeChat = useAppSelector(selectChatById(activeChatId ?? ""));
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (!activeChatId) {
    return (
      <div className={cls.empty}>
        <p>Выбери чат или создай новый</p>
      </div>
    );
  }

  return (
    <div className={cls.window}>
      <header className={cls.header}>
        <button
          type="button"
          className={cls.back}
          onClick={() => dispatch(activeChatCleared())}
          aria-label="Назад к списку чатов"
        >
          ←
        </button>
        <span>{activeChat?.phoneNumber}</span>
      </header>
      <div className={cls.messages}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
      <MessageInput />
    </div>
  );
}
