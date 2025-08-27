import { userRoles } from "@/constants/role";
import type { ISidebarItem, TRole } from "@/types";
import { withAuth } from "@/utils/useAuth";
import { lazy } from "react";

const Users = lazy(() => import("@/pages/Admin/Users"));
const Agents = lazy(() => import("@/pages/Admin/Agents"));
const Transactions = lazy(() => import("@/pages/Admin/Transactions"));
const Profile = lazy(() => import("@/components/modules/User/Profile"));
const Settings = lazy(() => import("@/components/modules/Common/Settings"));


export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        items: [
            {
                title: "Dashboard Home",
                url: "/dashboard",
                component: withAuth(Users, [userRoles.ADMIN, userRoles.SUPER_ADMIN] as TRole[])
            },
            {
                title: "Manage Users",
                url: "/dashboard/users",
                component: withAuth(Users, [userRoles.ADMIN, userRoles.SUPER_ADMIN] as TRole[])
            },
            {
                title: "Manage Agents",
                url: "/dashboard/agents",
                component: withAuth(Agents, [userRoles.ADMIN, userRoles.SUPER_ADMIN] as TRole[])
            },
            {
                title: "View Transactions",
                url: "/dashboard/transactions",
                component: withAuth(Transactions, [userRoles.ADMIN, userRoles.SUPER_ADMIN] as TRole[])
            },
            {
                title: "Profile",
                url: "/dashboard/profile",
                component: withAuth(Profile, [userRoles.ADMIN, userRoles.SUPER_ADMIN] as TRole[])
            },
            {
                title: "Settings",
                url: "/dashboard/settings",
                component: withAuth(Settings, [userRoles.ADMIN, userRoles.SUPER_ADMIN] as TRole[])
            },
        ],
    }
]
