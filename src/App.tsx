import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import routes from "@/routes";
import { RouteConfig } from "@/types/routes";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import Navbar from "@/components/admin-navbar";
import "./App.css";

const createRoutes = (routes: RouteConfig[]) =>
  routes.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {createRoutes(route.children)}
        </Route>
      );
    }
    return <Route key={index} path={route.path} element={route.element} />;
  });

const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "300px",
          } as React.CSSProperties
        }
      >
        <AdminSidebar />
        <SidebarInset>
          <Navbar />
          <main className="bg-second h-full">
            <Suspense fallback={<Loader />}>
              <Routes>
                {createRoutes(routes)}
                <Route path="/test" element={<div>Test Route Works!</div>} />
              </Routes>
            </Suspense>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </BrowserRouter>
  );
};

export default App;
