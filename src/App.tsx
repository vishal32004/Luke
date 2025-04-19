import { BrowserRouter } from "react-router-dom";
import RootRoutes from "@/routes/RootRoutes";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <RootRoutes />
  </BrowserRouter>
);

export default App;
