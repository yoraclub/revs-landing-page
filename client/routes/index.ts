/**
 * Routes module exports
 * Central export point for routing functionality
 */

export { ROUTE_PATHS, ROUTE_CONFIG, type RoutePath, type RouteConfig } from "./paths";
export { 
  routeComponents, 
  createRoutes, 
  getRouteComponent, 
  Index, 
  NotFound,
  LazyWrapper 
} from "./components";