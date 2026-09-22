import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store/store";
import { computeApiUrl } from "@/shared/auth";

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { idInstance, apiTokenInstance } = (api.getState() as RootState)
    .session;

  if (!idInstance || !apiTokenInstance) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        error: "Нет учётных данных GREEN-API",
      } as FetchBaseQueryError,
    };
  }

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${computeApiUrl(idInstance)}/waInstance${idInstance}`,
  });

  const preparedArgs: FetchArgs =
    typeof args === "string"
      ? { url: `${args}/${apiTokenInstance}` }
      : { ...args, url: `${args.url}/${apiTokenInstance}` };

  return rawBaseQuery(preparedArgs, api, extraOptions);
};

export const greenApi = createApi({
  reducerPath: "greenApi",
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
});
