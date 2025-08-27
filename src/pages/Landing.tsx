import Hero from "@/components/modules/Landing/Hero";
import { createLandingTour } from "@/driverTour";
import { useEffect } from "react";

const Landing = () => {
    useEffect(() => {
        const tour = createLandingTour();
        tour.drive();
    },[])
    return (
        <div>
            <Hero />
        </div>
    );
};

export default Landing;