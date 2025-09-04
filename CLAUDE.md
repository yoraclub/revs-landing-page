# REVZ Landing Page - Root Architecture Documentation

## Project Overview for AI Agents

This is a full-stack TypeScript monorepo for the REVZ Formula 1 companion app landing page. The architecture follows a clear separation of concerns with distinct client, server, and shared modules.

## High-Level Architecture

```
REVZ Landing Page Architecture
┌─────────────────────────────────────────────────────────────┐
│                    Development Mode                         │
│  ┌─────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │    Vite     │────│  Express.js     │────│   React     │ │
│  │ Dev Server  │    │   Middleware    │    │     SPA     │ │
│  │  (Port 8080) │    │   (/api/*)     │    │  (Client)   │ │
│  └─────────────┘    └─────────────────┘    └─────────────┘ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   Production Mode                           │
│  ┌─────────────┐                       ┌─────────────────┐ │
│  │   Node.js   │                       │  Static Files   │ │
│  │ Express App │                       │   (dist/spa)    │ │
│  │(dist/server)│                       │                 │ │
│  └─────────────┘                       └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure & Module Responsibilities

### Root Level Files
- `package.json` - Project metadata, dependencies, and npm scripts
- `tsconfig.json` - TypeScript configuration for entire monorepo
- `vite.config.ts` - Primary build configuration (client + dev server)
- `vite.config.server.ts` - Server-specific build configuration
- `tailwind.config.ts` - CSS framework configuration with custom theme
- `.env` - Environment variables (modified from default)
- `.gitignore` - Version control exclusions

### Module Structure
```
├── client/          # Frontend React SPA module
├── server/          # Backend Express.js API module  
├── shared/          # Shared utilities and types
├── public/          # Static assets (images, fonts, etc.)
└── dist/           # Build output (never edit directly)
```

## Build System Overview

### Dual Build Strategy
1. **Client Build** (`npm run build:client`)
   - Input: `client/` directory
   - Config: `vite.config.ts`
   - Output: `dist/spa/` (static SPA files)
   - Tools: Vite + React + TypeScript + Tailwind

2. **Server Build** (`npm run build:server`)
   - Input: `server/` directory  
   - Config: `vite.config.server.ts`
   - Output: `dist/server/` (Node.js application)
   - Tools: Vite + TypeScript + Express

### Development Integration
- Vite dev server provides HMR for client code
- Express app runs as middleware within Vite dev server
- API routes accessible at `/api/*` during development
- File system security via Vite `fs.allow` and `fs.deny` rules

## Package Management Strategy

### Package Manager: pnpm
- Lock file: `pnpm-lock.yaml` (primary)
- Backup: `package-lock.json` (npm compatibility)
- Version: 10.14.0+ required

### Dependency Architecture
- **Production deps**: Server runtime only (Express, dotenv, zod)
- **Dev deps**: Everything else (React, UI libs, build tools, TypeScript)
- **Reasoning**: Client code is bundled, server code runs in production

## Path Resolution System

### TypeScript Module Resolution
```typescript
// tsconfig.json paths
"@/*": ["./client/*"]        // Client code access
"@shared/*": ["./shared/*"]  // Shared utilities access
```

### Vite Alias Configuration  
```typescript
// vite.config.ts aliases
"@": path.resolve(__dirname, "./client")
"@shared": path.resolve(__dirname, "./shared")
```

## Environment & Configuration Management

### TypeScript Configuration
- **Target**: ES2020 (modern browser support)
- **Module System**: ESNext with bundler resolution
- **Strict Mode**: Disabled (`strict: false`) for development flexibility
- **Includes**: `client/`, `server/`, `shared/`, config files

### Environment Variables
- **Location**: `.env` file in root
- **Access**: Server-side only via dotenv
- **Security**: Excluded from client bundle and git (if sensitive)

## Development Workflow

### Scripts Available
```bash
# Development
npm run dev          # Start integrated dev server
npm run typecheck    # Run TypeScript validation

# Production Build
npm run build        # Build both client and server
npm run build:client # Build only client SPA
npm run build:server # Build only server

# Production Deployment  
npm run start        # Start production server

# Code Quality
npm run format.fix   # Format code with Prettier
npm test            # Run Vitest test suite
```

### Development Server Behavior
1. Vite starts on `localhost:8080`
2. Express middleware handles `/api/*` routes
3. All other routes serve React SPA with history API fallback
4. HMR updates client code without server restart
5. Server code changes require manual restart

## Module Communication Patterns

### Client ↔ Server Communication
- **HTTP API**: RESTful endpoints at `/api/*`
- **Data Format**: JSON request/response bodies
- **Error Handling**: Standard HTTP status codes
- **CORS**: Enabled for cross-origin requests

### Shared Code Usage
- **Types**: TypeScript interfaces/types in `shared/`
- **Utilities**: Common functions used by both client and server
- **Validation**: Zod schemas for data validation

## Security Architecture

### Development Security
- **File Access**: Vite restricts access to `client/` and `shared/` only
- **Environment**: `.env` files blocked from client access
- **Git Security**: `.git/` directory blocked from Vite serving

### Production Security
- **Static Files**: Client served as static assets
- **API Endpoints**: Server validation via Express middleware
- **Environment**: Server-side environment variable access only

## Build Output Structure

### Client Build (`dist/spa/`)
```
dist/spa/
├── index.html           # SPA entry point
├── assets/              # Bundled CSS, JS with hashes
│   ├── index-[hash].css
│   └── index-[hash].js
└── [static-assets]      # Optimized images, fonts, etc.
```

### Server Build (`dist/server/`)
```
dist/server/
├── node-build.mjs       # Production server entry
├── index.js             # Compiled server code
└── routes/              # Compiled route handlers
```

## AI Agent Navigation Guide

### For Client-Side Work
1. Start with `client/CLAUDE.md` for frontend architecture
2. Main entry: `client/App.tsx`
3. Pages: `client/pages/` directory
4. Components: `client/components/` directory
5. Styles: `client/global.css` and Tailwind classes

### For Server-Side Work
1. Start with `server/CLAUDE.md` for backend architecture  
2. Main entry: `server/index.ts`
3. Routes: `server/routes/` directory
4. API endpoints: All prefixed with `/api/`

### For Shared Code
1. Check `shared/CLAUDE.md` for utilities documentation
2. Types and interfaces: `shared/` directory
3. Common validation: Shared Zod schemas

### For Configuration Changes
1. Build config: `vite.config.ts` and `vite.config.server.ts`
2. TypeScript: `tsconfig.json`  
3. Styling: `tailwind.config.ts`
4. Dependencies: `package.json`

## Common Development Tasks

### Adding New API Endpoint
1. Create handler in `server/routes/`
2. Register route in `server/index.ts`
3. Test via `/api/[endpoint]` in development

### Adding New Page/Component
1. Create component in `client/pages/` or `client/components/`
2. Add route in `client/App.tsx` if needed
3. Use `@/` alias for imports from client code

### Modifying Styles
1. Global styles: Edit `client/global.css`
2. Component styles: Use Tailwind classes
3. Theme changes: Modify `tailwind.config.ts`
4. Custom colors available: `revz-red` (#FF1801), `revz-dark` (#0A0A0A)

### Environment Changes
1. Add variables to `.env` file
2. Access via `process.env.VARIABLE_NAME` in server code
3. Client cannot access environment variables directly