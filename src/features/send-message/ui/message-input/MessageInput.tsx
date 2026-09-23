import type { ChangeEvent } from "react";
import { SendButton } from "../send-button/SendButton";
import { useSendMessage } from "../../model/use-send-message";
import cls from "./MessageInput.module.scss";

export function MessageInput() {
  const { text, setText, error, isLoading, handleSubmit } = useSendMessage();
  const hasText = text.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className={cls.form}>
      {error && (
        <p role="alert" className={cls.error}>
          {error}
        </p>
      )}
      <div className={cls.row}>
        <input
          type="text"
          value={text}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setText(event.target.value)
          }
          placeholder="Сообщение"
          autoComplete="off"
        />
        <SendButton visible={hasText} disabled={isLoading || !hasText} />
      </div>
    </form>
  );
}
