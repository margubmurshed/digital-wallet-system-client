import pricingImage from "@/assets/images/undraw_pricing-page_88g4.svg"
import BlurInText from "@/components/BlurInText";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Percent, Users } from "lucide-react";

const Pricing = () => {


    const pricingFees = [
        {
            icon: <ArrowDown className="w-10 h-10" />,
            title: "Cash-In (Deposit)",
            fee: "Free",
            description: "Deposit money into your wallet at no cost.",
        },
        {
            icon: <ArrowUp className="w-10 h-10" />,
            title: "Cash-Out (Withdraw)",
            fee: "1.5%",
            description: "Small fee applied per withdrawal transaction.",
        },
        {
            icon: <Users className="w-10 h-10" />,
            title: "Send Money (User → User)",
            fee: "1.5%",
            description: "Send funds to another user with a minimal service charge.",
        },
        {
            icon: <Percent className="w-10 h-10" />,
            title: "Agent Commission",
            fee: "0.8%",
            description: "Agents earn 0.8% of the profit on each cash-out transaction they handle.",
        },
    ];



    return (
        <section className="p-5">
            <div className="flex flex-col items-center container mx-auto pt-10 space-y-20">
                <div className="text-center max-w-3xl">
                    <BlurInText text="Our Pricing" className="justify-center" />
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Simple, transparent, and fair — that’s how we handle fees. With our wallet, you know exactly what you’re paying for every transaction. Whether depositing, withdrawing, sending money, or earning as an agent, our pricing is straightforward with no hidden charges. Enjoy seamless financial operations with confidence and clarity.
                    </motion.p>
                </div>
                <div>
                    <motion.img
                        src={pricingImage}
                        alt="pricing-bg"
                        className="max-w-2xl w-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                </div>
                {/* Our values */}
                <div className="space-y-5">
                    <motion.h3 className="text-2xl lg:text-4xl text-center font-semibold">Simple and Transparent Fees</motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {pricingFees.map((item, i) => (
                            <motion.div
                                className={cn("shadow-md p-5 space-y-3 border border-[#010100] transition rounded-md flex flex-col items-start text-left hover:-translate-y-2 relative dark:bg-primary dark:text-black", {
                                    "text-white bg-[#010100] dark:text-white": i === 3
                                })}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.2 }}
                            >
                                {i === 3 && <div
                                    className="absolute inset-0 z-0 w-full h-full rounded-md opacity-50"
                                    style={{
                                        background: "#000000",
                                        backgroundImage: `
                                            linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
                                            linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
                                        `,
                                        backgroundSize: "40px 40px",
                                    }}
                                />}
                                <div className="z-1 space-y-3">
                                    <div>{item.icon}</div>
                                    <p className="text-2xl lg:text-4xl font-semibold">{item.fee}</p>
                                    <h3 className="">{item.title}</h3>
                                    <p className="text-sm">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;