import type { ChangeEvent } from "react";
import { useLoginForm } from "../model/use-login-form";
import cls from "./LoginForm.module.scss";
import { Button } from "@/shared/ui";

export function LoginForm() {
  const {
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    error,
    handleSubmit,
  } = useLoginForm();

  const canSubmit =
    idInstance.trim().length > 0 && apiTokenInstance.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className={cls.form}>
      <h1>Войти</h1>

      <label>
        <input
          type="text"
          value={idInstance}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setIdInstance(event.target.value)
          }
          placeholder="idInstance"
          autoComplete="off"
        />
      </label>

      <label>
        <input
          type="password"
          value={apiTokenInstance}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setApiTokenInstance(event.target.value)
          }
          placeholder="Токен инстанса"
          autoComplete="off"
        />
      </label>

      {error && (
        <p role="alert" className={cls.error}>
          {error}
        </p>
      )}

      <Button type="submit" disabled={!canSubmit} className={cls.submit}>
        Войти
      </Button>
    </form>
  );
}
