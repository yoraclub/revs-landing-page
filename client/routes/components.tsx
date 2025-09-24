/**
 * Route components definitions
 * Maps route paths to their corresponding React components
 */

import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { ROUTE_PATHS } from "./paths";
import { Layout, LoadingFallback } from "@/layout";

// Import page components
import Index from "@/pages/Index";
import MobileApp from "@/pages/MobileApp";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import NotFound from "@/pages/NotFound";

// Lazy-loaded components for code splitting (add as needed)
// const About = lazy(() => import("@/pages/About"));
// const Contact = lazy(() => import("@/pages/Contact"));

// Wrapper for lazy-loaded components
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

// Route configuration with components wrapped in Layout
export const routeComponents = [
  {
    path: ROUTE_PATHS.HOME,
    element: (
      <Layout>
        <Index />
      </Layout>
    ),
  },
  {
    path: ROUTE_PATHS.MOBILE_APP,
    element: (
      <Layout>
        <MobileApp />
      </Layout>
    ),
  },
  {
    path: ROUTE_PATHS.FEATURES,
    element: (
      <Layout>
        <Features />
      </Layout>
    ),
  },
  {
    path: ROUTE_PATHS.PRICING,
    element: (
      <Layout>
        <Pricing />
      </Layout>
    ),
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
  // Add more routes here:
  // {
  //   path: ROUTE_PATHS.ABOUT,
  //   element: (
  //     <Layout>
  //       <LazyWrapper>
  //         <About />
  //       </LazyWrapper>
  //     </Layout>
  //   ),
  // },
];

// Generate Route elements for React Router
export const createRoutes = () => {
  return routeComponents.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));
};

// Helper function to get route component by path
export const getRouteComponent = (path: string) => {
  return routeComponents.find((route) => route.path === path)?.element;
};

// Export components for direct import if needed
export { Index, MobileApp, Features, Pricing, NotFound, LazyWrapper };