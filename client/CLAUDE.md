# Client Module - Frontend Architecture Documentation

## Frontend Architecture Overview

The client module is a modern React Single Page Application (SPA) built with TypeScript, using Vite as the build tool and Tailwind CSS for styling. It follows a component-based architecture with clear separation of concerns.

## Directory Structure

```
client/
├── App.tsx                 # Root component and app setup
├── global.css             # Global styles and CSS variables
├── pages/                 # Top-level route components
│   ├── Index.tsx          # Main landing page
│   └── NotFound.tsx       # 404 error page
└── components/            # Reusable UI components
    └── ui/                # Radix UI-based component library
        ├── accordion.tsx
        ├── alert.tsx
        ├── button.tsx
        ├── card.tsx
        └── [50+ components]
```

## Application Architecture

### Root Component Structure (`App.tsx`)

```typescript
App Component Hierarchy:
├── QueryClientProvider (React Query)
│   └── ThemeProvider (next-themes)
│       └── TooltipProvider (Radix UI)
│           ├── Toaster (shadcn/ui)
│           ├── Sonner (toast notifications)
│           └── BrowserRouter (React Router)
│               └── Routes
│                   ├── Route: "/" → Index
│                   └── Route: "*" → NotFound
```

### Provider Stack Details

1. **QueryClientProvider** (@tanstack/react-query)
   - **Purpose**: Server state management and caching
   - **Configuration**: Default QueryClient instance
   - **Usage**: API data fetching and caching

2. **ThemeProvider** (next-themes)
   - **Attribute**: `class` (CSS class-based theming)
   - **Default Theme**: `light`
   - **System Support**: Enabled (respects OS preference)
   - **Storage**: localStorage persistence

3. **TooltipProvider** (Radix UI)
   - **Purpose**: Global tooltip context for accessible tooltips
   - **Scope**: All child components can use Tooltip components

4. **BrowserRouter** (React Router DOM)
   - **Routing Strategy**: Client-side routing with history API
   - **Fallback**: Catch-all route for 404 handling

## Component Architecture

### UI Component Library Structure

The project uses a **shadcn/ui** approach with Radix UI primitives:

```typescript
Component Categories:
├── Layout Components
│   ├── accordion.tsx          # Collapsible content sections  
│   ├── breadcrumb.tsx         # Navigation breadcrumbs
│   ├── separator.tsx          # Visual dividers
│   └── sidebar.tsx            # Side navigation panel
│
├── Form Components  
│   ├── button.tsx             # Interactive buttons
│   ├── checkbox.tsx           # Boolean input controls
│   ├── input.tsx              # Text input fields
│   ├── form.tsx               # Form context and validation
│   ├── label.tsx              # Accessible form labels
│   └── select.tsx             # Dropdown selection
│
├── Data Display
│   ├── badge.tsx              # Status indicators
│   ├── card.tsx               # Content containers
│   ├── table.tsx              # Tabular data display
│   ├── chart.tsx              # Data visualization
│   └── avatar.tsx             # User profile images
│
├── Overlay Components
│   ├── dialog.tsx             # Modal dialogs
│   ├── popover.tsx            # Floating content
│   ├── tooltip.tsx            # Contextual hints
│   ├── sheet.tsx              # Sliding panels
│   └── drawer.tsx             # Mobile-friendly overlays
│
├── Navigation
│   ├── menubar.tsx            # Horizontal menu
│   ├── navigation-menu.tsx    # Complex navigation
│   ├── context-menu.tsx       # Right-click menus
│   └── command.tsx            # Command palette
│
└── Feedback Components
    ├── alert.tsx              # Status messages  
    ├── toast.tsx              # Temporary notifications
    ├── sonner.tsx             # Advanced toast system
    └── progress.tsx           # Loading indicators
```

### Component Implementation Pattern

All UI components follow this structure:
```typescript
// Radix UI primitive import
import * as RadixComponent from "@radix-ui/react-component"

// Tailwind styling with class-variance-authority
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Variant definition
const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { /* variant classes */ },
      size: { /* size classes */ }
    },
    defaultVariants: { /* defaults */ }
  }
)

// Component with forwarded ref
const Component = React.forwardRef<ElementRef, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <RadixComponent.Root
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
)
```

## Styling Architecture

### CSS Framework: Tailwind CSS

**Configuration File**: `tailwind.config.ts`

#### Custom Design System
```typescript
Theme Extensions:
├── Colors
│   ├── revz: { red: "#FF1801", dark: "#0A0A0A" }  # Brand colors
│   ├── CSS variables (--background, --foreground, etc.)
│   └── Dark mode variants
│
├── Typography  
│   ├── fontFamily.nevera: ['Orbitron', 'Inter', 'sans-serif']
│   └── fontFamily.numans: ['Numans', 'Inter', 'sans-serif']
│
├── Spacing & Layout
│   ├── borderRadius: CSS variable based (--radius)
│   └── container: centered with responsive padding
│
└── Animations
    ├── accordion-down/up: Height animations
    └── Custom keyframes for UI interactions
```

### Global Styles (`global.css`)

#### Font Loading Strategy
```css
/* Google Fonts import with display=swap for performance */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Orbitron:wght@400;500;700&family=Numans:wght@400;700&display=swap");
```

