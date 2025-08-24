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
import { useCashOutMutation } from "@/redux/features/wallet/wallet.api"
import { cashOutZodSchema } from "@/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type z from "zod"

interface CashoutModalProps {
    children: ReactNode
}

export function CashoutModal({ children }: CashoutModalProps) {
    const [cashout, { isLoading }] = useCashOutMutation();
    const [open, setIsOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(cashOutZodSchema),
        defaultValues: {
            amount: 0,
            agentPhoneNumber: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof cashOutZodSchema>) => {
        try {
            const response = await cashout(values).unwrap();

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
                    <DialogTitle>Cash out Money</DialogTitle>
                    <DialogDescription>
                        Click cash out when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="agentPhoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Agent phone number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="Enter agent phone number"
                                                    {...field}
                                                    required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                                                    placeholder="Enter cashout amount"
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
                            <Button type="submit" disabled={isLoading}>Cash Out</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
