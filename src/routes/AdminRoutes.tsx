import Storefront from "@/pages/admin/Storefront";
import ViewCampaign from "@/pages/admin/ViewCampaign";
import Layout from "@/pages/Layout";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const CreateNewCampaign = lazy(() => import("@/pages/admin/CreateNewCampaign"));

const adminRoutes: RouteObject = {
  path: "/admin",
  element: <Layout />,
  children: [
    { path: "dashboard", element: <Dashboard /> },
    { path: "create-new-campaign", element: <CreateNewCampaign /> },
    { path: "view-campaign", element: <ViewCampaign /> },
    { path: "storefront", element: <Storefront /> },
  ],
};

export default adminRoutes;
