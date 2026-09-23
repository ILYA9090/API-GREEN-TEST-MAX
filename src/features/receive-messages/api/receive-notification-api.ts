import { greenApi } from "@/shared/api/green-api";

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage?: string;
    senderData?: {
      chatId: string;
      sender: string;
      senderName?: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
  };
}

export const receiveMessagesApi = greenApi.injectEndpoints({
  endpoints: (builder) => ({
    receiveNotification: builder.mutation<
      ReceiveNotificationResponse | null,
      void
    >({
      query: () => ({
        url: "/receiveNotification",
        method: "GET",
        responseHandler: async (response) => {
          if (response.status === 204) return null;
          const data = await response.json();
          return data ?? null;
        },
      }),
    }),
    deleteNotification: builder.mutation<
      { result: boolean },
      { receiptId: number }
    >({
      query: ({ receiptId }) => ({
        url: `/deleteNotification/${receiptId}`,
        method: "DELETE",
      }),
    }),
  }),
});
