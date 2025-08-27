import { useLocation } from "react-router"

const ROUTES = [
    { path: "/", title: "Home" },
  { path: "/about", title: "About" },
  { path: "/contact", title: "Contact" },
  { path: "/faq", title: "FAQ" },
  { path: "/features", title: "Features" },
  { path: "/pricing", title: "Pricing" },
  { path: "/login", title: "Login" },
  { path: "/register", title: "Register" },
  { path: "/dashboard", title: "Home" },
  { path: "/dashboard", title: "Home" },
  { path: "/dashboard/agents", title: "Agents" },
  { path: "/dashboard/users", title: "Users" },
  { path: "/dashboard/transactions", title: "Transactions" },
  { path: "/dashboard/profile", title: "Profile" },
  { path: "/dashboard/settings", title: "Settings" },
]

const APP_NAME = "Digital Wallet System";

export function usePageTitle () {
    const {pathname} = useLocation();

    const match = ROUTES.find(r => r.path === pathname);

    if(!match) return APP_NAME;

    if(pathname.startsWith("/dashboard")){
        return `${match.title} | Dashboard | ${APP_NAME}`
    }

    return `${match.title} | ${APP_NAME}`
}