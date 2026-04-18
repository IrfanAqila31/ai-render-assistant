# Project Structure

```
src/
├── pages/          # Route-level components (one file per route)
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── WorkspacePage.tsx
├── components/     # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── FeaturesSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── PricingSection.tsx
│   ├── ImageUpload.tsx
│   ├── PromptInput.tsx
│   └── RenderResult.tsx
├── services/       # API calls and external integrations
│   └── aiServices.ts
├── types/          # Shared TypeScript types
│   └── render.ts
├── App.tsx         # Route definitions
├── main.tsx        # App entry point, BrowserRouter setup
└── index.css       # Global styles
```

## Conventions

- **Pages** own state and orchestrate child components. They handle data fetching and pass data down via props.
- **Components** are stateless or locally stateful UI units. They receive data and callbacks via typed props interfaces.
- **Services** encapsulate all `axios` calls. Always validate responses with a Zod schema before returning data to the caller. Throw typed `Error` objects on failure.
- **Types** shared across multiple files live in `src/types/`. Co-locate types that are only used in one file.
- All components use `default export`. Named exports are used for types and utilities.
- Props interfaces are defined inline at the top of the component file using the `interface ComponentNameProps` naming convention.
- Tailwind utility classes are used directly in JSX — no CSS modules or separate style files for components.
- Semantic HTML elements (`<section>`, `<article>`, `<header>`, `<figure>`, `<fieldset>`) are preferred over generic `<div>` where appropriate.
