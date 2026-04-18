# Product: AI Render Assistant

An AI-powered architectural visualization tool that transforms raw SketchUp exports into photorealistic renders in seconds.

## Core Value Proposition

- Upload a raw SketchUp image + describe the desired style via text prompt
- AI processes the image on the backend and returns a photorealistic render
- No expensive hardware required — all heavy processing runs in the cloud

## Target Users

Architects, interior designers, and design studios who need fast, affordable render previews without traditional render pipelines.

## Key Pages

- **Home (`/`)** — Marketing landing page with hero, features, how-it-works, and pricing sections
- **Login (`/login`)** — User authentication
- **Workspace (`/workspace`)** — Core product: upload image, enter prompt, view AI render result

## Backend Dependency

The frontend calls a local Express backend at `http://localhost:3000/api/render` (multipart/form-data POST). The backend handles AI processing and returns `{ success: boolean, imageUrl: string }`.
