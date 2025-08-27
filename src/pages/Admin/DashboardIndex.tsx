import ButtonLoader from "@/components/ButtonLoader";
import { AgentsBarChart } from "@/components/modules/Admin/AgentsBarChart";
import { TransactionAmountBarChart } from "@/components/modules/Admin/TransactionAmountBarChart";
import { TransactionsBarChart } from "@/components/modules/Admin/TransactionsBarChart";
import { UserAgentPieChart } from "@/components/modules/Admin/UserAgentPieChart";
import { UsersBarChart } from "@/components/modules/Admin/UsersBarChart";
import { Skeleton } from "@/components/ui/skeleton";
import { createDashboardIndexTour } from "@/driverTour";
import { useGetStatsQuery } from "@/redux/features/stats/stats.api";
import { User, UserLock } from "lucide-react";
import { useEffect } from "react";
import { FaMoneyCheck, FaSortAmountUp } from "react-icons/fa";

const DashboardIndex = () => {
    const { data, isLoading } = useGetStatsQuery(null);
    const stats = data?.data;

    useEffect(() => {
        const showTour = localStorage.getItem("tour_adminIndex");
        if (stats && !isLoading && !showTour) {
            const tour = createDashboardIndexTour();
            tour.drive()
            localStorage.setItem("tour_adminIndex", "false")
        }
    }, [stats, isLoading])
    if (isLoading) return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                <Skeleton className="h-36" />
                <Skeleton className="h-36" />
                <Skeleton className="h-36" />
                <Skeleton className="h-36" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-5">
                <Skeleton className="h-72" />
                <Skeleton className="h-72" />
            </div>
        </div>
    )

    return (
        <div>
            {/* stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3" id="stats-cards">
                <div className="border rounded-md p-4 gap-2 bg-green-500 text-white shadow-md flex items-center">
                    <span className="text-2xl"><User className="h-10 w-10" /></span>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Users</h3>
                        <p className="font-bold text-5xl">
                            {isLoading ? <ButtonLoader /> : stats?.thisWeekCount.users.count}
                        </p>
                        <p>Last 7 days</p>
                    </div>
                </div>
                <div className="border rounded-md p-4 gap-2 bg-purple-500 text-white shadow-md flex items-center">
                    <span className="text-2xl"><UserLock className="h-10 w-10" /></span>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Agents</h3>
                        <p className="font-bold text-5xl">
                            {isLoading ? <ButtonLoader /> : stats?.thisWeekCount.agents.count}
                        </p>
                        <p>Last 7 days</p>
                    </div>
                </div>
                <div className="border rounded-md p-4 gap-2 bg-orange-500 text-white shadow-md flex items-center">
                    <span className="text-2xl"><FaMoneyCheck className="h-10 w-10" /></span>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">Transactions</h3>
                        <p className="font-bold text-5xl">
                            {isLoading ? <ButtonLoader /> : stats?.thisWeekCount.transactions.count}
                        </p>
                        <p>Last 7 days</p>
                    </div>
                </div>
                <div className="border rounded-md p-4 gap-2 bg-pink-500 text-white shadow-md flex items-center">
                    <span className="text-2xl"><FaSortAmountUp className="h-10 w-10" /></span>
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{`Trx Amount (৳)`}</h3>
                        <p className="font-bold text-5xl">
                            {isLoading ? <ButtonLoader /> : stats?.thisWeekCount.transactions.totalAmount}
                        </p>
                        <p>Last 7 days</p>
                    </div>
                </div>
            </div>
            {/* charts */}
            <div id="chart-section">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-5">
                    <UsersBarChart />
                    <AgentsBarChart />
                    <TransactionsBarChart />
                    <TransactionAmountBarChart />
                </div>
                <div className="mt-5">
                    <UserAgentPieChart />
                </div>
            </div>
        </div>
    );
};

export default DashboardIndex;