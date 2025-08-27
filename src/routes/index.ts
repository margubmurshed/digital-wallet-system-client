import PrimaryLayout from "@/components/Layouts/PrimaryLayout";
import { userRoles } from "@/constants/role";
import Dashboard from "@/pages/Dashboard";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/useAuth";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import DashboardIndex from "@/pages/Admin/DashboardIndex";
import About from "@/pages/About";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Contact from "@/pages/Contact";

export const router = createBrowserRouter([
    {
        path: "/", Component: PrimaryLayout, children: [
            { index: true, Component: Landing },
            { path: "about", Component: About },
            { path: "pricing", Component: Pricing },
            { path: "faq", Component: FAQ },
            { path: "features", Component: Features },
            { path: "contact", Component: Contact },
        ]
    },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    {
        path: "/dashboard", Component: withAuth(Dashboard, Object.values(userRoles) as TRole[]), children: [
            { index: true, Component: DashboardIndex },
            ...generateRoutes(adminSidebarItems)
        ]
    },
])