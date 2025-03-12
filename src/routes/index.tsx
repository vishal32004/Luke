import { RouteConfig } from "@/types/routes";
import authRoutes from "./AuthRoutes";
import adminRoutes from "./AdminRoutes";
import NotFound from "@/components/404";
import { Navigate } from "react-router-dom";

const routes: RouteConfig[] = [
  ...authRoutes,
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" />,
  },
  adminRoutes,
  { path: "*", element: <NotFound /> },
];

export default routes;
