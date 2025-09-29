# Miima Backend - Production Build

This folder contains the compiled and bundled version of the Miima Backend application, ready for deployment.

## Contents

- `server.js` - Bundled application with all dependencies included
- `package.json` - Minimal package configuration for production
- `vercel.json` - Vercel deployment configuration
- `.env` - Environment variables (update with production values)
- `README.md` - This file

## Deployment to Vercel

### Option 1: Deploy from this folder directly

1. Navigate to this dist folder:
   ```bash
   cd dist
   ```

2. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

3. Deploy:
   ```bash
   vercel
   ```

### Option 2: Deploy via Vercel Dashboard

1. Zip this entire `dist` folder
2. Upload to Vercel dashboard
3. Configure environment variables in Vercel dashboard

## Environment Variables

Make sure to set these environment variables in Vercel:

- `MONGODB_URI` - Your MongoDB connection string
- `PORT` - Will be automatically set by Vercel
- `NODE_ENV` - Set to "production"
- Any other environment variables from your `.env` file

## Local Testing

To test this build locally:

```bash
node server.js
```

The server will start on the port specified in your environment variables (default: 4000).

## File Size

The bundled `server.js` file is approximately 5.4MB and includes all necessary dependencies, making this a truly standalone deployment package.