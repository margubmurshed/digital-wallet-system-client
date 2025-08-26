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

export const router = createBrowserRouter([
    {
        path: "/", Component: PrimaryLayout, children: [
            { index: true, Component: Landing },
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