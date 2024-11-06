import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
// import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";

const MainRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home2" element={<DashboardLayout />} />
        <Route
          path="/home"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default MainRouter;
