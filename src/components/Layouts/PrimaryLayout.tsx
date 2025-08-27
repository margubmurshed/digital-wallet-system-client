import { Outlet } from "react-router";
import ScrollToTop from "../ScrollToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrimaryLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <Navbar />
            <div className="grow pt-10">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default PrimaryLayout;