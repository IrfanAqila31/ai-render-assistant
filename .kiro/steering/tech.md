# Tech Stack

## Core

- **React 19** with **TypeScript 6** (strict mode, `verbatimModuleSyntax`)
- **Vite 8** — build tool and dev server
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin (no `tailwind.config.js`, configured through Vite)
- **React Router v7** — client-side routing via `BrowserRouter`

## Key Libraries

- **axios** — HTTP client for backend API calls
- **zod** — runtime response validation (schema-first, parse API responses before use)
- **framer-motion** — animations on landing page components
- **lucide-react** — icon library

## TypeScript Config

- Target: `ES2023`, module resolution: `bundler`
- Strict linting: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- JSX: `react-jsx` (no React import needed in files)
- `erasableSyntaxOnly: true` — avoid `enum` and `namespace`, use `const` objects or union types instead

## Common Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Type-check + production build (tsc -b && vite build)
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## Linting

ESLint 9 with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
