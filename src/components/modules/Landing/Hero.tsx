import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
// import LandingImage1 from "@/assets/images/landing-image-1.png";
import WalletImage from "@/assets/images/undraw_stripe-payments_jxnn.svg"
import { Link } from "react-router";
import ShimmerButton from "@/components/ShimmerButton";
import BlurInText from "@/components/BlurInText";

const Hero = () => {
    return (
        <section>
            <div className="min-h-screen w-full relative bg-white pt-40 pb-10 -mt-20">
                {/* Cool Blue Glow Top */}
                <div
                    className="absolute inset-0 z-0 dark:hidden"
                    style={{
                        background: "#ffffff",
                        backgroundImage: `
                                radial-gradient(
                                circle at top center,
                                rgba(70, 130, 180, 0.5),
                                transparent 70%
                                )
                            `,
                        filter: "blur(80px)",
                        backgroundRepeat: "no-repeat",
                    }}
                />
                <div
                    className="absolute inset-0 z-0 dark:block hidden"
                    style={{
                        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
                    }}
                />

                <div className="relative z-10 container mx-auto px-5 lg:px-0">
                    <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="flex flex-col items-center lg:items-start gap-6 text-center">
                            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
                                <Logo />
                            </div>
                            <div className="lg:text-left">
                                <div>
                                    <BlurInText text="Your Money. Anytime, Anywhere." className="justify-center lg:justify-start"/>
                                </div>
                                <p className="mx-auto max-w-3xl text-muted-foreground lg:text-lg">
                                    Experience a modern way to manage your finances. Whether you’re paying bills, sending money to family, or managing business transactions — we’ve got you covered.
                                </p>
                            </div>
                            <div className="mt-6 flex justify-center gap-3">
                                <Button className="shadow-sm transition-shadow hover:shadow" asChild>
                                    <Link to="/dashboard">Get Started</Link>
                                </Button>
                                <ShimmerButton>
                                    <Link to="/features" className="flex items-center">
                                        Learn more{" "}
                                        <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                </ShimmerButton>
                            </div>
                        </div>
                        <div>
                            <img src={WalletImage} alt="landing-image-1" className="w-full" />
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col items-center gap-5">
                        <p className="font-medium text-muted-foreground lg:text-left">
                            Built with open-source technologies
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="https://ui.shadcn.com/"
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "group flex aspect-square h-12 items-center justify-center p-0",
                                )}
                            >
                                <img
                                    src="https://cdn-b.saashub.com/images/app/service_logos/278/44urh1su7a9c/large.png?1727901233"
                                    alt="shadcn/ui logo"
                                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                                />
                            </a>
                            <a
                                href="https://www.typescriptlang.org/"
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "group flex aspect-square h-12 items-center justify-center p-0",
                                )}
                            >
                                <img
                                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg"
                                    alt="TypeScript logo"
                                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                                />
                            </a>

                            <a
                                href="https://react.dev/"
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "group flex aspect-square h-12 items-center justify-center p-0",
                                )}
                            >
                                <img
                                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg"
                                    alt="React logo"
                                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                                />
                            </a>
                            <a
                                href="https://tailwindcss.com/"
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "group flex aspect-square h-12 items-center justify-center p-0",
                                )}
                            >
                                <img
                                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg"
                                    alt="Tailwind CSS logo"
                                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                                />
                            </a>
                            <a
                                href="https://redux-toolkit.js.org/"
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "group flex aspect-square h-12 items-center justify-center p-0",
                                )}
                            >
                                <img
                                    src="https://cdn.worldvectorlogo.com/logos/redux.svg"
                                    alt="Tailwind CSS logo"
                                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Hero;
