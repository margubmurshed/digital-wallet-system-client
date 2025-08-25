import EmailInput from "@/components/EmailInput";
import RegisterPasswordInput from "@/components/RegisterPasswordInput";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation, useUserQuery } from "@/redux/features/auth/auth.api";
import { updateUserZodSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

function Profile() {
    const { data: userData, isLoading: userLoading } = useUserQuery();
    const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();
    const [password, setPassword] = useState("");
    const form = useForm({
        resolver: zodResolver(updateUserZodSchema),
        defaultValues: {
            name: "",
            phone: "",
        }
    })

    useEffect(() => {
        if (userData?.data) {
            form.reset({
                name: userData.data.name,
                phone: userData.data.phone
            })
        }
    }, [form, userData])

    const onSubmit = async (values: z.infer<typeof updateUserZodSchema>) => {
        const updateUserData = {
            _id: userData?.data._id as string,
            ...values
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <Card className="w-full mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Your Profile</CardTitle>
                    <CardDescription>
                        Update your information if needed and hit update
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id="profile-form">
                            <div className="flex flex-col gap-6">
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
                                    <EmailInput value={userData?.data.email} disabled />
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
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" form="profile-form" disabled={updateUserLoading || userLoading}>
                        Update Profile
                    </Button>
                </CardFooter>
            </Card>
            <Card className="w-full mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Update Password</CardTitle>
                    <CardDescription>
                        Update your password if needed and hit update
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        <Label>Password</Label>
                        <RegisterPasswordInput value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="button" className="w-full" onClick={() => onSubmit({ password })} disabled={updateUserLoading || userLoading}>
                        Update Password
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile;