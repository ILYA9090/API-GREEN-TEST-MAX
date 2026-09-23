import type { ChangeEvent } from "react";
import { useSendMessage } from "../../model/use-send-message";
import cls from "./MessageInput.module.scss";

export function MessageInput() {
  const { text, setText, error, isLoading, handleSubmit } = useSendMessage();

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
          placeholder="Написать сообщение..."
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading || !text.trim()}>
          {isLoading ? "..." : "Отправить"}
        </button>
      </div>
    </form>
  );
}
