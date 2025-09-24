/**
 * Route paths configuration
 * Centralized location for all application route paths
 */

export const ROUTE_PATHS = {
  // Main routes
  HOME: "/",
  MOBILE_APP: "/mobile-app",
  FEATURES: "/features",
  PRICING: "/pricing",
  NOT_FOUND: "*",

  // Add more routes here as needed
  // ABOUT: "/about",
  // CONTACT: "/contact",
} as const;

// Type helper for route paths
export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];

// Route metadata for navigation, SEO, etc.
export interface RouteConfig {
  path: string;
  title: string;
  description?: string;
  requiresAuth?: boolean;
}

export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  HOME: {
    path: ROUTE_PATHS.HOME,
    title: "REVZ - Formula 1 Companion App",
    description: "The ultimate Formula 1 companion app built for fans in the fast lane.",
  },
  MOBILE_APP: {
    path: ROUTE_PATHS.MOBILE_APP,
    title: "REVZ Mobile App - Formula 1 Companion",
    description: "Download the REVZ mobile app for real-time race data, driver insights, and exclusive F1 content.",
  },
  FEATURES: {
    path: ROUTE_PATHS.FEATURES,
    title: "REVZ Features - Formula 1 App Features",
    description: "Explore all the powerful features of REVZ: real-time race data, analytics, driver profiles, and more.",
  },
  PRICING: {
    path: ROUTE_PATHS.PRICING,
    title: "REVZ Pricing - Choose Your Plan",
    description: "Choose the perfect REVZ plan for your F1 passion. Free forever option or premium features with Fast Lane Pro.",
  },
  NOT_FOUND: {
    path: ROUTE_PATHS.NOT_FOUND,
    title: "Page Not Found - REVZ",
    description: "The requested page could not be found.",
  },
} as const;