import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "@/components/Loader";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("@/components/404"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/vishal/Luke/login" element={<Login />} />
          <Route path="/vishal/Luke/" element={<Login />} />
          <Route path="/vishal/Luke/dashboard/*" element={<Dashboard />} />
          <Route path="/vishal/Luke/signup/*" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
