import { useState, type SubmitEvent } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { credentialsSet } from "@/shared/auth";

export function useLoginForm() {
  const dispatch = useAppDispatch();
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedId = idInstance.trim();
    const trimmedToken = apiTokenInstance.trim();

    if (!trimmedId || !trimmedToken) {
      setError("Заполните оба поля");
      return;
    }

    if (!/^\d+$/.test(trimmedId)) {
      setError("idInstance — это число, без пробелов и лишних символов");
      return;
    }

    setError(null);
    dispatch(
      credentialsSet({ idInstance: trimmedId, apiTokenInstance: trimmedToken }),
    );
  };

  return {
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    error,
    handleSubmit,
  };
}
