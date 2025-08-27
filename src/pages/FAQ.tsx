import faqImage from "@/assets/images/undraw_faq_h01d.svg"
import BlurInText from "@/components/BlurInText";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {

    const faqList = [
        {
            question: "How do I create an account?",
            answer: "Click Get Started, choose your role (User/Agent), and complete the registration form. Verification is instant.",
        },
        {
            question: "Is my money safe?",
            answer: "Yes. We use AES-256 encryption, two-factor authentication, and continuous fraud monitoring.",
        },
        {
            question: "Can I send money internationally?",
            answer: "Not yet. Currently, transfers are domestic only. International support is planned for future releases.",
        },
        {
            question: "What are the transaction fees?",
            answer: "Deposits are free. Withdrawals and transfers have minimal service charges (see Pricing page).",
        },
        {
            question: "Can I reverse a transaction?",
            answer: "Transactions are instant and irreversible. Please double-check details before sending.",
        },
        {
            question: "How do I become an Agent?",
            answer: "Register as an Agent and await admin approval, usually within 24 hours.",
        },
        {
            question: "What can Admins do?",
            answer: "Admins manage users, agents, transactions, and system settings to ensure smooth operation.",
        },
    ];



    return (
        <section className="p-5">
            <div className="flex flex-col items-center container mx-auto pt-10 space-y-10 relative">
                <div className="text-center max-w-3xl">
                    <BlurInText text="Frequently Asked Questions" className="justify-center" />
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Find quick answers to common questions about accounts, transactions, agents, and admin features. Whether you’re new or an experienced user, our FAQ helps you resolve issues faster and get the most out of your digital wallet.
                    </motion.p>
                </div>
                <div>
                    <motion.img
                        src={faqImage}
                        alt="bg"
                        className="w-full max-w-lg"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                </div>
                {/* feature cards */}
                <div className="space-y-5 w-full">
                    <div className="max-w-2xl w-full mx-auto">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            defaultValue="item-1"
                        >

                            {faqList.map((faq, i) => (
                                <AccordionItem value={`item-${i + 1}`} key={i}>
                                    <AccordionTrigger className="lg:text-xl font-semibold">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 w-full">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;