# The Bin Running Brothers Website

This repository contains the website for The Bin Running Brothers trash service.

## Project Structure

- `bin-running-brothers/` - Static HTML site (main website)
- `src/` - React application (if needed for future features)

## Local Preview

To preview the static site locally before pushing changes live, you have two options:

### Option 1: Using the preview script (Recommended)
```bash
./preview.sh
```

### Option 2: Using npm
```bash
npm run preview:site
```

### Option 3: Manual Python server
```bash
cd bin-running-brothers
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

Press `Ctrl+C` to stop the server when you're done.

## React + Vite

The React/Vite setup is available for future development. Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
