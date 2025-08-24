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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useWithdrawMoneyMutation } from "@/redux/features/wallet/wallet.api"
import { withdrawMoneyZodSchema } from "@/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type z from "zod"

interface WithdrawMoneyModalProps {
    children: ReactNode
}

export function WithdrawMoneyModal({ children }: WithdrawMoneyModalProps) {
    const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();
    const [open, setIsOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(withdrawMoneyZodSchema),
        defaultValues: {
            amount: 0
        }
    })

    const onSubmit = async (values: z.infer<typeof withdrawMoneyZodSchema>) => {
        try {
            const response = await withdrawMoney(values).unwrap();

            if (response.success) {
                toast.success(response.message);
                setIsOpen(false)
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
                <DialogHeader>
                    <DialogTitle>Withdraw Money</DialogTitle>
                    <DialogDescription>
                        Click withdraw when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{`Amount (৳)`}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter withdraw money amount"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="mt-3">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>Withdraw Money</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
