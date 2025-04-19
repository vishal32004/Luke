import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const AuthLayout = () => (
  <div className="auth-layout-wrapper">
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  </div>
);

export default AuthLayout;