#### CSS Variable System
```css
Theme Variables (Light Mode):
--background: 0 0% 100%           # White background
--foreground: 222.2 84% 4.9%      # Dark text
--primary: 222.2 47.4% 11.2%      # Primary brand color
--card: 0 0% 100%                 # Card backgrounds
--border: 214.3 31.8% 91.4%       # Border colors

Theme Variables (Dark Mode):  
--background: 222.2 84% 4.9%       # Dark background
--foreground: 210 40% 98%          # Light text
--card: 222.2 84% 4.9%            # Dark card backgrounds
```

#### Utility Classes
```css
Base Styles Applied:
- All elements: @apply border-border
- Body: @apply bg-background text-foreground
```

## Page Components

### Index.tsx - Main Landing Page

**Component Structure**:
```typescript
Landing Page Sections:
├── Theme Toggle (Fixed Position)
│   └── Sun/Moon icon with theme switching
│
├── Main Grid Layout (lg:grid-cols-3)
│   ├── Story Card (Video + Content)
│   ├── Hero Card (Main CTA) 
│   ├── Stats Card (User metrics)
│   └── Pricing Cards (Plans display)
│
├── Features Section (4-column grid)
│   ├── Feature 01: Live Race Tracking
│   ├── Feature 02: Personalized Feed  
│   ├── Feature 03: Interactive Circuit Maps
│   └── Feature 04: Stats Hub
│
└── Bottom Navigation
    ├── Mobile Menu Button
    ├── REVZ Logo (SVG)
    └── Download App CTA
```

**Key Implementation Details**:
- **Responsive Design**: Mobile-first with `sm:`, `lg:` breakpoints
- **Theme Integration**: Uses `useTheme()` hook with mounted state check
- **Image Handling**: External URLs from Builder.io CDN
- **Typography**: Brand fonts (`font-nevera`, `font-numans`)
- **Color Usage**: Brand colors (`revz-red`, `revz-dark`)

### NotFound.tsx - 404 Error Page

**Purpose**: Fallback route for unmatched URLs in SPA routing

## State Management Architecture

### Client State Management
- **Local State**: React `useState` and `useEffect` hooks
- **Theme State**: `next-themes` useTheme hook
- **Router State**: React Router's built-in state management

### Server State Management
- **Library**: @tanstack/react-query (React Query)
- **Configuration**: Default QueryClient with standard caching
- **Usage Pattern**: For API data fetching and synchronization

### State Patterns Used
```typescript
// Theme state (persistent)
const { theme, setTheme } = useTheme()
const [mounted, setMounted] = useState(false)

// Component lifecycle management
useEffect(() => {
  setMounted(true)
}, [])

// Conditional rendering for hydration
if (!mounted) return null
```

## Import Path Resolution

### Path Aliases
```typescript
// tsconfig.json and vite.config.ts
"@/*" → "client/*"        # Client module imports
"@shared/*" → "shared/*"  # Shared utility imports

// Usage examples
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" 
import type { ApiResponse } from "@shared/types"
```

### Import Conventions
- **UI Components**: `@/components/ui/[component]`
- **Pages**: `@/pages/[page]`
- **Utils**: `@/lib/[utility]`
- **Assets**: Relative paths from component location
- **External Libraries**: Standard npm imports

## Build Integration

### Vite Configuration (`vite.config.ts`)
```typescript
Client Build Settings:
├── Output Directory: "dist/spa"
├── Plugins: [react(), expressPlugin()]  
├── Resolve Aliases: @ → ./client, @shared → ./shared
├── Server Config: host: "::", port: 8080
└── File System: allow client/ and shared/, deny .env and server/
```

### Development Features
- **Hot Module Replacement**: Instant updates without page refresh
- **TypeScript Integration**: Type checking during development  
- **Express Middleware**: API routes available during dev
- **Fast Refresh**: React state preservation during updates

## Performance Considerations

### Bundle Optimization
- **Code Splitting**: Automatic route-based splitting via React Router
- **Tree Shaking**: Unused code elimination via Vite/Rollup
- **Asset Optimization**: Image and font loading optimization
- **CSS Purging**: Tailwind CSS unused class removal

### Runtime Performance
- **React Query Caching**: Automatic API response caching
- **Theme Persistence**: localStorage-based theme state
- **Lazy Loading**: Component-level code splitting opportunities
- **Font Display**: `display=swap` for improved loading performance

## Development Workflow for AI Agents

### Common Tasks

#### Adding New Page Component
1. Create component file in `client/pages/[PageName].tsx`
2. Export default React component function
3. Add route in `client/App.tsx` Routes configuration
4. Use existing UI components from `@/components/ui/`

#### Adding New UI Component
1. Create component in `client/components/ui/[component].tsx`
2. Follow Radix UI + CVA pattern from existing components
3. Export component with proper TypeScript types
4. Add to component index if needed

#### Styling New Components
1. Use Tailwind utility classes primarily
2. Follow existing color scheme (`revz-red`, `revz-dark`)
3. Use typography scale (`font-nevera`, `font-numans`)
4. Implement dark mode support via CSS variables

#### API Integration
1. Use React Query for data fetching
2. Create API calls targeting `/api/*` endpoints
3. Implement loading and error states
4. Cache responses appropriately

### File Navigation for AI Agents

**Start Points**:
- **App Entry**: `client/App.tsx`
- **Main Page**: `client/pages/Index.tsx`  
- **Global Styles**: `client/global.css`
- **Component Library**: `client/components/ui/`

**Key Files to Understand**:
- **Theme System**: Usage of `useTheme` hook and CSS variables
- **Responsive Design**: Tailwind breakpoint usage patterns
- **Component Composition**: How Radix UI primitives are extended
- **Type Safety**: TypeScript integration with React components