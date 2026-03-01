import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const CampaignPage = lazy(() => import("../pages/campaignPages"));


export default function AppRouters() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/campaigns" element={<CampaignPage />} />
      </Routes>
    </Suspense>
  );
}