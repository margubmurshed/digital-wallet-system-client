import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectIcon, SelectTrigger } from "@radix-ui/react-select";
import { Button, buttonVariants } from "@/components/ui/button";
import { useGetAgentsQuery } from "@/redux/features/user/user.api";
import { Check, ChevronDown, EllipsisVertical } from "lucide-react";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { ShowWalletModal } from "@/components/modules/Admin/ShowWalletModal";
import { Badge } from "@/components/ui/badge";
import { createManageAgentsTour } from "@/driverTour";

const Agents = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState("-createdAt");
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [isApproved, setIsApproved] = useState<boolean | undefined>(undefined);
    const { data: agents, isFetching: agentsLoading } = useGetAgentsQuery({ page: currentPage, fields: "-updatedAt", sortBy: filterType, status, isApproved });
    const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();

    const statusTypes = ["ACTIVE", "BLOCKED"];
    const approveType = [true, false];

    useEffect(() => {
        const showTour = localStorage.getItem("tour_adminAgents");
        if (agents?.data && !agentsLoading && !showTour) {
            const tour = createManageAgentsTour();
            tour.drive();
            localStorage.setItem("tour_adminAgents", "false")
        }
    }, [agents?.data, agentsLoading])

    const handleStatusUpdate = async (_id: string, value: string) => {
        const updateUserData = {
            _id,
            isApproved: value === "1" ? true : false
        }
        try {
            const response = await updateUser(updateUserData).unwrap();

            if (response.success) {
                toast.success(response.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.message || error.message)
        }
    }

    return (
        <div className="w-full p-6 bg-background text-foreground mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">My Agents</h1>
                <div className="space-x-3 space-y-3 mt-5 lg:mt-0" id="filters">
                    <Select onValueChange={value => setFilterType(value)} value={filterType || ""} disabled={agentsLoading || updateUserLoading}>
                        <SelectTrigger className={`cursor-pointer ${buttonVariants({ variant: "outline", size: "default" })}`}>
                            <SelectValue placeholder="Select a filter" />
                            <SelectIcon>
                                <ChevronDown />
                            </SelectIcon>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="-createdAt">
                                Newest to Oldest
                            </SelectItem>
                            <SelectItem value="createdAt">
                                Oldest to Newest
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={value => {
                        if (value === "all") setStatus(undefined)
                        else setStatus(value)
                    }} value={status || "all"} disabled={agentsLoading || updateUserLoading}>
                        <SelectTrigger className={`cursor-pointer capitalize ${buttonVariants({ variant: "default", size: "default" })}`}>
                            <SelectValue placeholder="Select a status type" />
                            <SelectIcon>
                                <ChevronDown />
                            </SelectIcon>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                All Status
                            </SelectItem>
                            {statusTypes.map(statusType => (
                                <SelectItem value={statusType} className="capitalize" key={statusType}>
                                    {statusType.split("_").join(" ").toLowerCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select onValueChange={value => {
                        if (value === "all") setIsApproved(undefined)
                        else setIsApproved(value === "1" ? true : false)
                    }} value={typeof isApproved === "boolean" ? (isApproved ? "1" : "0") : "all"} disabled={agentsLoading || updateUserLoading}>
                        <SelectTrigger className={`cursor-pointer capitalize ${buttonVariants({ variant: "default", size: "default" })}`}>
                            <SelectValue placeholder="Select approve status type" />
                            <SelectIcon>
                                <ChevronDown />
                            </SelectIcon>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                All Approve Type
                            </SelectItem>
                            {approveType.map(approveType => (
                                <SelectItem value={approveType ? "1" : "0"} className="capitalize" key={`${approveType}`}>
                                    {approveType ? "Approved" : "Not Approved"}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {(agents?.data.length || agentsLoading) ? <div>
                <Table id="table">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-[100px]">Role</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Commission Rate</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Approve</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(agentsLoading) ? Array.from({ length: 8 }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                                {Array.from({ length: 8 }).map((_, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2">
                                        <Skeleton className="h-10 w-full" />
                                    </td>
                                ))}
                            </tr>
                        ))
                            : (
                                agents?.data.map((agent) => (
                                    <TableRow key={agent._id}>
                                        <TableCell className="w-1/2">{agent._id}</TableCell>
                                        <TableCell className="w-1/2 space-y-2">{agent.name}</TableCell>
                                        <TableCell className="w-1/2 capitalize">
                                            <Badge
                                                variant="secondary"
                                                className="bg-[#ac46fe] text-white dark:bg-blue-600 capitalize"
                                            >
                                                {agent.role.split("_").join(" ").toLowerCase()}
                                            </Badge>

                                        </TableCell>
                                        <TableCell className="w-1/2">{agent.email}</TableCell>
                                        <TableCell className="w-1/2">{agent.phone}</TableCell>
                                        <TableCell className="w-1/2">{agent.commissionRate}</TableCell>
                                        <TableCell className="w-1/2" id="update-status">
                                            <Select onValueChange={value => handleStatusUpdate(agent._id, value)} value={agent.status === "ACTIVE" ? "1" : "0"} disabled={updateUserLoading}>
                                                <SelectTrigger className={cn(`cursor-pointer ${buttonVariants({ variant: "outline", size: "sm" })}`, {
                                                    "bg-green-600 text-white": agent.status === "ACTIVE",
                                                    "bg-red-600 text-white": agent.status === "BLOCKED",
                                                })}>
                                                    <SelectValue placeholder="Select a status" />
                                                    <SelectIcon>
                                                        <ChevronDown />
                                                    </SelectIcon>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">
                                                        Active
                                                    </SelectItem>
                                                    <SelectItem value="0">
                                                        Blocked
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="w-1/2" id="update-approve">
                                            <Badge className={cn("cursor-pointer", {
                                                "bg-green-600 text-white": agent.isApproved,
                                                "bg-red-600 text-white": !agent.isApproved,
                                            })}>{agent.isApproved ? <><Check /> Approved</> : "Not Approved"}</Badge>
                                        </TableCell>
                                        <TableCell className="w-1/2">
                                            {format(new Date(agent.createdAt), "hh:mm a, dd MMM yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            <ShowWalletModal userID={agent._id}>
                                                <Button size="icon" variant="ghost"><EllipsisVertical /></Button>
                                            </ShowWalletModal>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                    </TableBody>
                </Table>
                {(!agentsLoading && ((agents?.meta.totalPages || 1) > 1)) && (
                    <div className="mt-4 flex justify-end">
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious size="sm" className={cn("select-none", {
                                            "pointer-events-none opacity-50": currentPage === 1,
                                            "cursor-pointer": currentPage > 1,
                                        })} onClick={() => setCurrentPage(prev => {
                                            if (prev === 1) return prev;
                                            return prev - 1;
                                        })} />
                                    </PaginationItem>
                                    {Array.from({ length: agents?.meta.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page} className="cursor-pointer">
                                            <PaginationLink size="sm"
                                                isActive={currentPage === page}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext size="sm" className={cn("select-none cursor-pointer", {
                                            "pointer-events-none opacity-50": currentPage === agents?.meta.totalPages
                                        })} onClick={() => setCurrentPage(prev => {
                                            if (prev === agents?.meta.totalPages) return prev;
                                            return prev + 1;
                                        })} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                )}
            </div> : <p className="text-center">No Users Found</p>}
        </div>
    );
};

export default Agents;