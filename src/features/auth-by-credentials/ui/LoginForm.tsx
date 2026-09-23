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

  return (
    <form onSubmit={handleSubmit} className={cls.form}>
      <h1>Войти MAX</h1>

      <label>
        idInstance
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
        apiTokenInstance
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

      <Button type="submit">Войти</Button>
    </form>
  );
}
