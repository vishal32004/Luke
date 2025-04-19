import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/Navigation/admin-sidebar";
import Navbar from "@/components/Navigation/admin-navbar";
import Footer from "@/components/Navigation/footer";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const AppLayout = () => (
  <SidebarProvider
    style={{ "--sidebar-width": "275px" } as React.CSSProperties}
  >
    <AdminSidebar />
    <div className="w-full">
      <Navbar />
      <main className="bg-second h-full">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  </SidebarProvider>
);

export default AppLayout;
