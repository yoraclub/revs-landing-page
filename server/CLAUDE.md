# Server Module - Backend Architecture Documentation

## Backend Architecture Overview

The server module is a Node.js Express.js application built with TypeScript. It provides RESTful API endpoints and serves the built React SPA in production. The architecture is designed for both development integration with Vite and standalone production deployment.

## Directory Structure

```
server/
├── index.ts                # Main server configuration and setup
├── node-build.ts          # Production server entry point
└── routes/                # API route handlers
    └── demo.ts            # Example API endpoint
```

## Application Architecture

### Server Setup (`index.ts`)

**Core Function**: `createServer()`
```typescript
Server Configuration:
├── Express App Instance
├── Middleware Stack
│   ├── cors()                    # Cross-origin requests
│   ├── express.json()            # JSON body parsing
│   └── express.urlencoded()      # Form data parsing
├── API Routes
│   ├── GET /api/ping            # Health check endpoint
│   └── GET /api/demo            # Demo functionality
└── Return configured Express app
```

### Middleware Stack Details

1. **CORS (Cross-Origin Resource Sharing)**
   - **Purpose**: Enables frontend-backend communication in development
   - **Configuration**: Default settings (all origins allowed)
   - **Production**: Should be configured with specific origins

2. **Express JSON Parser**
   - **Purpose**: Parses incoming JSON request bodies
   - **Configuration**: `express.json()` with default settings
   - **Usage**: Available as `req.body` in route handlers

3. **Express URL-Encoded Parser**
   - **Purpose**: Parses form-encoded request bodies  
   - **Configuration**: `express.urlencoded({ extended: true })`
   - **Usage**: Supports nested objects in form data

### API Route Architecture

#### Current Endpoints

1. **Health Check Endpoint**
   ```typescript
   // GET /api/ping
   Location: server/index.ts (inline handler)
   Purpose: Server health monitoring
   Response: { message: string } (from PING_MESSAGE env var)
   ```

2. **Demo Endpoint** 
   ```typescript
   // GET /api/demo  
   Location: server/routes/demo.ts
   Handler: handleDemo function
   Purpose: Example API implementation
   Response: DemoResponse type from @shared/api
   ```

#### Route Handler Pattern
```typescript
// Standard Express RequestHandler type
import { RequestHandler } from "express";
import { ResponseType } from "@shared/api";

export const handlerName: RequestHandler = (req, res) => {
  const response: ResponseType = {
    // Response data
  };
  res.status(200).json(response);
};
```

## Production Server Architecture

### Production Entry Point (`node-build.ts`)

**Purpose**: Standalone production server that serves both API and SPA

```typescript
Production Server Flow:
├── Import createServer() from index.ts
├── Environment Configuration
│   └── PORT: process.env.PORT || 3000
├── Static File Serving
│   ├── Path: ../spa (built client files)
│   └── Middleware: express.static()
├── SPA Routing Support
│   ├── API Route Protection: /api/* → 404 if not found
│   ├── Non-API Routes: /* → serve index.html
│   └── React Router Support: History API fallback
├── Server Startup
│   └── Listen on configured port
└── Graceful Shutdown Handlers
    ├── SIGTERM handler
    └── SIGINT handler
```

### Static File Serving Strategy

```typescript
Production File Structure:
dist/
├── spa/                    # Built React SPA
│   ├── index.html         # Entry point for all routes
│   ├── assets/            # Bundled JS/CSS files
│   └── [static-files]     # Images, fonts, etc.
└── server/                # Built Node.js server
    └── production.mjs     # Compiled server entry
```

**Route Handling Logic**:
1. **API Routes** (`/api/*`, `/health`): Handled by Express routes or return 404
2. **Static Assets**: Served from `dist/spa/` directory
3. **SPA Routes**: All other routes serve `index.html` for client-side routing

### Graceful Shutdown Implementation

```typescript
Shutdown Signals:
├── SIGTERM (Termination signal from process manager)
│   └── Logged shutdown message → process.exit(0)
└── SIGINT (Interrupt signal, Ctrl+C)
    └── Logged shutdown message → process.exit(0)
```

## Build Configuration

### Server Build Setup (`vite.config.server.ts`)

```typescript
Vite Server Build Configuration:
├── Build Target: node22
├── Build Mode: library (lib.entry)
├── Entry Point: server/node-build.ts
├── Output Directory: dist/server/
├── Output Format: ES modules (.mjs)
├── SSR Mode: true
├── External Dependencies:
│   ├── Node.js built-ins (fs, path, http, etc.)
│   └── npm packages (express, cors)
├── Source Maps: enabled
├── Minification: disabled (for debugging)
└── Environment: NODE_ENV = "production"
```

### Build Process Details

**Development Build**:
- No separate server build needed
- Server runs via Vite middleware integration
- Hot reload not supported for server code

**Production Build**:
1. TypeScript compilation via Vite
2. External dependency exclusion (bundling only app code)
3. ES module output for modern Node.js compatibility
4. Source map generation for production debugging

## Environment Configuration

### Environment Variables

**Current Usage**:
- `PING_MESSAGE`: Custom message for health check endpoint (defaults to "ping pong")
- `PORT`: Server port (default: 3000 in production)
- `NODE_ENV`: Runtime environment (set to "production" in build)

