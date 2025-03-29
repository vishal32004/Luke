import { RouteConfig } from "@/types/routes";
import authRoutes from "./AuthRoutes";
import NotFound from "@/components/404";
import Dashboard from "@/pages/Dashboard";
import CreateNewCampaign from "@/pages/CreateNewCampaign";
import ViewCampaign from "@/pages/ViewCampaign";
import Storefront from "@/pages/Storefront";
import Admin from "@/pages/Admin";
import EmailTemplatesGallery from "@/pages/Email-template";

const routes: RouteConfig[] = [
  ...authRoutes,
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/create-new-campaign",
    element: <CreateNewCampaign />,
  },
  {
    path: "/view-campaign",
    element: <ViewCampaign />,
  },
  {
    path: "/storefront",
    element: <Storefront />,
  },
  {
    path: "/admins",
    element: <Admin />,
  },
  {
    path: "/email-template",
    element: <EmailTemplatesGallery />,
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
