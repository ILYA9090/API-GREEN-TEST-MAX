import type { Message } from "../../model/types";
import styles from "./MessageBubble.module.scss";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const bubbleClass =
    message.direction === "outgoing"
      ? `${styles.bubble} ${styles.bubble_outgoing}`
      : styles.bubble;

  return (
    <div className={bubbleClass}>
      <p className={styles.text}>{message.text}</p>
    </div>
  );
}
