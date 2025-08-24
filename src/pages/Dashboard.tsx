import { userRoles } from "@/constants/role";
import { useUserQuery } from "@/redux/features/auth/auth.api";
import { Navigate } from "react-router";
import UserDashboard from "./User/UserDashboard";
import AgentDashboard from "./Agent/AgentDashboard";
import AdminDashboard from "./Admin/AdminDashboard";

const Dashboard = () => {
    const { data } = useUserQuery();
    const role = data?.data.role;

    if (role === userRoles.USER) return <UserDashboard />
    else if (role === userRoles.AGENT) return <AgentDashboard />
    else if (role === userRoles.ADMIN || role === userRoles.SUPER_ADMIN) return <AdminDashboard />
    else return <Navigate to="/" />
};

export default Dashboard;