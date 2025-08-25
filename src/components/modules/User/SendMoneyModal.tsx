import { Alert } from "@/components/ui/alert"
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
import { useGetUsersQuery } from "@/redux/features/user/user.api"
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api"
import { sendMoneyZodSchema } from "@/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2Icon, Search, XIcon } from "lucide-react"
import { useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type z from "zod"

interface SendMoneyModalProps {
    children: ReactNode
}

export function SendMoneyModal({ children }: SendMoneyModalProps) {
    const [sendMoney, { isLoading: sendMoneyLoading }] = useSendMoneyMutation();
    const [open, setIsOpen] = useState(false);
    const [term, setTerm] = useState("");
    const { data: users, isFetching } = useGetUsersQuery({ phone: term });

    const form = useForm({
        resolver: zodResolver(sendMoneyZodSchema),
        defaultValues: {
            amount: 0,
            receiverPhoneNumber: ""
        }
    })
    const reveiverPhoneNumber = form.watch("receiverPhoneNumber");
    const handleSearch = () => {
        setTerm(reveiverPhoneNumber)
    }

    const onSubmit = async (values: z.infer<typeof sendMoneyZodSchema>) => {
        try {
            const response = await sendMoney(values).unwrap();

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
                    <DialogTitle>Send Money</DialogTitle>
                    <DialogDescription>
                        Click send when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="receiverPhoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Receiver phone number</FormLabel>
                                            <div className="flex">
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="Enter receiver phone number"
                                                        className="rounded-tr-none rounded-br-none"
                                                        {...field}
                                                        required />
                                                </FormControl>
                                                <Button className="rounded-tl-none rounded-bl-none" onClick={handleSearch} type="button" disabled={isFetching}><Search /></Button>

                                            </div>
                                            {(users?.data[0] && !isFetching) ? (
                                                <Alert className="bg-green-200 text-green-900">
                                                    <CheckCircle2Icon />
                                                    <p>{users?.data[0].name} {`(${users?.data[0].phone})`}</p>
                                                </Alert>
                                            ) : (term !== "" && !isFetching) && (
                                                <Alert className="bg-red-200 text-red-900">
                                                    <XIcon />
                                                    <p>User not found</p>
                                                </Alert>
                                            )}
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
                                                    placeholder="Enter send money amount"
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
                            <Button type="submit" disabled={sendMoneyLoading}>Send Money</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
