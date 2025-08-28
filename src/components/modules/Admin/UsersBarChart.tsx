import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, subDays } from "date-fns"
import { useDashboardStats } from "@/hooks/useDashboardStats"


export function UsersBarChart() {
    const { data } = useDashboardStats();

    const stats = data?.data;
    const chartConfig = {
        values: {
            label: "users",
            color: "#01c850",
        },
    } satisfies ChartConfig;
    const description = `${format(subDays(new Date(), 6), "dd MMM yyyy")} - ${format(new Date(), "dd MMM yyyy")}`;
    const usersData = stats?.usersPerDay.map(upd => ({
        key: upd.date,
        users: upd.count
    }))
    const growthNumber = Number(stats?.growth.users.split("%")[0])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={usersData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="key"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="users" fill="var(--color-values)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className={cn("flex gap-2 leading-none font-medium", {
                    "text-green-500": growthNumber > 0,
                    "text-gray-500": growthNumber === 0,
                    "text-red-500": growthNumber < 0
                })}>
                    {`Trending ${growthNumber >= 0 ? "up" : "down"} - ${stats?.growth.users} this month`}
                    {growthNumber >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown />}
                </div>
                <div className="text-muted-foreground leading-none">
                    {`Showing total users for the last 7 days`}
                </div>
            </CardFooter>
        </Card>
    )
}
