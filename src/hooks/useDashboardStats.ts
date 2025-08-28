import { useGetStatsQuery } from "@/redux/features/stats/stats.api"

export const useDashboardStats = () => {
    return useGetStatsQuery(null, {
        pollingInterval: 5000,
        skipPollingIfUnfocused: true
    })
}