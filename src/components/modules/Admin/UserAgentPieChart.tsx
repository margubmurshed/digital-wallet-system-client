import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { format, subDays } from "date-fns"
import { useGetStatsQuery } from "@/redux/features/stats/stats.api"

const description = `${format(subDays(new Date(), 6), "dd MMM yyyy")} - ${format(new Date(), "dd MMM yyyy")}`;

const chartConfig = {
    users: {
        label: "Users",
        color: "#01c850",
    },
    agents: {
        label: "Agents",
        color: "#ac46fe",
    }
} satisfies ChartConfig

export function UserAgentPieChart() {
    const { data } = useGetStatsQuery(null);
    const stats = data?.data;

    const chartData = [
        { name: "users", count: stats?.thisWeekCount.users.count, fill: "var(--color-users)" },
        { name: "agents", count: stats?.thisWeekCount.agents.count, fill: "var(--color-agents)" },
    ]
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>User-Agent Comparision</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="count" label nameKey="name" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
