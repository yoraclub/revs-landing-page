import { ReactNode, useRef } from "react";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer - part of page layout */}
      <Footer ref={footerRef} />

      {/* Floating Bottom Navigation - appears when scrolling */}
      <BottomNavigation footerRef={footerRef} />
    </div>
  );
}