import contactImage from "@/assets/images/undraw_contact-us_kcoa.svg"
import BlurInText from "@/components/BlurInText";
import EmailInput from "@/components/EmailInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { inquiryFormSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Building, Mail, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";

const Contact = () => {
    const inquiryForm = useForm({
        resolver: zodResolver(inquiryFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        }
    })

    const onSubmit = (values: z.infer<typeof inquiryFormSchema>) => {
        console.log(values)
    }

    return (
        <section className="p-5">
            <div className="flex flex-col items-center container mx-auto pt-10 space-y-20">
                <div className="text-center max-w-3xl">
                    <BlurInText text="Contact Us" className="justify-center" />
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Have questions or need assistance? Our dedicated support team is here for you 24/7. Whether it’s about your account, transactions, or general inquiries, we’re ready to help. Reach out via email, phone, or our contact form, and we’ll get back to you promptly.
                    </motion.p>
                </div>
                <div>
                    <motion.img
                        src={contactImage}
                        alt="pricing-bg"
                        className="max-w-2xl w-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative w-full">
                    <div className="bg-primary text-white rounded-xl lg:sticky top-24 p-5 space-y-3 h-fit">
                        <h3 className="text-2xl font-semibold">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5" />
                                <div className="flex flex-col ">
                                    <h4 className="font-medium">Phone</h4>
                                    <p>+8801988474979</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5" />
                                <div className="flex flex-col ">
                                    <h4 className="font-medium">Email</h4>
                                    <p>murshedmargub@gmail.com</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Building className="w-5 h-5" />
                                <div className="flex flex-col ">
                                    <h4 className="font-medium">Address</h4>
                                    <p>Dhaka, Bangladesh</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Card className="w-full mx-auto">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">Inquiry Form</CardTitle>
                                <CardDescription>
                                    Have a question or feedback? Fill out the form below, and our support team will respond as quickly as possible. We’re here to help with account issues, transactions, or any other inquiries you may have.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...inquiryForm}>
                                    <form onSubmit={inquiryForm.handleSubmit(onSubmit)} id="inquiry-form">
                                        <div className="flex flex-col gap-6">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={inquiryForm.control}
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
                                                    control={inquiryForm.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <EmailInput
                                                                    placeholder="Enter your email"
                                                                    {...field}
                                                                    required
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={inquiryForm.control}
                                                    name="message"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Message</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Enter message" {...field} required />
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
                                <Button type="submit" className="w-full" form="inquiry-form" disabled={!inquiryForm.formState.isDirty}>
                                    <Send />
                                    Send Message
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;