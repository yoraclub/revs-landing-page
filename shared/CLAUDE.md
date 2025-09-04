# Shared Module - Common Utilities Documentation

## Shared Module Overview

The shared module contains code that is used by both the client and server applications. This includes TypeScript types, interfaces, utility functions, and validation schemas that ensure consistency across the full-stack application.

## Directory Structure

```
shared/
└── api.ts              # Shared API types and interfaces
```

## Architecture Purpose

### Code Sharing Strategy

The shared module enables:

1. **Type Safety Across Stack**: Client and server use identical type definitions
2. **API Contract Definition**: Request/response interfaces ensure compatibility  
3. **Validation Schema Sharing**: Same validation rules on client and server
4. **Utility Function Reuse**: Common pure functions available everywhere
5. **Reduced Code Duplication**: Single source of truth for shared logic

### Import Path Resolution

**Access Pattern**:
```typescript
// From client code (client/*)
import { DemoResponse } from "@shared/api";

// From server code (server/*)  
import { DemoResponse } from "@shared/api";

// TypeScript path mapping (tsconfig.json)
"@shared/*": ["./shared/*"]

// Vite alias configuration
"@shared": path.resolve(__dirname, "./shared")
```

## Current Implementation

### API Types (`api.ts`)

**Purpose**: Shared TypeScript interfaces for API communication

```typescript
Current Exports:
├── DemoResponse interface
│   ├── message: string
│   └── Usage: GET /api/demo response type
```

**Implementation Pattern**:
```typescript
/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}
```

**Usage Examples**:

*Server-side usage* (`server/routes/demo.ts`):
```typescript
import { DemoResponse } from "@shared/api";
import { RequestHandler } from "express";

export const handleDemo: RequestHandler = (req, res) => {
  const response: DemoResponse = {
    message: "Hello from Express server",
  };
  res.status(200).json(response);
};
```

*Client-side usage* (hypothetical):
```typescript
import { DemoResponse } from "@shared/api";

// React Query usage
const { data } = useQuery<DemoResponse>({
  queryKey: ['demo'],
  queryFn: () => fetch('/api/demo').then(res => res.json())
});

// Fetch usage with type safety
const response: DemoResponse = await fetch('/api/demo').then(res => res.json());
```

## Recommended Shared Code Patterns

### API Type Definitions

**Standard API Response Pattern**:
```typescript
// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Specific endpoint responses
export interface UserResponse extends ApiResponse<User> {}
export interface PostsResponse extends ApiResponse<Post[]> {}
```

**API Request Types**:
```typescript
// POST request body types
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

// Query parameter types
export interface ListUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
}
```

### Validation Schemas (Zod)

**Shared Validation Pattern**:
```typescript
import { z } from "zod";

// Base schema definitions
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  createdAt: z.date(),
});

// Derived types
export type User = z.infer<typeof UserSchema>;

// Request validation schemas
export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;

// Usage examples:
// Server: CreateUserSchema.parse(req.body)
// Client: CreateUserSchema.parse(formData)
```

### Utility Functions

**Pure Function Pattern**:
```typescript
// Date/time utilities
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
}

// String utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### Constants and Configuration

**Shared Constants Pattern**:
```typescript
// API endpoints
export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
  AUTH: '/api/auth',
} as const;

// Configuration values
export const CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'webp'],
  PAGINATION_LIMIT: 20,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  VALIDATION_FAILED: 'Validation failed',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found',
} as const;
```

## Type Organization Strategies

### File Organization Patterns

**By Feature** (recommended for larger projects):
```
shared/
├── types/
│   ├── user.ts         # User-related types
│   ├── post.ts         # Post-related types
│   └── auth.ts         # Authentication types
├── schemas/
│   ├── user.ts         # User validation schemas
│   └── post.ts         # Post validation schemas
├── utils/
│   ├── date.ts         # Date utilities
│   ├── string.ts       # String utilities
│   └── validation.ts   # Validation utilities
└── constants/
    ├── api.ts          # API-related constants
    └── config.ts       # Configuration constants
```

**By Layer** (current simple approach):
```
shared/
├── api.ts              # API types and interfaces
├── types.ts            # General type definitions
├── utils.ts            # Utility functions
├── schemas.ts          # Validation schemas
└── constants.ts        # Shared constants
```

### Type Definition Best Practices

**Interface vs Type Aliases**:
```typescript
// Use interfaces for object shapes that might be extended
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AdminUser extends User {
  permissions: string[];
}

