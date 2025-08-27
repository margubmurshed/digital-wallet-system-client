import bg from "@/assets/images/team-work.png"
import MargubMurshedPhoto from "@/assets/images/margub-murshed-photo.png"
import BlurInText from "@/components/BlurInText";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Shield, Zap, Users, Rocket } from "lucide-react";

const About = () => {

    // Company Values / Principles
    const aboutValues = [
        {
            icon: <Shield className="h-10 w-10"/>,
            title: "Trust",
            description: "Security and transparency are our top priorities.",
        },
        {
            icon: <Zap className="h-10 w-10"/>,
            title: "Efficiency",
            description: "Instant transactions with minimal fees for all users.",
        },
        {
            icon: <Users className="h-10 w-10"/>,
            title: "Inclusivity",
            description: "Services designed for everyone, urban or rural.",
        },
        {
            icon: <Rocket className="h-10 w-10"/>,
            title: "Innovation",
            description: "Continuously improving with the latest technologies.",
        },
    ];

    const aboutTeam = [
        {
            picture: MargubMurshedPhoto,
            name: "Margub Murshed",
            title: "Full Stack Developer",
            links: {
                facebook: "https://www.facebook.com/margub32",
                linkedin: "https://www.linkedin.com/in/margubmurshed"
            }
        }
    ]

    return (
        <section className="p-5">
            <div className="flex flex-col items-center container mx-auto pt-10 space-y-20">
                <div className="text-center max-w-3xl">
                    <BlurInText text="Who We Are" className="justify-center" />
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        We are a digital-first financial platform built to simplify everyday transactions. Our journey began with a vision to replace long queues at banks and the hassle of carrying cash with something secure, accessible, and user-friendly.
                    </motion.p>
                </div>
                <div>
                    <motion.img
                        src={bg}
                        alt="bg"
                        className="max-w-2xl w-full"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                </div>
                {/* Our values */}
                <div className="space-y-5">
                    <motion.h3 className="text-4xl text-center font-semibold">Our Values</motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {aboutValues.map((item, i) => (
                            <motion.div
                                className={cn("shadow-md p-5 space-y-3 border border-primary dark:hover:text-black hover:text-white hover:bg-primary transition rounded-md flex flex-col items-center text-center hover:-translate-y-2", {
                                    "bg-primary text-white dark:text-black": i%2===1
                                })}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.2 }}
                            >
                                <div>{item.icon}</div>
                                <h3 className="text-2xl font-semibold">{item.title}</h3>
                                <p className="text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="space-y-5 w-full">
                    <motion.h3 className="text-4xl text-center font-semibold">Our Team</motion.h3>
                    <div className="grid md:grid-cols-2 gap-3">
                        {aboutTeam.map((item, i) => (
                            <motion.div
                                className={cn("shadow-md p-5 space-y-3 border border-primary hover:text-white dark:hover:text-black hover:bg-primary transition rounded-md flex flex-col items-center text-center hover:-translate-y-2", {
                                    "bg-primary text-white": i%2===1
                                })}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.2 }}
                            >
                                <div>
                                    <img src={item.picture} alt={item.name} className="w-20 h-20 rounded-full border-2 "/>
                                </div>
                                <h3 className="text-2xl font-semibold">{item.name}</h3>
                                <p className="text-sm">{item.title}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;