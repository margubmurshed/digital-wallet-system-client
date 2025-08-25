import { baseApi } from "@/redux/baseApi";
import type { IRegisterResponseData, IResponse } from "@/types";

export const userApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {

            getAllUsers: build.query<IResponse<IRegisterResponseData[]>, unknown>({
                query: (params) => ({
                    url: "/user",
                    method: "GET",
                    params
                }),
                providesTags: ["USER"]
            }),
            getUsers: build.query<IResponse<IRegisterResponseData[]>, unknown>({
                query: (params) => ({
                    url: "/user/users",
                    method: "GET",
                    params
                }),
                providesTags: ["USER"]
            }),
            getAgents: build.query<IResponse<IRegisterResponseData[]>, unknown>({
                query: (params) => ({
                    url: "/user/agents",
                    method: "GET",
                    params
                }),
                providesTags: ["USER"]
            }),
        }
    },
})

export const {
    useGetAllUsersQuery,
    useGetUsersQuery,
    useGetAgentsQuery
} = userApi;

