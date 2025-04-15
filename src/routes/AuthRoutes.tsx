import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = lazy(() => import("@/pages/Authentication/Login"));
const SignUp = lazy(() => import("@/pages/Authentication/SignUp"));

const authRoutes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
];

export default authRoutes;
