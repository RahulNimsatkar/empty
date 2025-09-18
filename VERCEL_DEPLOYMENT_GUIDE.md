# Vercel Deployment Guide

This guide will help you deploy your fullstack JavaScript application to Vercel.

## Project Structure for Vercel

Your project has been configured for Vercel deployment with the following structure:

```
project/
├── api/                    # Serverless functions for Vercel
│   ├── index.js           # Main API entry point
│   └── package.json       # Backend dependencies
├── client/                # Frontend source code
├── shared/                # Shared types and utilities
├── dist/                  # Build output directory
├── vercel.json           # Vercel configuration
└── package.json          # Main dependencies
```

## Deployment Steps

### 1. Environment Variables

Before deploying, you need to set up the following environment variables in your Vercel dashboard:

#### Firebase Configuration (Required)
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Server-side Firebase variables (same values as above, without VITE_ prefix)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Hugging Face Configuration (Required)
```
HF_TOKEN=hf_your_hugging_face_token
VITE_HF_TOKEN=hf_your_hugging_face_token
```

#### Database Configuration (Optional - if using database)
```
DATABASE_URL=your_postgresql_connection_string
```

### 2. Deploy to Vercel

#### Option A: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click "Add New Project"
3. Import your GitHub repository
4. Configure the project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (uses existing build script)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Add all environment variables listed above in the Vercel dashboard
6. Click "Deploy"

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. Configuration Files

The following files have been created/configured for Vercel deployment:

#### `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "functions": {
    "api/index.js": {
      "includeFiles": "shared/**"
    }
  }
}
```

#### `api/package.json`
Contains the necessary dependencies for the serverless API functions.

### 4. How It Works

1. **Frontend:** Your Vite React app is built and served as static files
2. **Backend:** Your Express API routes are converted to Vercel serverless functions
3. **Routing:** All `/api/*` requests are routed to the serverless function
4. **Client-side routing:** All other requests serve the React app (for SPA routing)

### 5. Environment Variable Access

- **Client-side:** Use `import.meta.env.VITE_VARIABLE_NAME`
- **Server-side:** Use `process.env.VARIABLE_NAME`

### 6. Post-Deployment Verification

After deployment, verify:

1. Frontend loads correctly
2. API endpoints respond (test `/api/brand-profiles`)
3. Firebase integration works
4. Hugging Face analysis functions work
5. Database operations work (if applicable)

### 7. Troubleshooting

#### Common Issues:

1. **404 on page reload:** The `vercel.json` rewrites should handle this
2. **Environment variables not working:** Ensure variables are set in Vercel dashboard and have correct prefixes
3. **API routes not working:** Check that all routes use `/api` prefix
4. **Build errors:** Check that all dependencies are listed in respective package.json files

#### Debug Steps:

1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Test API endpoints directly
4. Check browser console for client-side errors

## Additional Notes

- The original development server setup (`server/index.ts`) is preserved for local development
- Vercel will automatically detect the framework and use the appropriate build settings
- Make sure to test your deployment thoroughly before going to production
- Consider setting up different environments (preview/production) in Vercel for better workflow