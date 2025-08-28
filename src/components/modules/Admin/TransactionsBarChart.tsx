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


export function TransactionsBarChart() {
    const { data } = useDashboardStats();
    const stats = data?.data;
    const chartConfig = {
        values: {
            label: "transactions",
            color: "#fe6901",
        },
    } satisfies ChartConfig;
    const description = `${format(subDays(new Date(), 6), "dd MMM yyyy")} - ${format(new Date(), "dd MMM yyyy")}`;
    const transactionsData = stats?.transactionsPerDay.map(upd => ({
        key: upd.date,
        transactions: upd.count
    }))
    const growthNumber = Number(stats?.growth.transactions.split("%")[0])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={transactionsData}>
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
                        <Bar dataKey="transactions" fill="var(--color-values)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className={cn("flex gap-2 leading-none font-medium", {
                    "text-green-500": growthNumber > 0,
                    "text-gray-500": growthNumber === 0,
                    "text-red-500": growthNumber < 0
                })}>
                    {`Trending ${growthNumber >= 0 ? "up" : "down"} - ${stats?.growth.transactions} this week`}
                    {growthNumber >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown />}
                </div>
                <div className="text-muted-foreground leading-none">
                    {`Showing total transactions for the last 7 days`}
                </div>
            </CardFooter>
        </Card>
    )
}
