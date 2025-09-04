import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-revz-dark">
      {/* Main content */}
      <main>{children}</main>
      
      {/* Bottom Navigation - appears on all pages */}
      <BottomNavigation />
    </div>
  );
}