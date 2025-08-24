import Logo from "@/assets/icons/Logo"
import { LoginForm } from "@/components/modules/Login/LoginForm"
import { Link } from "react-router"

export default function Login() {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link to="/" className="flex items-center gap-2 self-center font-medium">
                    <Logo className="h-8"/>
                    Digital Wallet System
                </Link>
                <LoginForm />
            </div>
        </div>
    )
}
