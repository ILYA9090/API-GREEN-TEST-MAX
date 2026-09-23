import type { ChangeEvent } from "react";
import { useLoginForm } from "../model/use-login-form";

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
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Вход в MAX</h1>

      <label>
        idInstance
        <input
          type="text"
          value={idInstance}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setIdInstance(event.target.value)
          }
          placeholder="310022743284"
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
        <p role="alert" className="login-form__error">
          {error}
        </p>
      )}

      <button type="submit">Войти</button>
    </form>
  );
}
