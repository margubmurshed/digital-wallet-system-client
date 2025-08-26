import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useBlockWalletMutation, useGetSingleUserWalletQuery, useUnBlockWalletMutation } from "@/redux/features/wallet/wallet.api"
import { useEffect, useState, type ReactNode } from "react"
import { toast } from "sonner"

interface ShowWalletModalProps {
    userID: string;
    children: ReactNode
}

export function ShowWalletModal({ userID, children }: ShowWalletModalProps) {
    const { data, isLoading: walletLoading } = useGetSingleUserWalletQuery(userID);
    const [blockWallet, { isLoading: blockLoading }] = useBlockWalletMutation();
    const [unblockWallet, { isLoading: unblockLoading }] = useUnBlockWalletMutation();
    const [open, setIsOpen] = useState(false);
    const [walletStatus, setWalletStatus] = useState("");

    useEffect(() => {
        if (data?.data) {
            setWalletStatus(data.data.status)
        }
    }, [data])

    const handleStatusUpdate = async () => {

        try {
            if (walletStatus === "ACTIVE") {
                const response = await unblockWallet(userID).unwrap();

                if (response.success) {
                    toast.success(response.message);
                }
            } else {
                const response = await blockWallet(userID).unwrap();
                if (response.success) {
                    toast.success(response.message);
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.message || error.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {walletLoading ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                <Skeleton className="w-full h-5" />
                            </DialogTitle>
                            <DialogDescription>
                                <Skeleton className="w-full h-2" />
                                <Skeleton className="w-full h-2" />
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Skeleton className="w-full h-10" />
                            </div>
                            <div className="grid gap-3">
                                <Skeleton className="w-full h-10" />
                            </div>
                            <div className="grid gap-3">
                                <Skeleton className="w-full h-10" />
                            </div>
                            <div className="grid gap-3">
                                <Skeleton className="w-full h-10" />
                            </div>
                        </div>
                        <DialogFooter className="mt-3">
                            <div className="flex items-center justify-end">
                                <Skeleton className="w-5 h-5" />
                                <Skeleton className="w-5 h-5" />
                            </div>
                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Wallet Details</DialogTitle>
                            <DialogDescription>
                                Click update when you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label>User ID</Label>
                                <Input type="text" defaultValue={userID} disabled />
                            </div>
                            <div className="grid gap-3">
                                <Label>Wallet ID</Label>
                                <Input type="text" defaultValue={data?.data._id} disabled />
                            </div>
                            <div className="grid gap-3">
                                <Label>Balance</Label>
                                <Input type="number" defaultValue={data?.data.balance} disabled />
                            </div>
                            <div className="grid gap-3">
                                <Label>Wallet Status</Label>
                                <Select onValueChange={value => setWalletStatus(value)} value={walletStatus} disabled={blockLoading || unblockLoading}>
                                    <SelectTrigger className={cn(`cursor-pointer text-white`, {
                                        "bg-green-600 text-white": walletStatus === "ACTIVE",
                                        "bg-red-600 text-white": walletStatus === "BLOCKED",
                                    })}>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">
                                            Activated
                                        </SelectItem>
                                        <SelectItem value="BLOCKED">
                                            Blocked
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                            </DialogClose>
                            <Button type="button" onClick={handleStatusUpdate} disabled={blockLoading || unblockLoading}>Update Wallet</Button>
                        </DialogFooter>
                    </>
                )}

            </DialogContent>
        </Dialog >
    )
}
