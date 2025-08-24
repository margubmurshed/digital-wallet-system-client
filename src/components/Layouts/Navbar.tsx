import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Logo from "@/assets/icons/Logo"
import { Link } from "react-router"
import { authApi, useLogoutMutation, useUserQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hooks"
import { userRoles } from "@/constants/role"
import type { TRole } from "@/types"
import { Skeleton } from "../ui/skeleton"
import ButtonLoader from "../ButtonLoader"

// Navigation links array to be used in both desktop and mobile menus
// const navigationLinks = [
//     { href: "#", label: "Home" },
//     {
//         label: "Features",
//         submenu: true,
//         type: "description",
//         items: [
//             {
//                 href: "#",
//                 label: "Components",
//                 description: "Browse all components in the library.",
//             },
//             {
//                 href: "#",
//                 label: "Documentation",
//                 description: "Learn how to use the library.",
//             },
//             {
//                 href: "#",
//                 label: "Templates",
//                 description: "Pre-built layouts for common use cases.",
//             },
//         ],
//     },
//     {
//         label: "Pricing",
//         submenu: true,
//         type: "simple",
//         items: [
//             { href: "#", label: "Product A" },
//             { href: "#", label: "Product B" },
//             { href: "#", label: "Product C" },
//             { href: "#", label: "Product D" },
//         ],
//     },
//     {
//         label: "About",
//         submenu: true,
//         type: "icon",
//         items: [
//             { href: "#", label: "Getting Started", icon: "BookOpenIcon" },
//             { href: "#", label: "Tutorials", icon: "LifeBuoyIcon" },
//             { href: "#", label: "About Us", icon: "InfoIcon" },
//         ],
//     },
// ]

export default function Navbar() {
    const { data, isLoading: userLoading } = useUserQuery(undefined);
    const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await logout(undefined).unwrap();
            dispatch(authApi.util.resetApiState());
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    const publicNavigationLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/Contact", label: "Contact" },
        { href: "/faq", label: "FAQ" },
    ]
    const authNavigationLink = [
        { href: "/dashboard", label: "Dashboard" },
    ]
    const navigationLinks = [
        ...publicNavigationLinks
    ]

    if (Object.values(userRoles).includes(data?.data.role as TRole)) {
        navigationLinks.push(...authNavigationLink)
    }

    return (
        <header className="border-b border-primary/10 px-4 md:px-6">
            <div className="flex h-16 items-center justify-between gap-4">
                {/* Left side */}
                <div className="flex items-center gap-2">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-64 p-1 md:hidden">
                            <NavigationMenu className="max-w-none *:w-full">
                                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem key={index} className="w-full">
                                            {/* {link.submenu ? (
                                                <>
                                                    <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                                                        {link.label}
                                                    </div>
                                                    <ul>
                                                        {link.items.map((item, itemIndex) => (
                                                            <li key={itemIndex}>
                                                                <NavigationMenuLink
                                                                    href={item.href}
                                                                    className="py-1.5"
                                                                >
                                                                    {item.label}
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            ) : (
                                            )} */}
                                            <NavigationMenuLink href={link.href} className="py-1.5">
                                                {link.label}
                                            </NavigationMenuLink>
                                            {/* Add separator between different types of items
                                            {index < navigationLinks.length - 1 &&
                                                // Show separator if:
                                                // 1. One is submenu and one is simple link OR
                                                // 2. Both are submenus but with different types
                                                ((!link.submenu &&
                                                    navigationLinks[index + 1].submenu) ||
                                                    (link.submenu &&
                                                        !navigationLinks[index + 1].submenu) ||
                                                    (link.submenu &&
                                                        navigationLinks[index + 1].submenu &&
                                                        link.type !== navigationLinks[index + 1].type)) && (
                                                    <div
                                                        role="separator"
                                                        aria-orientation="horizontal"
                                                        className="bg-border -mx-1 my-1 h-px w-full"
                                                    />
                                                )} */}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </PopoverContent>
                    </Popover>
                    {/* Main nav */}
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-primary hover:text-primary/90">
                            <Logo />
                        </a>
                        {/* Navigation menu */}
                        <NavigationMenu viewport={false} className="max-md:hidden">
                            <NavigationMenuList className="gap-2">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        {/* {link.submenu ? (
                                            <>
                                                <NavigationMenuTrigger className="text-muted-foreground hover:text-primary bg-transparent px-2 py-1.5 font-medium *:[svg]:-me-0.5 *:[svg]:size-3.5">
                                                    {link.label}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
                                                    <ul
                                                        className={cn(
                                                            link.type === "description"
                                                                ? "min-w-64"
                                                                : "min-w-48"
                                                        )}
                                                    >
                                                        {link.items.map((item, itemIndex) => (
                                                            <li key={itemIndex}>
                                                                <NavigationMenuLink
                                                                    href={item.href}
                                                                    className="py-1.5"
                                                                >
                                                                    
                                                                    {link.type === "icon" && "icon" in item && (
                                                                        <div className="flex items-center gap-2">
                                                                            {item.icon === "BookOpenIcon" && (
                                                                                <BookOpenIcon
                                                                                    size={16}
                                                                                    className="text-foreground opacity-60"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            )}
                                                                            {item.icon === "LifeBuoyIcon" && (
                                                                                <LifeBuoyIcon
                                                                                    size={16}
                                                                                    className="text-foreground opacity-60"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            )}
                                                                            {item.icon === "InfoIcon" && (
                                                                                <InfoIcon
                                                                                    size={16}
                                                                                    className="text-foreground opacity-60"
                                                                                    aria-hidden="true"
                                                                                />
                                                                            )}
                                                                            <span>{item.label}</span>
                                                                        </div>
                                                                    )}

                                                                    
                                                                    {link.type === "description" &&
                                                                        "description" in item ? (
                                                                        <div className="space-y-1">
                                                                            <div className="font-medium">
                                                                                {item.label}
                                                                            </div>
                                                                            <p className="text-muted-foreground line-clamp-2 text-xs">
                                                                                {item.description}
                                                                            </p>
                                                                        </div>
                                                                    ) : (
                                                                        
                                                                        !link.type ||
                                                                        (link.type !== "icon" &&
                                                                            link.type !== "description" && (
                                                                                <span>{item.label}</span>
                                                                            ))
                                                                    )}
                                                                </NavigationMenuLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                        )} */}
                                        <NavigationMenuLink
                                            href={link.href}
                                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                                        >
                                            {link.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        {userLoading && (
                            <div className="flex items-center gap-4">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        {/* icon placeholder */}
                                        <Skeleton className="h-4 w-4 rounded" />
                                        {/* text placeholder */}
                                        <Skeleton className="h-4 w-16 rounded" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/* Right side */}
                <div className="flex items-center gap-2">
                    {userLoading
                        ? <Button variant="outline" size="sm" className="text-sm" disabled><ButtonLoader /></Button>
                        : (data?.data?.email)
                            ? (
                                <>
                                    <Button onClick={handleLogout} variant="destructive" size="sm" className="text-sm cursor-pointer" disabled={logoutLoading}>
                                        {logoutLoading ? <ButtonLoader /> : "Logout"}
                                        <LogOut />
                                    </Button>
                                </>
                            )
                            : <Button size="sm" className="text-sm" asChild disabled={userLoading}>
                                <Link to="/login">Login</Link>
                            </Button>
                    }

                </div>
            </div>
        </header>
    )
}
