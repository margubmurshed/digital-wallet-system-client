import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useState } from "react";
import { format } from "date-fns"
import { Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Transactions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: transactions, isLoading: transactionsLoading } = useGetMyTransactionsQuery({ page: currentPage, fields: "-updatedAt", sortBy: "-createdAt" });
    console.log(transactions)
    return (
        <div className="w-full p-6 bg-background text-foreground mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">My Transactions</h1>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead>TrxID</TableHead>
                            <TableHead>{`Amount (৳)`}</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(transactionsLoading) ? Array.from({ length: 5 }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                                {Array.from({ length: 5 }).map((_, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2">
                                        <Skeleton className="h-10 w-full" />
                                    </td>
                                ))}
                            </tr>
                        ))
                            : (
                                transactions?.data.map((transaction) => (
                                    <TableRow key={transaction._id}>
                                        <TableCell className="w-1/2 capitalize">{transaction.type.split("_").join(" ").toLowerCase()}</TableCell>
                                        <TableCell className="w-1/2 space-y-2">
                                            <p className="font-semibold">{transaction.type === "CASH_IN" ? transaction.from?.name : transaction.to?.name}</p>
                                            <p>
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-blue-500 text-white dark:bg-blue-600 capitalize"
                                                >
                                                    <Phone className="mr-1" />
                                                    {transaction.type === "CASH_IN" ? transaction.from?.phone : transaction.to?.phone}
                                                </Badge>
                                            </p>
                                        </TableCell>
                                        <TableCell className="w-1/2">{transaction._id}</TableCell>
                                        <TableCell className={cn("w-1/2 text-red-500 font-semibold", {
                                            "text-green-500": transaction.type === "ADD_MONEY" || transaction.type === "CASH_IN"
                                        })}>
                                            {transaction.type === "ADD_MONEY" || transaction.type === "CASH_IN" ? "+ " : "- "}
                                            {transaction.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="w-1/2">
                                            {format(new Date(transaction.createdAt), "hh:mm a, dd MMM yyyy")}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                    </TableBody>
                </Table>
                {(!transactionsLoading && ((transactions?.meta.totalPages || 1) > 1)) && (
                    <div className="mt-4 flex justify-end">
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious className={cn("select-none", {
                                            "pointer-events-none opacity-50": currentPage === 1,
                                            "cursor-pointer": currentPage > 1,
                                        })} onClick={() => setCurrentPage(prev => {
                                            if (prev === 1) return prev;
                                            return prev - 1;
                                        })} />
                                    </PaginationItem>
                                    {Array.from({ length: transactions?.meta.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page} className="cursor-pointer">
                                            <PaginationLink
                                                isActive={currentPage === page}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext className={cn("select-none cursor-pointer", {
                                            "pointer-events-none opacity-50": currentPage === transactions?.meta.totalPages
                                        })} onClick={() => setCurrentPage(prev => {
                                            if (prev === transactions?.meta.totalPages) return prev;
                                            return prev + 1;
                                        })} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;