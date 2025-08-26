import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IStats } from "@/types/stats.types";

export const statsApi = baseApi.injectEndpoints({
    endpoints(build) {
        return {
            getStats: build.query<IResponse<IStats>, null>({
                query: () => ({
                    url: "/stats",
                    method: "GET",
                }),
            }),
        }
    },
})

export const {
    useGetStatsQuery,
} = statsApi;

