import FullPageLoader from "@/components/FullPageLoader";
import { useUserQuery } from "@/redux/features/auth/auth.api";
import bg from "@/assets/images/user-dashboard-background-image.jpg"
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, PlusCircle } from "lucide-react";
import { formatAmount } from "@/utils/formatAmount";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Profile from "@/components/modules/User/Profile";
import Transactions from "@/components/modules/User/Transactions";
import Navbar from "@/components/Layouts/Navbar";
import { CashInModal } from "@/components/modules/Agent/CashInModal";
import Footer from "@/components/Layouts/Footer";
import Settings from "@/components/modules/Common/Settings";

const AgentDashboard = () => {
    const { data: userData, isLoading: userLoading } = useUserQuery();
    const { data: walletData, isLoading: walletLoading } = useGetMyWalletQuery();

    if (userLoading) {
        return <FullPageLoader />
    }

    const user = userData?.data;
    const wallet = walletData?.data

    return (
        <div>
            <Navbar />
            <div className="border max-h-60 relative">
                <img src={bg} alt="user-dashboard-bg-image" className="absolute w-full h-full bg-center" />
                <div className="container mx-auto text-center gap-3 flex flex-col items-center mt-40 z-10 relative">
                    <div className="w-32 h-32 rounded-full border-8 border-primary bg-background">
                        <img
                            src={"https://github.com/shadcn.png"}
                            alt={`${user?.name}-profile-picture`}
                            className="w-32 rounded-full"
                        />
                    </div>
                    <h2 className="text-3xl font-bold">{user?.name}</h2>
                    <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600 capitalize"
                    >
                        <BadgeCheckIcon />
                        {user?.role.split("_").join(" ").toLowerCase()}
                    </Badge>
                </div>
            </div>
            <div className="container mx-auto space-y-10 px-5 lg:p-0 mb-5">
                {/* stats */}
                <div className="mt-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {
                            walletLoading ? (
                                <>
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <Skeleton className="h-32 rounded-md" key={i} />
                                    ))}
                                </>
                            )
                                : (
                                    <div className="border rounded-md p-5 bg-green-500 text-white shadow-md">
                                        <h3 className="font-semibold">Balance</h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">৳</span>
                                            <p className="font-bold text-5xl">{formatAmount(wallet?.balance ? parseFloat(wallet.balance.toFixed(2)) : 0)}</p>
                                        </div>
                                    </div>
                                )}
                    </div>
                </div>
                {/* actions */}
                <div className="">
                    <h2 className="text-2xl font-semibold mb-3">Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

                        <CashInModal>
                            <div className={cn("border rounded-md p-5 bg-purple-500 text-white flex flex-col items-center gap-3 cursor-pointer select-none hover:bg-purple-400 hover:scale-105 transition", {
                                "pointer-events-none bg-gray-300": walletLoading || userLoading
                            })}>
                                <PlusCircle className="h-10 w-10" />
                                <h3 className="font-semibold text-2xl">Cash In</h3>
                            </div>
                        </CashInModal>

                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="self-center">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
                            <TabsTrigger value="transactions">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <Profile />
                        </TabsContent>
                        <TabsContent value="transactions">
                            <Transactions />
                        </TabsContent>
                        <TabsContent value="settings">
                            <Settings />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AgentDashboard;