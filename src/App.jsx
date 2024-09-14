import "./App.css";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./page/Dashboard/Dashboard";
import Main from "./page/Main/Main";
import Login from "./page/Auth/Login/Login";
import Register from "./page/Auth/Register/Register";
import Page404 from "./page/Page404";

import { useLocation, useNavigate } from "react-router-dom";
import useBoundStore from "./states/boundStore";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const accessUser = useBoundStore((state) => state.accessUser);
 
  useEffect(() => {
    if (
      !accessUser &&
      location.pathname !== "/" &&
      location.pathname !== "/register"
    ) {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, accessUser]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />/
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
