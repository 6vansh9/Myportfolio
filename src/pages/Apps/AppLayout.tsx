import type { ReactNode } from "react";
import AppBreadcrumb from "@/components/AppBreadcrumb";

interface AppLayoutProps {
  appName: string;
  children: ReactNode;
}

export default function AppLayout({ appName, children }: AppLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <AppBreadcrumb appName={appName} />

      {/* App Content */}
      <div>
        {children}
      </div>
    </div>
  );
}