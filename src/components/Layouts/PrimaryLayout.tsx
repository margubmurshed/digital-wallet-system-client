import { Outlet } from "react-router";
import ScrollToTop from "../ScrollToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useEffect } from "react";

const PrimaryLayout = () => {
    const title = usePageTitle();

    useEffect(() => {
        document.title = title;
    }, [title])
    
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Navbar />
            <div className="grow py-20">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default PrimaryLayout;