import featuresImage from "@/assets/images/undraw_features-overview_uone.svg"
import BlurInText from "@/components/BlurInText";
import { motion } from "framer-motion";
import { Wallet, Repeat, Smartphone, AlertCircle, DollarSign, FileText, Activity, Settings, Users, BarChart2, User, CheckCircle, UserCheck, Crown } from "lucide-react";
const Features = () => {


    const userFeatures = [
        {
            icon: <Wallet />,
            title: "Digital Wallet",
            description: "Add, send, and withdraw money easily.",
        },
        {
            icon: <Repeat />,
            title: "Transaction History",
            description: "With advanced filtering, pagination, and options.",
        },
        {
            icon: <Smartphone />,
            title: "Mobile-Friendly",
            description: "Works seamlessly on any device.",
        },
        {
            icon: <AlertCircle />,
            title: "Fraud Protection",
            description: "Built-in monitoring and alerts for your safety.",
        },
    ];

    const agentFeatures = [
        {
            icon: <DollarSign />,
            title: "Cash-In / Cash-Out",
            description: "Deposit or withdraw funds for your customers securely.",
        },
        {
            icon: <FileText />,
            title: "Commission Tracking",
            description: "Transparent reporting of your earnings.",
        },
        {
            icon: <Activity />,
            title: "Activity Dashboard",
            description: "Monitor daily operations easily.",
        },
    ];

    const adminFeatures = [
        {
            icon: <Users />,
            title: "User & Agent Management",
            description: "Approve, suspend, or block accounts as needed.",
        },
        {
            icon: <BarChart2 />,
            title: "System Analytics",
            description: "Track transactions, volumes, and trends.",
        },
        {
            icon: <Settings />,
            title: "System Configurations",
            description: "Adjust fees, limits, and operational rules.",
        },
    ];


    return (
        <section className="p-5">
            <div className="flex flex-col items-center container mx-auto pt-10 space-y-20 relative">
                <div className="text-center max-w-3xl">
                    <BlurInText text="Our Features" className="justify-center" />
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Our digital wallet provides a complete set of tools for Users, Agents, and Admins. From secure, instant transfers and detailed transaction tracking to fraud protection and powerful analytics, everything is designed to simplify financial management and give you full control.
                    </motion.p>
                </div>
                <div>
                    <motion.img
                        src={featuresImage}
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
                    <motion.h3 className="text-4xl text-center font-semibold">Role Features</motion.h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                        <motion.div
                            className="shadow-md p-5 space-y-3 border border-primary dark:hover:text-black transition rounded-md flex flex-col items-start text-left hover:-translate-y-2 bg-primary text-white dark:text-black w-full"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        >
                            <div className="flex">
                                <div className="bg-white rounded-full p-5 text-primary">
                                    <User className="w-10 h-10 m-0" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold">User Features</h3>
                            <ul className="flex flex-col items-start text-left w-full space-y-3">
                                {userFeatures.map((item, i) => (
                                    <li className="text-left w-full flex items-center gap-3 space-y-3" key={i}>
                                        <span className="m-0"><CheckCircle /></span>
                                        <span>{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            className="shadow-md p-5 space-y-3 border border-purple-500 dark:hover:text-black transition rounded-md flex flex-col items-start text-left hover:-translate-y-2 bg-purple-500 text-white dark:text-black w-full"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                        >
                            <div className="flex">
                                <div className="bg-white rounded-full p-5 text-purple-500">
                                    <UserCheck className="w-10 h-10 m-0" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold">Agent Features</h3>
                            <ul className="flex flex-col items-start text-left w-full space-y-3">
                                {agentFeatures.map((item, i) => (
                                    <li className="text-left w-full flex items-center gap-3 space-y-3" key={i}>
                                        <span className="m-0"><CheckCircle /></span>
                                        <span>{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            className="shadow-md p-5 space-y-3 border border-red-500 dark:hover:text-black transition rounded-md flex flex-col items-start text-left hover:-translate-y-2 bg-red-500 text-white dark:text-black w-full"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                        >
                            <div className="flex">
                                <div className="bg-white rounded-full p-5 text-red-500">
                                    <Crown className="w-10 h-10 m-0" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold">Admin Features</h3>
                            <ul className="flex flex-col items-start text-left w-full space-y-3">
                                {adminFeatures.map((item, i) => (
                                    <li className="text-left w-full flex items-center gap-3 space-y-3" key={i}>
                                        <span className="m-0"><CheckCircle /></span>
                                        <span>{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            className="shadow-md p-5 space-y-3 border border-orange-500 dark:hover:text-black transition rounded-md flex flex-col items-start text-left hover:-translate-y-2 bg-orange-500 text-white dark:text-black w-full"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
                        >
                            <div className="flex">
                                <div className="bg-white rounded-full p-5 text-orange-500">
                                    <Settings className="w-10 h-10 m-0" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold">General Features</h3>
                            <ul className="flex flex-col items-start text-left w-full space-y-3">
                                {adminFeatures.map((item, i) => (
                                    <li className="text-left w-full flex items-center gap-3 space-y-3" key={i}>
                                        <span className="m-0"><CheckCircle /></span>
                                        <span>{item.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;