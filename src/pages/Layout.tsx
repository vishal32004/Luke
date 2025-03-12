import Navbar from "@/components/admin-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "250px",
        } as React.CSSProperties
      }
    >
      <AdminSidebar />
      <SidebarInset>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
