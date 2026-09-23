import type { ChangeEvent } from "react";
import { useCreateChat } from "../../model/use-create-chat";
import cls from "./NewChatForm.module.scss";

export function NewChatForm() {
  const { phoneNumber, setPhoneNumber, error, isLoading, handleSubmit } =
    useCreateChat();

  return (
    <form onSubmit={handleSubmit} className={cls.form}>
      <input
        type="text"
        value={phoneNumber}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPhoneNumber(event.target.value)
        }
        placeholder="79991234567"
        autoComplete="off"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "..." : "Новый чат"}
      </button>
      {error && (
        <p role="alert" className={cls.error}>
          {error}
        </p>
      )}
    </form>
  );
}