// Use type aliases for unions, primitives, and computed types
export type UserStatus = 'active' | 'inactive' | 'banned';
export type UserWithPosts = User & { posts: Post[] };
```

**Generic Type Patterns**:
```typescript
// Generic API response
export interface ApiResponse<TData = unknown> {
  success: boolean;
  data?: TData;
  error?: string;
}

// Generic pagination
export interface PaginatedResponse<TItem = unknown> {
  items: TItem[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Usage
export type UsersResponse = PaginatedResponse<User>;
export type PostsResponse = PaginatedResponse<Post>;
```

## Development Workflow

### Adding New Shared Types

1. **Identify Common Data Structures**:
   - API request/response objects
   - Database entity types
   - Validation requirements

2. **Create Type Definitions**:
   ```typescript
   // shared/api.ts (or appropriate file)
   export interface NewFeatureRequest {
     field1: string;
     field2: number;
   }
   
   export interface NewFeatureResponse {
     id: string;
     result: boolean;
   }
   ```

3. **Add Validation Schemas** (if using Zod):
   ```typescript
   export const NewFeatureRequestSchema = z.object({
     field1: z.string().min(1),
     field2: z.number().positive(),
   });
   ```

4. **Update Imports**:
   - Server: Use in route handlers
   - Client: Use in API calls and forms

### Type Safety Workflow

**Server Implementation**:
```typescript
// server/routes/feature.ts
import { NewFeatureRequest, NewFeatureResponse } from "@shared/api";
import { RequestHandler } from "express";

export const handleNewFeature: RequestHandler = (req, res) => {
  const requestData: NewFeatureRequest = req.body;
  
  const response: NewFeatureResponse = {
    id: generateId(),
    result: true,
  };
  
  res.json(response);
};
```

**Client Implementation**:
```typescript
// client/services/api.ts
import { NewFeatureRequest, NewFeatureResponse } from "@shared/api";

export async function createFeature(data: NewFeatureRequest): Promise<NewFeatureResponse> {
  const response = await fetch('/api/feature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  return response.json();
}
```

## Build Integration

### TypeScript Configuration

**Shared Module Inclusion**:
```typescript
// tsconfig.json
{
  "include": [
    "client/**/*",
    "server/**/*", 
    "shared/**/*"    // Shared code included in compilation
  ]
}
```

### Path Resolution

**Both Client and Server Builds**:
- Vite resolves `@shared` alias during build
- TypeScript validates imports during compilation
- Bundled appropriately for target environment

**Development vs Production**:
- Development: Direct TypeScript imports
- Production: Bundled with respective client/server builds

## Future Extension Patterns

### Advanced Shared Utilities

**Database Entity Types**:
```typescript
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
}
```

**API Client Generation**:
```typescript
// Type-safe API client factory
export function createApiClient<TRequest, TResponse>(endpoint: string) {
  return {
    get: (): Promise<TResponse> => fetch(endpoint).then(r => r.json()),
    post: (data: TRequest): Promise<TResponse> => 
      fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(r => r.json())
  };
}
```

**Event System Types**:
```typescript
export interface AppEvent<TPayload = unknown> {
  type: string;
  payload: TPayload;
  timestamp: Date;
}

export type UserEvents = 
  | AppEvent<{ userId: string }> & { type: 'user:created' }
  | AppEvent<{ userId: string; changes: Partial<User> }> & { type: 'user:updated' };
```

## AI Agent Development Guidelines

### Working with Shared Code

1. **Check Existing Types First**:
   - Review `shared/` directory before creating new types
   - Reuse existing patterns and interfaces
   - Extend existing types rather than duplicating

2. **Type Definition Location**:
   - API types: `shared/api.ts`
   - Domain types: `shared/types.ts` or feature-specific files
   - Validation: `shared/schemas.ts` or alongside types

3. **Import Pattern Consistency**:
   - Always use `@shared/` alias
   - Import specific types, not entire modules
   - Maintain consistent naming conventions

4. **Validation Integration**:
   - Define Zod schemas alongside types
   - Use schema inference for type generation
   - Share validation between client and server

### Common Tasks

**Adding API Endpoint Types**:
1. Define request/response interfaces in `shared/api.ts`
2. Export types with descriptive names
3. Use in both server route handlers and client API calls
4. Add validation schemas if needed

**Creating Utility Functions**:
1. Write pure functions (no side effects)
2. Add comprehensive TypeScript types
3. Test on both client and server if applicable
4. Document usage patterns and examples