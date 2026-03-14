import { Routes, Route } from "react-router-dom";
import AppsPanel from "./AppsPanel";
import AppLayout from "./AppLayout";
import BMICalculator from "./BMICalculator";
import RandomPasswordGenerator from "./RandomPasswordGenerator";
import HapticPlayground from "./HapticPlayground";
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

      <Route
        path="random-password-generator"
        element={
          <AppLayout appName="Random Password Generator">
            <RandomPasswordGenerator />
          </AppLayout>
        }
      />

      <Route
        path="haptic-playground"
        element={
          <AppLayout appName="Haptic Playground">
            <HapticPlayground />
          </AppLayout>
        }
      />

      {/* 404 for unknown apps */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}