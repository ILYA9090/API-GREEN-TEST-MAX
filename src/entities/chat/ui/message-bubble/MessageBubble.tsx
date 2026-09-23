import { formatMessageTime } from "@/shared/lib/format-time";
import type { Message } from "../../model/types";
import cls from "./MessageBubble.module.scss";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const bubbleClass =
    message.direction === "outgoing"
      ? `${cls.bubble} ${cls.bubble_outgoing}`
      : cls.bubble;

  return (
    <div className={bubbleClass}>
      <p className={cls.text}>{message.text}</p>
      <span className={cls.time}>{formatMessageTime(message.timestamp)}</span>
    </div>
  );
}
