# Server Module - Backend Architecture Documentation

## Backend Architecture Overview

The server module is a Node.js Express.js application built with TypeScript. It provides RESTful API endpoints and serves the built React SPA in production. The architecture is designed for both development integration with Vite and standalone production deployment.

## Directory Structure

```
server/
├── index.ts                # Main server configuration and setup
├── node-build.ts          # Production server entry point
├── config/                # Configuration modules
│   ├── cors.ts           # CORS configuration with env variables
│   └── express.ts        # Express middleware config (body limits)
├── middleware/            # Express middleware
│   └── errorHandler.ts   # Global error handling + async wrapper
├── utils/                 # Utility functions
│   └── shutdown.ts       # Graceful shutdown handler
└── routes/                # API route handlers
    └── hello.ts          # Example API endpoint
```

## Application Architecture

### Server Setup (`index.ts`)

**Core Function**: `createServer()`
```typescript
Server Configuration:
├── Express App Instance
├── Middleware Stack
│   ├── cors(corsConfig)              # Cross-origin requests (environment-based)
│   ├── express.json({ limit: 10mb }) # JSON body parsing with size limit
│   └── express.urlencoded()          # Form data parsing with size limit
├── API Routes
│   ├── GET /api/ping                # Health check endpoint
│   └── GET /api/hello               # Example API endpoint
└── Error Handling Middleware
    └── errorHandler                 # Global error handler (must be last)
```

### Middleware Stack Details

1. **CORS (Cross-Origin Resource Sharing)**
   - **Location**: `server/config/cors.ts`
   - **Purpose**: Enables frontend-backend communication
   - **Configuration**: Environment-based via `ALLOWED_ORIGINS`
   - **Default**: Falls back to `*` if not configured
   - **Allowed Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS
   - **Credentials**: Enabled for cookie support

2. **Express JSON Parser**
   - **Location**: `server/config/express.ts`
   - **Purpose**: Parses incoming JSON request bodies
   - **Configuration**: `express.json({ limit: "10mb" })`
   - **Usage**: Available as `req.body` in route handlers
   - **Security**: 10MB limit prevents DoS attacks

3. **Express URL-Encoded Parser**
   - **Location**: `server/config/express.ts`
   - **Purpose**: Parses form-encoded request bodies
   - **Configuration**: `express.urlencoded({ extended: true, limit: "10mb" })`
   - **Usage**: Supports nested objects in form data
   - **Security**: 10MB limit prevents DoS attacks

4. **Global Error Handler**
   - **Location**: `server/middleware/errorHandler.ts`
   - **Purpose**: Catches all unhandled errors and returns JSON responses
   - **Position**: Must be registered last in middleware stack
   - **Features**: Structured error logging, environment-aware stack traces
   - **Async Support**: Includes `asyncHandler` wrapper for async routes

### API Route Architecture

#### Current Endpoints

1. **Health Check Endpoint**
   ```typescript
   // GET /api/ping
   Location: server/index.ts (inline handler)
   Purpose: Server health monitoring
   Response: { message: string } (from PING_MESSAGE env var)
   ```

2. **Hello Endpoint**
   ```typescript
   // GET /api/hello
   Location: server/routes/hello.ts
   Handler: handleHello function
   Purpose: Example API implementation
   Response: HelloResponse type from @shared/api
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

**Location**: `server/utils/shutdown.ts`

```typescript
Shutdown Signals:
├── SIGTERM (Termination signal from process manager)
│   ├── Close server to stop accepting new connections
│   ├── Wait for in-flight requests to complete
│   ├── 10-second timeout for forced shutdown
│   └── Clean exit with status code
└── SIGINT (Interrupt signal, Ctrl+C)
    └── Same graceful shutdown process

Shutdown Flow:
1. Receive signal (SIGTERM or SIGINT)
2. Call server.close() to stop accepting connections
3. Wait for existing connections to finish
4. If timeout (10s) expires, force shutdown
5. Exit process with appropriate code
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
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Runtime environment ("development" or "production")
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins (defaults to "*")
- `PING_MESSAGE`: Custom message for health check endpoint (defaults to "ping")

**Access Pattern**:
```typescript
// Server-side only access
const port = process.env.PORT || 3000;
const origins = process.env.ALLOWED_ORIGINS?.split(",") || "*";
const pingMessage = process.env.PING_MESSAGE ?? "ping";
```

### Configuration Loading

**Environment File Structure**:
```
.env                # Local environment (gitignored)
.env.example        # Template for developers (committed to git)
```

**Environment Access**:
```typescript
// server/index.ts
import "dotenv/config";  // Loads .env file automatically

// Access environment variables
process.env.VARIABLE_NAME
```

**Development Setup**:
```bash
# .env file
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000
PING_MESSAGE=pong
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
export interface HelloResponse {
  message: string;
}

// server/routes/hello.ts
import { HelloResponse } from "@shared/api";

export const handleHello: RequestHandler = (req, res) => {
  const response: HelloResponse = {
    message: "Hello from Revs server",
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

### Global Error Handling (Implemented)

**Location**: `server/middleware/errorHandler.ts`

**Error Handler Function**:
```typescript
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Structured error logging
  console.error("Server error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // JSON error response
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
```

**Features**:
- Catches all unhandled errors across the application
- Returns JSON responses (never HTML error pages)
- Environment-aware stack trace inclusion
- Structured error logging with request context
- Must be registered last in middleware stack

### Async Route Handler Wrapper

**Purpose**: Automatically catch errors from async route handlers

**Usage Pattern**:
```typescript
import { asyncHandler } from "../middleware/errorHandler";

export const handleAsyncRoute = asyncHandler(async (req, res) => {
  // Async operations - errors automatically caught
  const data = await fetchData();
  res.json({ data });
});
```

**Benefits**:
- No need for try-catch in every async route
- Errors automatically passed to global error handler
- Cleaner route handler code

### Production Route Protection

**API Route 404 Handling**:
```typescript
// server/node-build.ts
if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
  return res.status(404).json({ error: "API endpoint not found" });
}
```

### Route-Level Error Handling (Optional)

For custom error handling in specific routes:
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
1. Add variable to `.env` file for local development
2. Update `.env.example` with the new variable
3. Access via `process.env.VARIABLE_NAME` in server code
4. Provide defaults for production safety
5. Document usage in this file
6. Set in deployment platform for production

#### Error Handling Implementation
1. Use `asyncHandler` wrapper for async routes (recommended)
2. OR wrap async operations in try-catch manually
3. Return appropriate HTTP status codes
4. Log errors with context for debugging
5. Global error middleware catches all unhandled errors

### File Navigation for AI Agents

**Key Entry Points**:
- **Server Setup**: `server/index.ts`
- **Production Entry**: `server/node-build.ts`
- **Route Handlers**: `server/routes/`
- **Middleware**: `server/middleware/`
- **Configuration**: `server/config/`
- **Utilities**: `server/utils/`
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