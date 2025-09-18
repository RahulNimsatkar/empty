# Adnoxy Billboard Platform - Replit Setup

## Project Overview
Modern billboard advertising platform with AI-powered brand analysis capabilities. Built with React, TypeScript, and Express.js.

## Current State ✅
- **Environment**: Successfully configured for Replit 
- **Frontend**: React + TypeScript with Vite, running on port 5000
- **Backend**: Express.js server with middleware setup
- **Database**: PostgreSQL configured and connected
- **Deployment**: Configured for autoscale deployment

## Architecture
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Hugging Face brand analysis API
- **Routing**: Wouter for client-side routing

## Key Features
1. **Billboard Suggestion Form** - Complete form with validation
2. **AI Brand Analysis** - Integrated with Hugging Face model with smart caching
3. **Smart Database Caching** - Skips AI analysis for existing brand data
4. **Live Preview** - Real-time billboard preview
5. **Responsive Design** - Mobile-first approach
6. **Modern UI** - Built with shadcn/ui components

## Configuration Details

### Vite Configuration
- Host: `0.0.0.0` (required for Replit)
- Port: `5000`
- `allowedHosts: true` (required for Replit proxy)
- Path aliases configured for `@/`, `@shared/`, `@assets/`

### Server Configuration  
- Express server with logging middleware
- Vite integration for development
- Static file serving for production
- Host: `0.0.0.0:5000`

### Database
- PostgreSQL with Drizzle ORM
- Schema: Basic user authentication setup
- Environment: `DATABASE_URL` configured

## Recent Changes (September 2025)
- ✅ Fixed Firebase Project ID configuration (was using sender ID instead of project ID)
- ✅ Implemented meaningful document IDs in Firebase (using website URLs instead of random IDs)
- ✅ Added smart database caching to skip expensive AI analysis for existing data
- ✅ Fixed TypeScript configuration issues
- ✅ Replaced `import.meta.dirname` with proper Node.js equivalents
- ✅ Added Replit-specific Vite configuration
- ✅ Configured workflows for development server
- ✅ Set up deployment configuration

## Workflow
- **DevServer**: `npm run dev` - Development server on port 5000

## Environment Variables Needed
- `VITE_HF_TOKEN` - Hugging Face API token for brand analysis

## Project Structure
```
├── client/src/          # React frontend
├── server/              # Express backend  
├── shared/              # Shared types/schemas
├── attached_assets/     # Static assets
└── package.json         # Dependencies
```

## User Preferences
- Modern, clean UI with shadcn/ui components
- TypeScript for type safety
- Responsive mobile-first design
- AI integration for brand analysis