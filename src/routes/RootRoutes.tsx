import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";

const RootRoutes = () => {
  return useRoutes([AuthRoutes, AppRoutes]);
};

export default RootRoutes;
