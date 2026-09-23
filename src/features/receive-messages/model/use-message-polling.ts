import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectIsAuthenticated } from "@/shared/auth";
import { chatAdded, messageAdded } from "@/entities/chat";
import { receiveMessagesApi } from "../api/receive-notification-api";

export function useMessagePolling() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isActiveRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    isActiveRef.current = true;

    const poll = async () => {
      while (isActiveRef.current) {
        try {
          const notification = await dispatch(
            receiveMessagesApi.endpoints.receiveNotification.initiate(),
          ).unwrap();

          if (!isActiveRef.current) return;
          if (!notification) continue;

          const { receiptId, body } = notification;

          if (
            body.typeWebhook === "incomingMessageReceived" &&
            body.senderData &&
            body.messageData?.textMessageData
          ) {
            const { chatId } = body.senderData;
            const text = body.messageData.textMessageData.textMessage;

            dispatch(
              chatAdded({ chatId, phoneNumber: chatId, createdAt: Date.now() }),
            );

            dispatch(
              messageAdded({
                chatId,
                message: {
                  id: body.idMessage ?? crypto.randomUUID(),
                  chatId,
                  text,
                  direction: "incoming",
                  timestamp: Date.now(),
                },
              }),
            );
          }

          await dispatch(
            receiveMessagesApi.endpoints.deleteNotification.initiate({
              receiptId,
            }),
          ).unwrap();
        } catch {
          if (!isActiveRef.current) return;
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    };

    poll();

    return () => {
      isActiveRef.current = false;
    };
  }, [isAuthenticated, dispatch]);
}
