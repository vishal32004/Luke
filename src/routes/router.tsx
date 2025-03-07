import { RouteType } from "@/types/route.type";
import { Route, Routes } from "react-router-dom";

const AppRoutes = ({ routes }: { routes: RouteType[] }) => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.title} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
