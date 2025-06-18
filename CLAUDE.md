# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Vite development server with hot reloading on port 8080
- `npm run build` - Build production bundle with Vite
- `npm run preview` - Preview production build locally
- `npm start` - Build and start Express server on port 9876
- `npm run lint` - Run ESLint for code quality checks

## Architecture Overview

This is a React-Redux single-page application that clones Hacker News functionality.

### Key Architectural Patterns

1. **Redux Store Structure**: The app uses Redux with redux-thunk for async actions. State is divided into:
   - `items`: Stores all fetched items (stories, comments, jobs) keyed by ID
   - `user`: Stores user data keyed by username
   - `routing`: Managed by react-router-redux

2. **API Integration**: The app uses two external APIs:
   - Hacker News Firebase API (`https://hacker-news.firebaseio.com/v0/`) for primary data
   - Algolia HN Search API (`https://hn.algolia.com/api/v1/`) for search functionality

3. **Component Organization**:
   - `components/` contains presentational components
   - `containers/` contains Redux-connected components
   - Components are organized by feature (comments, items, stories, user)

4. **Routing**: Client-side routing is handled by React Router 3.x. All routes are defined in `src/routes.js`. The Express server serves the same index.html for all routes to support client-side routing.

5. **Styling**: Uses Stylus preprocessor with component-specific stylesheets alongside JavaScript files.

### Important Technical Details

- **Updated to modern stack**: React 18, Redux Toolkit, Vite, React Router v6
- ESLint is used for linting
- Vite is configured to treat .js files as JSX for gradual migration
- The build outputs to `dist/` directory
- Development server runs on port 8080, production on port 9876
- Many components still need conversion from class to function components
- Stylus files are being migrated to CSS