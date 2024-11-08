// MainRouter.jsx (actualizado)
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

const MainRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default MainRouter;
