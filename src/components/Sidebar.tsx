import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link, useLocation } from "react-router"
import { adminSidebarItems } from "@/routes/adminSidebarItems";

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();
    const data = {
        navMain: adminSidebarItems.map(item => ({
            ...item,
            items: item.items.map(subItem => ({
                ...subItem,
                isActive: location.pathname === subItem.url
            }))
        })),
    }
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <Link to="/" className="flex flex-col items-center justify-center gap-1">
                    <Logo />
                    <h2 className="font-bold">Digital Wallet System</h2>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        {item.title && <SidebarGroupLabel>{item.title}</SidebarGroupLabel>}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <Link to={item.url}>{item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
