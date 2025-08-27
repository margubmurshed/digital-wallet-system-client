import FullPageLoader from "@/components/FullPageLoader";
import { useUserQuery } from "@/redux/features/auth/auth.api";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, MinusCircle, PlusCircle, Send } from "lucide-react";
import { formatAmount } from "@/utils/formatAmount";
import { FaSignOutAlt } from "react-icons/fa";
import { AddMoneyModal } from "@/components/modules/User/AddMoneyModal";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { WithdrawMoneyModal } from "@/components/modules/User/WithdrawMoneyModal";
import { CashoutModal } from "@/components/modules/User/CashoutModal";
import { SendMoneyModal } from "@/components/modules/User/SendMoneyModal";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Profile from "@/components/modules/User/Profile";
import Transactions from "@/components/modules/User/Transactions";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";

const UserDashboard = () => {
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
            <div className="max-h-60 relative">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.3), transparent)`,
                    }}
                />
                <div className="container mx-auto text-center gap-3 flex flex-col items-center pt-40 z-10 relative">
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
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
                        <AddMoneyModal>
                            <div className={cn("border rounded-md p-5 bg-orange-500 text-white flex flex-col items-center gap-3 cursor-pointer select-none hover:bg-orange-400 hover:scale-105 transition", {
                                "pointer-events-none bg-gray-300": walletLoading || userLoading
                            })}>
                                <PlusCircle className="h-10 w-10" />
                                <h3 className="font-semibold text-2xl">Add Money</h3>
                            </div>
                        </AddMoneyModal>
                        <WithdrawMoneyModal>
                            <div className={cn("border rounded-md p-5 bg-red-500 text-white flex flex-col items-center gap-3 cursor-pointer select-none hover:bg-red-400 hover:scale-105 transition", {
                                "pointer-events-none bg-gray-300": walletLoading || userLoading
                            })}>
                                <MinusCircle className="h-10 w-10" />
                                <h3 className="font-semibold text-2xl">Withdraw Money</h3>
                            </div>
                        </WithdrawMoneyModal>
                        <CashoutModal>
                            <div className={cn("border rounded-md p-5 bg-purple-500 text-white flex flex-col items-center gap-3 cursor-pointer select-none hover:bg-purple-400 hover:scale-105 transition", {
                                "pointer-events-none bg-gray-300": walletLoading || userLoading
                            })}>
                                <FaSignOutAlt className="h-10 w-10" />
                                <h3 className="font-semibold text-2xl">Cash Out</h3>
                            </div>
                        </CashoutModal>
                        <SendMoneyModal>
                            <div className={cn("border rounded-md p-5 bg-cyan-500 text-white flex flex-col items-center gap-3 cursor-pointer select-none hover:bg-cyan-400 hover:scale-105 transition", {
                                "pointer-events-none bg-gray-300": walletLoading || userLoading
                            })}>
                                <Send className="h-10 w-10" />
                                <h3 className="font-semibold text-2xl">Send Money</h3>
                            </div>
                        </SendMoneyModal>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="self-center">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <Profile />
                        </TabsContent>
                        <TabsContent value="transactions">
                            <Transactions />
                        </TabsContent>
                        <TabsContent value="settings">
                            <Transactions />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;