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
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet.api"
import { addMoneyZodSchema } from "@/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type z from "zod"

interface AddMoneyModalProps {
    children: ReactNode
}

export function AddMoneyModal({ children }: AddMoneyModalProps) {
    const [addMoney, { isLoading }] = useAddMoneyMutation();
    const [open, setIsOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(addMoneyZodSchema),
        defaultValues: {
            amount: 0
        }
    })

    const onSubmit = async (values: z.infer<typeof addMoneyZodSchema>) => {
        try {
            const response = await addMoney(values).unwrap();

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
                    <DialogTitle>Add Money</DialogTitle>
                    <DialogDescription>
                        Click add when you&apos;re done.
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
                                                    placeholder="Enter add money amount"
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
                            <Button type="submit" disabled={isLoading}>Add Money</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
