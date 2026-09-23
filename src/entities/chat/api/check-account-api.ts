import { greenApi } from "@/shared/api/green-api";

export interface CheckAccountRequest {
  phoneNumber: number;
}

export interface CheckAccountResponse {
  exist: boolean;
  chatId: string;
  fromCache: boolean;
}

export const checkAccountApi = greenApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAccount: builder.mutation<CheckAccountResponse, CheckAccountRequest>({
      query: (body) => ({ url: "/checkAccount", method: "POST", body }),
    }),
  }),
});

export const { useCheckAccountMutation } = checkAccountApi;
