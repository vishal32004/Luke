import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Code = lazy(() => import("../pages/admin/Send-Rewards/Code"));
const Point = lazy(() => import("../pages/admin/Send-Rewards/Point"));
const Dashboard = () => {
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "250px",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="flex justify-center w-full">
            <Routes>
              <Route
                path=""
                element={<Navigate to="send-rewards/codes" replace />}
              />
              <Route path="send-rewards/codes" element={<Code />} />
              <Route path="send-rewards/points" element={<Point />} />
            </Routes>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
