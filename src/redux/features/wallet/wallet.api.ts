import { baseApi } from "@/redux/baseApi";
import type { IRegisterResponseData, IResponse } from "@/types";
import type { IUpdateUserInfo } from "@/types/auth.types";
import type { addMoneyInfo, cashinInfo, cashoutInfo, ITransactionResponseData, IWalletData, sendMoneyInfo, withdrawMoneyInfo } from "@/types/wallet.types";

export const walletApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            addMoney: build.mutation<IResponse<ITransactionResponseData>, addMoneyInfo>({
                query: (userInfo) => ({
                    url: "/wallet/add-money",
                    method: "POST",
                    data: userInfo
                }),
                invalidatesTags: ["WALLET", "TRANSACTION"]
            }),
            withdrawMoney: build.mutation<IResponse<ITransactionResponseData>, withdrawMoneyInfo>({
                query: (userInfo) => ({
                    url: "/wallet/withdraw",
                    method: "POST",
                    data: userInfo
                }),
                invalidatesTags: ["WALLET", "TRANSACTION"]
            }),
            sendMoney: build.mutation<IResponse<ITransactionResponseData>, sendMoneyInfo>({
                query: (userInfo) => ({
                    url: "/wallet/send-money",
                    method: "POST",
                    data: userInfo
                }),
                invalidatesTags: ["WALLET", "TRANSACTION"]
            }),
            cashIn: build.mutation<IResponse<ITransactionResponseData>, cashinInfo>({
                query: (userInfo) => ({
                    url: "/wallet/cash-in",
                    method: "POST",
                    data: userInfo
                }),
                invalidatesTags: ["WALLET", "TRANSACTION"]
            }),
            cashOut: build.mutation<IResponse<ITransactionResponseData>, cashoutInfo>({
                query: (userInfo) => ({
                    url: "/wallet/cash-out",
                    method: "POST",
                    data: userInfo
                }),
                invalidatesTags: ["WALLET", "TRANSACTION"]
            }),

            getMyWallet: build.query<IResponse<IWalletData>, void>({
                query: () => ({
                    url: "/wallet/me",
                    method: "GET"
                }),
                providesTags: ["WALLET"]
            }),
            getMyCommission: build.query<IResponse<IRegisterResponseData>, void>({
                query: () => ({
                    url: "/wallet/me/commission",
                    method: "GET"
                }),
                providesTags: ["WALLET"]
            }),
            getSingleUserWallet: build.query<IResponse<IWalletData>, void>({
                query: (userID) => ({
                    url: `/wallet/${userID}`,
                    method: "GET"
                }),
                providesTags: ["WALLET"]
            }),
            blockWallet: build.mutation<IResponse<IRegisterResponseData>, IUpdateUserInfo>({
                query: (userID) => ({
                    url: `/wallet/${userID}/block`,
                    method: "PATCH",
                }),
                invalidatesTags: ["WALLET"]
            }),
            unBlockWallet: build.mutation<IResponse<IRegisterResponseData>, IUpdateUserInfo>({
                query: (userID) => ({
                    url: `/wallet/${userID}/unblock`,
                    method: "PATCH",
                }),
                invalidatesTags: ["WALLET"]
            }),
        }
    },
})

export const {
    useAddMoneyMutation,
    useWithdrawMoneyMutation,
    useSendMoneyMutation,
    useCashInMutation,
    useCashOutMutation,
    useGetMyWalletQuery,
    useGetMyCommissionQuery,
    useGetSingleUserWalletQuery,
    useBlockWalletMutation,
    useUnBlockWalletMutation
} = walletApi;

