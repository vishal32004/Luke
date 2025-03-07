import { RouteType } from "@/types/route.type";
import { lazy } from "react";

const Login = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const RewardsPoints = lazy(() => import("@/pages/admin/Send-Rewards/Point"));
const RewardsCodes = lazy(() => import("@/pages/admin/Send-Rewards/Code"));

export const AppRouteData: RouteType[] = [
  {
    path: "/login",
    element: <Login />,
    title: "Login",
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    title: "Dashboard",
  },
];
export const DashboardRoutes: RouteType[] = [
  {
    path: "/send-rewards/points",
    element: <RewardsPoints />,
    title: "Send Rewards Points",
  },
  {
    path: "/send-rewards/codes",
    element: <RewardsCodes />,
    title: "Send Rewards Code",
  },
];
