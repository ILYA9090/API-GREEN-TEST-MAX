import { greenApi } from "@/shared/api/green-api";

export interface SendMessageRequest {
  chatId: string;
  message: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export const sendMessageApi = greenApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (body) => ({ url: "/sendMessage", method: "POST", body }),
    }),
  }),
});

export const { useSendMessageMutation } = sendMessageApi;
