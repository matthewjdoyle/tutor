# Dr. Doyle's Maths, Physics & Coding Tutoring

A modern, interactive tutoring platform built with React and TypeScript.

## Features

- Interactive learning modules
- Real-time problem solving
- Progress tracking
- Responsive design

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment

This project is configured for automatic deployment to GitHub Pages. When you push to the main branch, GitHub Actions will automatically build and deploy the site.

### Manual Deployment

To deploy manually:

1. Run `npm run build`
2. The built files will be in the `dist` directory
3. Deploy the `dist` directory to your hosting provider

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Set source to "GitHub Actions"
4. Add your `GEMINI_API_KEY` as a repository secret

## Fixed Issues

- ✅ KaTeX CSS integrity hash corrected
- ✅ Tailwind CSS moved from CDN to proper build process
- ✅ Removed 404 errors for missing CSS/JS files
- ✅ Fixed MIME type issues with module scripts
- ✅ Configured proper GitHub Pages deployment
