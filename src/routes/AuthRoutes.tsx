import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";

const Login = lazy(() => import("@/pages/Authentication/Login"));
const SignUp = lazy(() => import("@/pages/Authentication/SignUp"));

const AuthRoutes: RouteObject = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "signup", element: <SignUp /> },
  ],
};

export default AuthRoutes;
