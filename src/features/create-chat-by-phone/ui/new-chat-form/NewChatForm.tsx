import type { ChangeEvent } from "react";
import { Button } from "@/shared/ui";
import PlusIcon from "@/shared/assets/icon/plus.svg?react";
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
        placeholder="Создание чата"
        autoComplete="off"
      />
      <Button
        type="submit"
        icon={<PlusIcon />}
        disabled={isLoading}
        aria-label="Новый чат"
      />
      {error && (
        <p role="alert" className={cls.error}>
          {error}
        </p>
      )}
    </form>
  );
}
