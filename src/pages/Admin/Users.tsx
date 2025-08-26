import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectIcon, SelectTrigger } from "@radix-ui/react-select";
import { Button, buttonVariants } from "@/components/ui/button";
import { useGetUsersQuery } from "@/redux/features/user/user.api";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { ShowWalletModal } from "@/components/modules/Admin/ShowWalletModal";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState("-createdAt");
    const { data: users, isFetching: usersLoading } = useGetUsersQuery({ page: currentPage, fields: "-updatedAt", sortBy: filterType });
    const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();

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
                <h1 className="text-2xl font-bold">My Users</h1>
                <div className="space-x-3 mt-5 lg:mt-0">
                    <Select onValueChange={value => setFilterType(value)} value={filterType || ""} disabled={usersLoading}>
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
                </div>
            </div>
            {(users?.data.length || usersLoading) ? <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-[100px]">Role</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(usersLoading) ? Array.from({ length: 8 }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                                {Array.from({ length: 8 }).map((_, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2">
                                        <Skeleton className="h-10 w-full" />
                                    </td>
                                ))}
                            </tr>
                        ))
                            : (
                                users?.data.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="w-1/2">{user._id}</TableCell>
                                        <TableCell className="w-1/2 space-y-2">{user.name}</TableCell>
                                        <TableCell className="w-1/2 capitalize">{user.role.split("_").join(" ").toLowerCase()}</TableCell>
                                        <TableCell className="w-1/2">{user.email}</TableCell>
                                        <TableCell className="w-1/2">{user.phone}</TableCell>
                                        <TableCell className="w-1/2">
                                            <Select onValueChange={value => handleStatusUpdate(user._id, value)} value={user.isApproved ? "1" : "0"} disabled={updateUserLoading}>
                                                <SelectTrigger className={cn(`cursor-pointer ${buttonVariants({ variant: "outline", size: "sm" })}`, {
                                                    "bg-green-600 text-white": user.isApproved,
                                                    "bg-red-600 text-white": !user.isApproved,
                                                })}>
                                                    <SelectValue placeholder="Select a status" />
                                                    <SelectIcon>
                                                        <ChevronDown />
                                                    </SelectIcon>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">
                                                        Approved
                                                    </SelectItem>
                                                    <SelectItem value="0">
                                                        Not Approved
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="w-1/2">
                                            {format(new Date(user.createdAt), "hh:mm a, dd MMM yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            <ShowWalletModal userID={user._id}>
                                                <Button size="icon" variant="ghost"><EllipsisVertical /></Button>
                                            </ShowWalletModal>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                    </TableBody>
                </Table>
                {(!usersLoading && ((users?.meta.totalPages || 1) > 1)) && (
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
                                    {Array.from({ length: users?.meta.totalPages || 1 }, (_, i) => i + 1).map((page) => (
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
                                            "pointer-events-none opacity-50": currentPage === users?.meta.totalPages
                                        })} onClick={() => setCurrentPage(prev => {
                                            if (prev === users?.meta.totalPages) return prev;
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

export default Users;