import { ReactNode } from "react";
import TopNavigation from "./TopNavigation";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation - appears when scrolling */}
      <TopNavigation />

      {/* Main content - add padding to prevent nav overlap */}
      <main className="flex-1 pt-[72px]">{children}</main>

      {/* Footer - part of page layout */}
      <Footer />
    </div>
  );
}