**Access Pattern**:
```typescript
// Server-side only access
const customMessage = process.env.PING_MESSAGE ?? "ping pong";
const port = process.env.PORT || 3000;
```

### Configuration Loading

**Environment Access**:
```typescript
// server/index.ts
// Environment variables accessed directly via process.env
// No .env file - variables set via system or deployment platform
```

## API Development Patterns

### Adding New API Endpoints

1. **Simple Endpoint** (inline in `index.ts`):
   ```typescript
   app.get("/api/endpoint", (req, res) => {
     res.json({ data: "response" });
   });
   ```

2. **Complex Endpoint** (separate route file):
   ```typescript
   // server/routes/new-endpoint.ts
   import { RequestHandler } from "express";
   
   export const handleNewEndpoint: RequestHandler = (req, res) => {
     // Implementation
   };
   
   // server/index.ts
   import { handleNewEndpoint } from "./routes/new-endpoint";
   app.get("/api/new-endpoint", handleNewEndpoint);
   ```

### Type Safety with Shared Types

**Pattern Used**:
```typescript
// @shared/api.ts
export interface DemoResponse {
  message: string;
}

// server/routes/demo.ts
import { DemoResponse } from "@shared/api";

export const handleDemo: RequestHandler = (req, res) => {
  const response: DemoResponse = {
    message: "Hello from Express server",
  };
  res.status(200).json(response);
};
```

### Request/Response Patterns

**Standard Response Structure**:
```typescript
// Success responses
res.status(200).json({ data: responseData });

// Error responses  
res.status(404).json({ error: "Resource not found" });
res.status(400).json({ error: "Bad request", details: validationErrors });
res.status(500).json({ error: "Internal server error" });
```

**Request Validation** (using Zod):
```typescript
import { z } from "zod";

const requestSchema = z.object({
  field: z.string(),
});

export const handler: RequestHandler = (req, res) => {
  try {
    const validData = requestSchema.parse(req.body);
    // Process valid data
  } catch (error) {
    res.status(400).json({ error: "Validation failed" });
  }
};
```

## Development vs Production Differences

### Development Mode Integration

**Vite Middleware Integration** (`vite.config.ts`):
```typescript
function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);  // Express as Vite middleware
    },
  };
}
```

**Development Characteristics**:
- Server code runs within Vite dev server
- API available at `http://localhost:8080/api/*`
- No static file serving (handled by Vite)
- No SPA routing fallback needed (handled by Vite)

### Production Mode Characteristics

**Standalone Server**:
- Independent Node.js process
- Serves both API and static files
- SPA routing fallback implemented
- Environment-based port configuration
- Graceful shutdown handling

## Error Handling Architecture

### Current Error Handling

**API Route Errors**:
- Unhandled errors bubble up to Express default handler
- Returns HTML error page (not API-friendly)

**Production Route Protection**:
```typescript
// API route 404 handling
if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
  return res.status(404).json({ error: "API endpoint not found" });
}
```

### Recommended Error Handling Patterns

**Global Error Middleware**:
```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});
```

**Route-Level Error Handling**:
```typescript
export const handler: RequestHandler = async (req, res) => {
  try {
    // Route logic
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).json({ error: "Operation failed" });
  }
};
```

## Performance Considerations

### Server Performance

**Build Optimizations**:
- External dependency exclusion reduces bundle size
- ES modules for modern Node.js performance
- Source maps for production debugging without impact

**Runtime Performance**:
- Express.js minimal overhead
- Static file serving with Express built-ins
- No unnecessary middleware or processing

### Scaling Considerations

**Current Limitations**:
- Single process server
- No load balancing
- Local file system dependency for static files

**Production Scaling Options**:
- Process managers (PM2, Docker)
- Reverse proxy (Nginx) for static files
- Container orchestration (Docker Swarm, Kubernetes)

## Development Workflow for AI Agents

### Common Server Tasks

#### Adding New API Endpoint
1. Create route handler in `server/routes/[name].ts`
2. Import and register in `server/index.ts`
3. Define types in `@shared/` for type safety
4. Test via `/api/[endpoint]` in development

#### Environment Configuration
1. Set variables via system environment or deployment platform
2. Access via `process.env.VARIABLE_NAME`
3. Provide defaults for production safety
4. Document usage in this file

#### Error Handling Implementation
1. Wrap async operations in try-catch
2. Return appropriate HTTP status codes
3. Log errors for debugging
4. Consider global error middleware

### File Navigation for AI Agents

**Key Entry Points**:
- **Server Setup**: `server/index.ts`
- **Production Entry**: `server/node-build.ts`
- **Route Handlers**: `server/routes/`
- **Build Config**: `vite.config.server.ts`

**Development Patterns**:
- **Middleware**: Applied in order in `createServer()`
- **Routes**: RESTful conventions with `/api/` prefix  
- **Types**: Import from `@shared/` for client-server consistency
- **Environment**: Use `process.env` with fallback defaults

**Production Deployment**:
- **Build**: `npm run build:server` creates `dist/server/`
- **Start**: `node dist/server/production.mjs`
- **Static Files**: Served from `dist/spa/` directory
- **Port**: Configurable via `PORT` environment variable