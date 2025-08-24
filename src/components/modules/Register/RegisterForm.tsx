import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Switch from "@/components/Switch"
import RegisterPasswordInput from "@/components/RegisterPasswordInput"
import { useState } from "react";
import userBG from "@/assets/images/user-background-image.jpg";
import agentBG from "@/assets/images/agent-background-image.jpg";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import EmailInput from "@/components/EmailInput"
import { Link, useNavigate } from "react-router"
import { userRoles } from "@/constants/role"
import { registerFormSchema } from "@/validation"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [isAgent, setIsAgent] = useState("off");
    const [register, { isLoading: registerLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        const registerInfo = {
            ...values,
            role: isAgent === "off" ? userRoles.USER : userRoles.AGENT
        }

        try {
            const response = await register(registerInfo).unwrap();
            console.log(response);

            toast.success("User created successfully!");
            navigate("/login");

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error)
            toast.error(error.data.message)
        }
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome to Digital Wallet System</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Create a digital wallet system account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your full name" {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <EmailInput {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="Example : 01988474979" {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <RegisterPasswordInput {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="w-full flex justify-center gap-3">
                                    <Label htmlFor="password">Register as </Label>
                                    <Switch selectedValue={isAgent} setSelectedValue={setIsAgent} />
                                </div>
                                <Button type="submit" className="w-full" disabled={registerLoading}>
                                    Register as {isAgent === "off" ? "User" : "Agent"}
                                </Button>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline underline-offset-4">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src={isAgent === "off" ? userBG : agentBG}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
