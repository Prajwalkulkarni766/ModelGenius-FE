# ModelGenius Frontend

AI-powered machine learning model builder built with React, TypeScript, and Electron.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Desktop**: Electron

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs the app in development mode. Open http://localhost:5173 to view in browser.

## Build

```bash
# Build for web
npm run build:renderer

# Build Electron app
npm run dist
```

Builds the app for production. Output is in the `dist` folder.

## Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── pages/           # Page components
├── components/     # Reusable UI components
├── layouts/        # Layout components
├── services/       # API services
├── store/          # Zustand stores
├── types/          # TypeScript types
├── router/         # React Router configuration
└── theme.ts        # MUI theme configuration
```

## Features

- User authentication (Login, Signup, Forgot Password)
- Project management
- Model creation and management
- Dataset handling
- Settings configuration
