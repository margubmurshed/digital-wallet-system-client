import PrimaryLayout from "@/components/Layouts/PrimaryLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/", Component: PrimaryLayout, children: [
            { index: true, Component: Landing },
        ]
    },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
])