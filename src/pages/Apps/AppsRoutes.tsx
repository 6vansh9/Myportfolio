import { Routes, Route } from "react-router-dom";
import AppsPanel from "./AppsPanel";
import AppLayout from "./AppLayout";
import BMICalculator from "./BMICalculator";
import NotFound from "@/pages/NotFound";

export default function AppsRoutes() {
  return (
    <Routes>
      {/* Apps listing page */}
      <Route index element={<AppsPanel />} />

      {/* Individual app routes */}
      
      <Route
        path="bmi-calculator"
        element={
          <AppLayout appName="BMI Calculator">
            <BMICalculator />
          </AppLayout>
        }
      />

      {/* 404 for unknown apps */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}