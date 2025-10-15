import { ReactNode, useRef } from "react";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import { LayoutGroup } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Wrap footer and nav in LayoutGroup for synchronized morphing */}
      <LayoutGroup>
        {/* Footer - part of page layout */}
        <Footer ref={footerRef} />

        {/* Floating Bottom Navigation - appears when scrolling */}
        <BottomNavigation footerRef={footerRef} />
      </LayoutGroup>
    </div>
  );
}