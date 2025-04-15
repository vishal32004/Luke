import { RouteConfig } from "@/types/routes";
import authRoutes from "./AuthRoutes";
import NotFound from "@/pages/404";
import Dashboard from "@/pages/Dashboard";
import CreateNewCampaign from "@/pages/Campaign/CreateNewCampaign";
import ViewCampaign from "@/pages/Campaign/ViewCampaign";
import Storefront from "@/pages/Storefront";
import Admin from "@/pages/Admin/Admin";
import EmailTemplatesGallery from "@/pages/Email-Template/Email-template";
import Payment from "@/pages/Balance/Payment";
import AddFunds from "@/pages/Balance/AddFunds";
import TransactionHistory from "@/pages/Balance/TransationHistroy";
import NotificationSettings from "@/pages/Notification";
import LandingPageList from "@/pages/Landing-Page-Template/LandingPageList";
import PreviewLandingTemplate from "@/pages/Landing-Page-Template/PreviewLandingPage";
import EditLandingPageTemplate from "@/pages/Landing-Page-Template/EditLandingPageTemplate";

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
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/add-funds",
    element: <AddFunds />,
  },
  {
    path: "/transation-history",
    element: <TransactionHistory />,
  },
  {
    path: "/notification",
    element: <NotificationSettings />,
  },
  {
    path: "/landing-page",
    element: <LandingPageList />,
  },
  {
    path: "/landing/:id/preview",
    element: <PreviewLandingTemplate />,
  },
  {
    path: "/landing/:id/edit",
    element: <EditLandingPageTemplate />,
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
