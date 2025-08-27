import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const BlurInText = ({ text = "Blur In Effect", className="" }: { text?: string, className?: string }) => {
    return (
        <h2 className={cn("text-4xl md:text-6xl font-bold flex flex-wrap gap-2 mb-5", className)}>
            {text.split(' ').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ 
                        opacity: 0,
                        filter: "blur(10px)"
                    }}
                    whileInView={{ 
                        opacity: 1,
                        filter: "blur(0px)"
                    }}
                    transition={{ 
                        delay: i * 0.05,
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    className="inline"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </h2>
    );
};


export default BlurInText;
