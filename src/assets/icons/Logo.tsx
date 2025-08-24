import logoImage from "@/assets/images/digital-wallet-system-logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string
}

const Logo = ({className}: LogoProps) => {
    return (
        <div>
            <img src={logoImage} alt="logo" className={cn("h-10", className)}/>
        </div>
    );
};

export default Logo;