import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectAllChats,
  selectActiveChatId,
  activeChatSet,
  ChatListItem,
} from "@/entities/chat";
import { NewChatForm } from "@/features/create-chat-by-phone";
import cls from "./ChatSidebar.module.scss";

export function ChatSidebar() {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(selectAllChats);
  const activeChatId = useAppSelector(selectActiveChatId);

  return (
    <aside className={cls.sidebar}>
      <h2 className={cls.title}>Чаты</h2>
      <NewChatForm />
      <div className={cls.list}>
        {chats.length === 0 ? (
          <p className={cls.empty}>Пока нет ни одного чата</p>
        ) : (
          chats.map((chat) => (
            <ChatListItem
              key={chat.chatId}
              chat={chat}
              isActive={chat.chatId === activeChatId}
              onSelect={(chatId) => dispatch(activeChatSet(chatId))}
            />
          ))
        )}
      </div>
    </aside>
  );
}
