import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const CampaignPage = lazy(() => import("../pages/CampaignPages"));

export default function AppRouters() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard"/>} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/campaigns" element={<CampaignPage />} />
          </Route>
      </Routes>
    </Suspense>
  );
}