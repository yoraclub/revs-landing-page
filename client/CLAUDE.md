# Client Module - Frontend Architecture Documentation

## Overview

The client module is a React Single Page Application (SPA) built with TypeScript, Vite, and Tailwind CSS. It uses a component-based architecture with centralized routing and layout systems.

## Directory Structure

The client module is organized into the following directories:

- **App.tsx** - Root component with provider setup
- **main.tsx** - Application entry point
- **global.css** - Global styles and CSS variables
- **pages/** - Route components (Index.tsx, NotFound.tsx)
- **routes/** - Centralized routing system (paths, components, lazy loading)
- **layout/** - Layout components (Layout, BottomNavigation, LoadingFallback)
- **components/ui/** - Reusable UI components based on Radix UI primitives

## Application Architecture

### Provider Stack
The application uses a layered provider structure:
1. **QueryClientProvider** - Server state management and API caching
2. **ThemeProvider** - Light/dark theme switching with localStorage persistence
3. **TooltipProvider** - Global tooltip context for accessibility
4. **BrowserRouter** - Client-side routing with history API

### Routing System
The routing architecture features:
- **Centralized paths** defined in `routes/paths.ts`
- **Dynamic route generation** via `createRoutes()` function
- **Automatic layout wrapping** for all routes
- **Built-in lazy loading** with loading states
- **Type-safe route definitions**

### Layout System
All pages are automatically wrapped with a consistent layout that includes:
- **Responsive background** that adapts to theme
- **Bottom navigation** with REVZ branding
- **Mobile-first design** approach
- **Loading fallback** component for async operations

## Component Library

The UI components are built using the shadcn/ui approach with Radix UI primitives, organized by category:

- **Layout Components** - Accordions, breadcrumbs, separators, sidebars
- **Form Components** - Buttons, inputs, checkboxes, selects, labels
- **Data Display** - Cards, tables, badges, charts, avatars
- **Overlay Components** - Dialogs, popovers, tooltips, sheets, drawers
- **Navigation** - Menus, context menus, command palettes
- **Feedback Components** - Alerts, toasts, progress indicators

All components follow a consistent pattern using Tailwind CSS with class-variance-authority for styling variants.

## Styling Architecture

### Design System
- **CSS Framework**: Tailwind CSS with custom configuration
- **Brand Colors**: REVZ red (#FF1801) and dark (#0A0A0A)
- **Typography**: Custom fonts (Orbitron, Numans, Inter)
- **Theme Support**: Light/dark mode via CSS variables
- **Responsive Design**: Mobile-first breakpoint system

### Global Styles
- **Font Loading**: Google Fonts with performance optimization
- **CSS Variables**: Dynamic theming system for colors
- **Base Styles**: Applied consistently across all elements

## Page Components

### Index.tsx - Landing Page
The main landing page includes:
- **Theme toggle** with fixed positioning
- **Grid layout** with responsive columns
- **Content cards** for story, hero, stats, and pricing
- **Features section** showcasing app capabilities
- **Brand integration** with custom fonts and colors

### NotFound.tsx - Error Page
Fallback component for unmatched routes in the SPA.

## State Management

### Client State
- **Local State**: React hooks (useState, useEffect)
- **Theme State**: next-themes hook with persistence
- **Router State**: React Router's built-in state management

### Server State
- **Library**: TanStack Query (React Query)
- **Caching**: Automatic API response caching
- **Configuration**: Default QueryClient setup

## Path Resolution

The application uses TypeScript path aliases:
- **@/*** - Maps to client module files
- **@shared/*** - Maps to shared utilities and types

Import conventions:
- UI components: `@/components/ui/[component]`
- Pages: `@/pages/[page]`
- Routes: `@/routes`
- Layout: `@/layout`
- Utilities: `@/lib/[utility]`

## Build Integration

### Vite Configuration
- **Output**: dist/spa directory for static files
- **Development**: Hot module replacement with fast refresh
- **Plugins**: React plugin with Express middleware integration
- **Aliases**: Automatic path resolution for imports

### Performance Features
- **Code Splitting**: Route-based lazy loading
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and font optimization
- **CSS Purging**: Automatic unused class removal

## Development Workflow

### Adding New Components
1. Create component file in appropriate directory
2. Follow existing patterns for styling and structure
3. Export with proper TypeScript types
4. Use existing UI components from the library

### Adding New Routes
1. Define route path in `routes/paths.ts`
2. Add component mapping in `routes/components.tsx`
3. Layout is automatically applied
4. Lazy loading is built-in

### Styling Guidelines
- Use Tailwind utility classes primarily
- Follow brand color scheme (revz-red, revz-dark)
- Implement responsive design with mobile-first approach
- Support dark mode via CSS variables

### API Integration
- Use React Query for server state management
- Target `/api/*` endpoints during development
- Implement proper loading and error states
- Cache responses appropriately