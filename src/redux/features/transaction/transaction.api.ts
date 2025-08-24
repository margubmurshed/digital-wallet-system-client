import { baseApi } from "@/redux/baseApi";
import type { IAllDataResponse } from "@/types";
import type { ITransactionResponseData } from "@/types/wallet.types";

export const transactionApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getMyTransactions: build.query<IAllDataResponse<ITransactionResponseData[]>, unknown>({
                query: (params) => ({
                    url: "/transaction/me",
                    method: "GET",
                    params
                }),
                providesTags: ["TRANSACTION"]
            }),
            getAllTransactions: build.query<IAllDataResponse<ITransactionResponseData[]>, unknown>({
                query: (params) => ({
                    url: "/transaction",
                    method: "GET",
                    params
                }),
                providesTags: ["TRANSACTION"]
            }),

        }
    },
})

export const {
    useGetMyTransactionsQuery,
    useGetAllTransactionsQuery
} = transactionApi;

