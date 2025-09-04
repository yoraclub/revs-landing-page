/**
 * Route paths configuration
 * Centralized location for all application route paths
 */

export const ROUTE_PATHS = {
  // Main routes
  HOME: "/",
  NOT_FOUND: "*",
  
  // Add more routes here as needed
  // ABOUT: "/about",
  // CONTACT: "/contact",
  // PRICING: "/pricing",
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
  NOT_FOUND: {
    path: ROUTE_PATHS.NOT_FOUND,
    title: "Page Not Found - REVZ",
    description: "The requested page could not be found.",
  },
} as const;