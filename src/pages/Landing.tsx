import Hero from "@/components/modules/Landing/Hero";
import CardMockupImage from "@/assets/images/credit-card-mockup.webp"
import { Link } from "react-router";
import { LinkIcon } from "lucide-react";

const Landing = () => {
    return (
        <div className="space-y-20">
            <Hero />
            <div className="container mx-auto">
                <h3 className="text-center">Powerful solutions engineered <br /> for global payments</h3>
                <div className="flex justify-center">
                    <div className="lg:min-w-xs rounded-lg px-2 py-5 border bg-primary relative overflow-visible text-white">
                        <div>
                            <h4 className="text-center text-xl font-semibold">For Personal</h4>
                            <div className="bg-white mx-5 mt-20 rounded-4xl relative overflow-visible pt-1">
                                <img
                                    src={CardMockupImage}
                                    alt="card_mockup"
                                    className="w-40 mx-auto -mt-16"
                                />
                            </div>
                        </div>
                        <div className="pt-3 flex justify-center items-center">
                            <Link to="/" className="flex gap-3 items-center">Learn More <LinkIcon /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;