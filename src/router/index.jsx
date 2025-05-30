import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AdminPage from "../pages/dashboards/AdminPage";
import UserPage from "../pages/dashboards/UserPage";
import OwnerPage from "../pages/dashboards/OwnerPage";
import ProtectedRoute from "../layouts/ProtectedRoute";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/dashboard/admin" element={<AdminPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route path="/dashboard/user" element={<UserPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
          <Route path="/dashboard/owner" element={<OwnerPage />} />
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
