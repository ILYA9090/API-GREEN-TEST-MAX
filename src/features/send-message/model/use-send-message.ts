import { useState, type SubmitEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  messageAdded,
  selectActiveChatId,
  useSendMessageMutation,
} from "@/entities/chat";

export function useSendMessage() {
  const dispatch = useAppDispatch();
  const activeChatId = useAppSelector(selectActiveChatId);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || !activeChatId) return;

    setError(null);

    try {
      await sendMessage({ chatId: activeChatId, message: trimmed }).unwrap();

      dispatch(
        messageAdded({
          chatId: activeChatId,
          message: {
            id: crypto.randomUUID(),
            chatId: activeChatId,
            text: trimmed,
            direction: "outgoing",
            timestamp: Date.now(),
          },
        }),
      );
      setText("");
    } catch (err) {
      const status =
        err && typeof err === "object" && "status" in err
          ? (err as { status: unknown }).status
          : undefined;

      setError(
        status === 403
          ? "Аккаунт временно ограничен — отправка возможна только контактам, сохранившим ваш номер"
          : "Не удалось отправить сообщение, попробуй ещё раз",
      );
    }
  };

  return { text, setText, error, isLoading, handleSubmit };
}
