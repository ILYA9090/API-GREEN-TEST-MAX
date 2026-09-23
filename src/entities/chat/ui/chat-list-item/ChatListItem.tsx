import { Avatar } from "@/shared/ui";
import type { Chat } from "../../model/types";
import cls from "./ChatListItem.module.scss";

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: (chatId: string) => void;
}

export function ChatListItem({ chat, isActive, onSelect }: ChatListItemProps) {
  return (
    <button
      type="button"
      className={isActive ? `${cls.item} ${cls.item_active}` : cls.item}
      onClick={() => onSelect(chat.chatId)}
    >
      <Avatar label={chat.phoneNumber} />
      <span className={cls.phone}>{chat.phoneNumber}</span>
    </button>
  );
}
