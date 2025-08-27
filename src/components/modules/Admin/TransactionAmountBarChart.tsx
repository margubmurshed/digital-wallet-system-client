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
import { useGetStatsQuery } from "@/redux/features/stats/stats.api"
import { format, subDays } from "date-fns"


export function TransactionAmountBarChart() {
    const { data } = useGetStatsQuery(null);

    const stats = data?.data;
    const chartConfig = {
        values: {
            label: "transactionAmount",
            color: "#f6339a",
        },
    } satisfies ChartConfig;
    const description = `${format(subDays(new Date(), 6), "dd MMM yyyy")} - ${format(new Date(), "dd MMM yyyy")}`;
    const transactionAmountData = stats?.transactionsPerDay.map(upd => ({
        key: upd.date,
        amount: upd.totalAmount
    }))
    const growthNumber = Number(stats?.growth.transactionAmount.split("%")[0])
    return (
        <Card>
            <CardHeader>
                <CardTitle>Transaction Amount</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={transactionAmountData}>
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
                        <Bar dataKey="amount" fill="var(--color-values)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className={cn("flex gap-2 leading-none font-medium", {
                    "text-green-500": growthNumber > 0,
                    "text-gray-500": growthNumber === 0,
                    "text-red-500": growthNumber < 0
                })}>
                    {`Trending ${growthNumber >= 0 ? "up" : "down"} - ${stats?.growth.transactionAmount} this month`}
                    {growthNumber >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown />}
                </div>
                <div className="text-muted-foreground leading-none">
                    {`Showing total transaction amounts for the last 7 days`}
                </div>
            </CardFooter>
        </Card>
    )
}
