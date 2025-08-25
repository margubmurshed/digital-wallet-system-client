import { userRoles } from "@/constants/role";
import type { ISidebarItem, TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/useAuth";
import { lazy } from "react";

const Users = lazy(() => import("@/components/modules/Admin/Users"));
const Agents = lazy(() => import("@/components/modules/Admin/Agents"));
const Transactions = lazy(() => import("@/components/modules/Admin/Transactions"));
const Profile = lazy(() => import("@/components/modules/User/Profile"));


export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        items: [
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
        ],
    }
]


console.log(generateRoutes(adminSidebarItems))