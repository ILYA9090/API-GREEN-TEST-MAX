import { useState, type SubmitEvent } from "react";
import {
  activeChatSet,
  chatAdded,
  chatPhoneNumberSet,
  useCheckAccountMutation,
} from "@/entities/chat";
import { useAppDispatch } from "@/shared/lib/store-hooks";

export function useCreateChat() {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checkAccount, { isLoading }] = useCheckAccountMutation();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = phoneNumber.trim();

    if (!/^\d{10,15}$/.test(trimmed)) {
      setError("Номер — только цифры, с кодом страны (пример: 79991234567)");
      return;
    }

    setError(null);

    try {
      const response = await checkAccount({
        phoneNumber: Number(trimmed),
      }).unwrap();

      if (!response.exist) {
        setError("У этого номера нет аккаунта в MAX");
        return;
      }

      dispatch(
        chatAdded({
          chatId: response.chatId,
          phoneNumber: trimmed,
          createdAt: Date.now(),
        }),
      );
      dispatch(
        chatPhoneNumberSet({ chatId: response.chatId, phoneNumber: trimmed }),
      );
      dispatch(activeChatSet(response.chatId));
      setPhoneNumber("");
    } catch {
      setError(
        "Не удалось проверить номер — проверь соединение и попробуй ещё раз",
      );
    }
  };

  return { phoneNumber, setPhoneNumber, error, isLoading, handleSubmit };
}
