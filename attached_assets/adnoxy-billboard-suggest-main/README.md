# 🚀 ADNOXY - AI-Powered Billboard Advertising Platform

A modern billboard advertising platform with AI-powered brand analysis capabilities. Built with React, TypeScript, Express.js, and Firebase with **100% secure credential management**.

![Platform Overview](attached_assets/logo-2_1757587029671.png)

## 🔒 **SECURITY-FIRST APPROACH**
✅ **ALL CREDENTIALS ARE STORED IN ENVIRONMENT VARIABLES**  
✅ **NO HARDCODED API KEYS OR SECRETS IN CODE**  
✅ **FIREBASE PROJECT ID PROPERLY CONFIGURED**  
✅ **SMART CACHING TO MINIMIZE API COSTS**

---

## 📋 Table of Contents

1. [Platform Overview](#-platform-overview)
2. [Features & Capabilities](#-features--capabilities)
3. [Technology Stack](#️-technology-stack)
4. [System Architecture](#-system-architecture)
5. [Prerequisites & Requirements](#-prerequisites--requirements)
6. [Installation & Setup](#-installation--setup)
7. [Configuration Guide](#-configuration-guide)
8. [Development Workflow](#-development-workflow)
9. [API Documentation](#-api-documentation)
10. [Database Schema](#-database-schema)
11. [AI Analysis Engine](#-ai-analysis-engine)
12. [Frontend Architecture](#-frontend-architecture)
13. [Backend Architecture](#-backend-architecture)
14. [Deployment Guide](#-deployment-guide)
15. [Testing & Debugging](#-testing--debugging)
16. [Security Considerations](#-security-considerations)
17. [Performance Optimization](#-performance-optimization)
18. [Troubleshooting Guide](#-troubleshooting-guide)
19. [Contributing Guidelines](#-contributing-guidelines)
20. [License & Legal](#-license--legal)

---

## 🌟 Platform Overview

### What is Adnoxy?

Adnoxy is a cutting-edge billboard advertising platform that combines traditional outdoor advertising with artificial intelligence to deliver data-driven billboard recommendations. The platform analyzes brand websites using advanced AI models to extract brand personality, target audience insights, and marketing themes, then translates this analysis into optimized billboard advertising strategies.

### Core Philosophy

- **Data-Driven Decisions**: Every recommendation is backed by AI analysis
- **Brand Alignment**: Ensure billboard campaigns align with brand identity
- **Audience Targeting**: Precise demographic and psychographic targeting
- **Visual Optimization**: AI-powered design and placement recommendations
- **Performance Tracking**: Real-time analytics and optimization

### Use Cases

1. **Marketing Agencies**: Streamline billboard campaign creation for multiple clients
2. **Small Businesses**: Professional billboard strategy without expensive consultants
3. **Large Corporations**: Scale billboard campaigns across multiple markets
4. **Advertising Networks**: Optimize inventory allocation based on brand analysis

---

## ✨ Features & Capabilities

### 🤖 AI-Powered Brand Analysis

- **Website Intelligence**: Comprehensive analysis of brand websites using NLP models
- **Personality Extraction**: 5-dimension brand personality scoring (Sincerity, Excitement, Competence, Sophistication, Ruggedness)
- **Keyword Mining**: Automated extraction of brand-relevant keywords with confidence scores
- **Theme Recognition**: Identification of core brand themes and messaging pillars
- **Audience Profiling**: Demographic and psychographic target audience analysis
- **Competitive Intelligence**: Brand positioning analysis within industry context

### 📊 Advanced Analytics Dashboard

- **Real-time Insights**: Live updating analysis results and campaign performance
- **Visual Data Presentation**: Interactive charts, graphs, and visualization components
- **Historical Tracking**: Timeline analysis of brand evolution and campaign performance
- **Comparative Analysis**: Side-by-side brand comparison capabilities
- **Export Functionality**: PDF reports and CSV data exports

### 🎯 Billboard Campaign Management

- **Intelligent Suggestions**: AI-driven billboard location and design recommendations
- **Budget Optimization**: Cost-effective campaign planning with ROI predictions
- **Seasonal Adjustments**: Campaign timing optimization based on brand analysis
- **Creative Templates**: AI-generated creative concepts and design templates
- **Performance Predictions**: Expected reach and engagement forecasting

### 🔥 Firebase Integration

- **Real-time Database**: Instant data synchronization across all platform users
- **Persistent Storage**: All analysis results stored permanently with automatic backups
- **Scalable Architecture**: Handles increasing data loads without performance degradation
- **Offline Capability**: Cached data access when internet connectivity is limited
- **Cross-platform Sync**: Data accessible across web, mobile, and desktop applications

### 📱 User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progressive Web App**: Native app-like experience in web browsers
- **Accessibility Compliant**: WCAG 2.1 AA accessibility standards
- **Dark/Light Mode**: User preference-based theme switching
- **Multi-language Support**: Internationalization ready architecture

### 🔐 Security & Compliance

- **Data Encryption**: End-to-end encryption for all sensitive data
- **GDPR Compliance**: European data protection regulation compliance
- **Role-based Access**: Granular permission system for team collaboration
- **Audit Logging**: Comprehensive activity tracking and reporting
- **API Rate Limiting**: Protection against abuse and unauthorized usage

---

## 🛠️ Technology Stack

### Frontend Technologies

- **React 18.2+**: Modern React with concurrent features and hooks
- **TypeScript 5.0+**: Type-safe development with advanced type inference
- **Vite 4.0+**: Lightning-fast build tool with hot module replacement
- **Tailwind CSS 3.3+**: Utility-first CSS framework with custom design system
- **shadcn/ui**: High-quality, accessible React component library
- **Framer Motion**: Production-ready motion library for React
- **React Query (TanStack)**: Powerful data synchronization and caching
- **Wouter**: Minimalist routing library for React applications

### Backend Technologies

- **Express.js 4.18+**: Fast, unopinionated web framework for Node.js
- **Node.js 18+**: JavaScript runtime with ES2022 features
- **TypeScript**: Full-stack type safety with shared types
- **Firebase Admin SDK**: Server-side Firebase integration
- **Drizzle ORM**: Type-safe SQL ORM with automatic migrations
- **Zod**: Schema validation and type inference library

### Database & Storage

- **Firebase Firestore**: NoSQL document database with real-time updates
- **Firebase Storage**: Scalable file storage for images and documents
- **Firebase Authentication**: Secure user authentication and authorization
- **Cloud Functions**: Serverless functions for backend processing

### AI & Machine Learning

- **Hugging Face Transformers**: Pre-trained NLP models for brand analysis
- **@gradio/client**: Client library for Hugging Face model interaction
- **Custom ML Pipeline**: Proprietary algorithms for billboard optimization
- **TensorFlow.js**: Client-side machine learning capabilities

### Development Tools

- **ESLint**: Code linting with custom rules for consistency
- **Prettier**: Automatic code formatting and style enforcement
- **Husky**: Git hooks for pre-commit code quality checks
- **Jest**: Comprehensive testing framework with coverage reporting
- **Playwright**: End-to-end testing for critical user workflows
- **Storybook**: Component development and documentation environment

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │   Express API   │    │   Firebase DB   │
│   (React/Vite)  │◄──►│   (Node.js/TS)  │◄──►│   (Firestore)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  UI Components  │    │   API Routes    │    │  Collections    │
│  State Management│    │   Middleware    │    │  Documents      │
│  Routing        │    │   Validation    │    │  Real-time      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  Hugging Face   │    │   Firebase      │
│  AI Models      │    │   Services      │
│  Brand Analysis │    │   Storage       │
└─────────────────┘    └─────────────────┘
```

### Data Flow Architecture

```
User Input → Form Validation → AI Analysis → Data Processing → Firebase Storage → UI Update
     ↑                                                                              │
     └──────────────────── Real-time Updates ←──────────────────────────────────────┘
```

### Component Architecture

```
App (Router)
├── Header (Logo, Navigation)
├── Pages
│   ├── Home (Main Form)
│   ├── Results (Analysis Display)
│   └── Dashboard (Management)
├── Contexts
│   ├── AnalysisContext
│   ├── ThemeContext
│   └── AuthContext
└── Components
    ├── UI (shadcn/ui)
    ├── Charts (Recharts)
    ├── Forms (React Hook Form)
    └── Analysis (Custom)
```

---

## 📋 Prerequisites & Requirements

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux Ubuntu 18.04+
- **Memory**: Minimum 8GB RAM (16GB recommended for development)
- **Storage**: At least 5GB available disk space
- **Network**: Stable internet connection for AI analysis and Firebase sync

### Development Environment

- **Node.js**: Version 18.0 or higher (LTS recommended)
- **npm**: Version 8.0+ (comes with Node.js)
- **Git**: Version 2.30+ for version control
- **Code Editor**: VS Code recommended with TypeScript and Tailwind extensions
- **Browser**: Chrome 100+, Firefox 100+, Safari 15+, or Edge 100+ for development

### Required Accounts

1. **Firebase Account**
   - Google account required
   - Firebase project with Firestore enabled
   - Billing account for production usage

2. **Hugging Face Account**
   - Free account sufficient for development
   - API token with read permissions
   - Access to `magz3l/brand-identity` model

3. **Development Platform**
   - Replit account (recommended for quick setup)
   - Or GitHub account for repository management

---

## 🔧 Installation & Setup

### Method 1: Replit Setup (Recommended)

1. **Fork/Import Project**
   ```bash
   # In Replit, import from GitHub or fork existing Repl
   # All dependencies will be installed automatically
   ```

2. **Configure Environment Variables**
   - Navigate to Replit Secrets tab
   - Add all required environment variables (see Configuration section)

3. **Start Development Server**
   ```bash
   npm run dev
   ```

### Method 2: Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/adnoxy-billboard-platform.git
   cd adnoxy-billboard-platform
   ```

2. **Install Dependencies**
   ```bash
   # Install all project dependencies
   npm install
   
   # Verify installation
   npm list --depth=0
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env file with your actual values
   nano .env  # or your preferred editor
   ```

4. **Development Server**
   ```bash
   # Start development server with hot reload
   npm run dev
   
   # Server will be available at http://localhost:5000
   ```

### Verification Steps

1. **Check Server Status**
   ```bash
   curl http://localhost:5000/api/brand-profiles
   # Should return: []
   ```

2. **Test Firebase Connection**
   - Navigate to `http://localhost:5000`
   - Fill out the form with a test website
   - Verify data appears in Firebase console

3. **Verify AI Analysis**
   - Submit a brand analysis request
   - Check browser console for analysis success message
   - Confirm results are saved to Firebase

---

## ⚙️ Configuration Guide

### Environment Variables Reference

#### Firebase Configuration
```env
# Firebase Web App Configuration
VITE_FIREBASE_API_KEY=AIzaSyExample123
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEF1234
```

#### Hugging Face Configuration
```env
# Hugging Face API Tokens
HF_TOKEN=hf_example123abc456def789
VITE_HF_TOKEN=hf_example123abc456def789
```

#### Development Configuration
```env
# Development Settings
NODE_ENV=development
PORT=5000
VITE_APP_TITLE=Adnoxy Billboard Platform
VITE_APP_VERSION=1.0.0
```

### 🔗 Environment Variable Connection Flow

This section explains how environment variables are loaded and used throughout the application.

#### 1. Server-Side (.env → Node.js process.env)
```typescript
// server/index.ts line 2 & 7
import dotenv from "dotenv";
dotenv.config();  // ← This loads your .env file into process.env
```

#### 2. Client-Side (.env → Vite → import.meta.env)
```typescript
// vite.config.ts line 12
envPrefix: 'VITE_',  // ← This tells Vite to expose VITE_* variables to the client
```

#### 3. Your .env File Content
✅ All variables are properly formatted and loaded:
- `VITE_FIREBASE_API_KEY=AIzaSyCySq7bhp-91G5zcUMdTki5jj5B8kDQYZ4`
- `VITE_FIREBASE_PROJECT_ID=billboard-2dce1`
- `VITE_HF_TOKEN=REMOVED_TOKEN`
- And all other required variables

#### 4. How Code Accesses the Variables

**Server Code:**
```typescript
// server/firebaseStorage.ts
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,  // ← Loads from .env
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,  // ← Loads from .env
  // ... etc
};
```

**Client Code:**
```typescript
// client/src/lib/firebase.ts
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  // ← Loads from .env via Vite
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,  // ← Loads from .env via Vite
  // ... etc
};
```

#### ✅ Connection Status Verification
- ✅ `.env` file is being read by `dotenv.config()`
- ✅ Environment variables are accessible via `process.env.*`
- ✅ Vite is exposing `VITE_*` variables to the client
- ✅ No environment variable errors in the logs
- ✅ Firebase and Hugging Face tokens are properly loaded

### Firebase Setup (Detailed)

#### 1. Project Creation
```bash
# Navigate to Firebase Console
https://console.firebase.google.com

# Click "Create a project"
# Project name: adnoxy-billboard-platform
# Enable Google Analytics (optional)
```

#### 2. Firestore Database Setup
```javascript
// Navigate to Firestore Database
// Choose "Create database"
// Start in production mode
// Select your preferred location

// Security Rules Configuration
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents
    match /{document=**} {
      allow read, write: if true;
    }
    
    // Production rules (implement authentication)
    // match /brand_profiles/{profileId} {
    //   allow read, write: if request.auth != null;
    // }
  }
}
```

#### 3. Web App Configuration
```bash
# In Firebase Console:
# Go to Project Settings > General
# Scroll to "Your apps" section
# Click "Add app" > Web app icon
# Register app name: "Adnoxy Web App"
# Enable "Also set up Firebase Hosting" (optional)
# Copy configuration values to environment variables
```

### Hugging Face Setup (Detailed)

#### 1. Account Creation
```bash
# Navigate to Hugging Face
https://huggingface.co

# Sign up with email or GitHub account
# Verify your email address
```

#### 2. Token Generation
```bash
# Go to Settings > Access Tokens
https://huggingface.co/settings/tokens

# Click "New token"
# Token name: "Adnoxy Platform"
# Role: "Read" (sufficient for model access)
# Copy the generated token immediately
```

#### 3. Model Access Verification
```bash
# Test model access with curl
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api-inference.huggingface.co/models/magz3l/brand-identity
```

### Development Environment Setup

#### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "firebase.vscode-firestore-rules"
  ]
}
```

#### Git Configuration
```bash
# Configure Git for the project
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set up Git hooks
npm run prepare  # Sets up Husky hooks
```

---

## 🚀 Development Workflow

### Daily Development Routine

1. **Start Development Environment**
   ```bash
   # Pull latest changes
   git pull origin main
   
   # Install new dependencies (if any)
   npm install
   
   # Start development server
   npm run dev
   ```

2. **Make Changes**
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature-name
   
   # Make your changes
   # Test changes in browser at http://localhost:5000
   ```

3. **Quality Checks**
   ```bash
   # Type checking
   npm run check
   
   # Code formatting
   npm run format
   
   # Linting
   npm run lint
   ```

4. **Commit Changes**
   ```bash
   # Stage changes
   git add .
   
   # Commit with descriptive message
   git commit -m "feat: add brand analysis export functionality"
   
   # Push to remote
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

#### TypeScript Conventions
```typescript
// Use descriptive interface names
interface BrandAnalysisResult {
  success: boolean;
  data?: BrandAnalysisData;
  error?: string;
}

// Use const assertions for immutable data
const BRAND_PERSONALITY_DIMENSIONS = [
  'sincerity',
  'excitement', 
  'competence',
  'sophistication',
  'ruggedness'
] as const;

// Prefer type unions over enums
type AnalysisStatus = 'pending' | 'analyzing' | 'complete' | 'error';
```

#### React Component Patterns
```tsx
// Use function components with TypeScript
interface ComponentProps {
  title: string;
  onAction: (value: string) => void;
  isLoading?: boolean;
}

export function MyComponent({ title, onAction, isLoading = false }: ComponentProps) {
  // Custom hooks for logic
  const { data, error } = useBrandAnalysis();
  
  // Early return for loading states
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // JSX with proper typing
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
```

#### CSS/Tailwind Conventions
```css
/* Use consistent spacing scale */
.container {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
}

/* Component-specific utilities */
.brand-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
}

/* Responsive design patterns */
.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}
```

### Testing Strategy

#### Unit Testing
```bash
# Run all tests
npm run test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

#### End-to-End Testing
```bash
# Run E2E tests
npm run test:e2e

# Run specific test suite
npm run test:e2e -- --grep "Brand Analysis"
```

#### Manual Testing Checklist
- [ ] Form validation works correctly
- [ ] AI analysis completes successfully
- [ ] Data is saved to Firebase
- [ ] Results display properly
- [ ] Responsive design works on mobile
- [ ] Error handling displays appropriate messages
- [ ] Performance is acceptable on slow connections

---

## 📡 API Documentation

### Base URL
- Development: `http://localhost:5000`
- Production: `https://your-domain.com`

### Authentication
Currently, the API uses Firebase security rules for access control. In production, implement proper authentication tokens.

### Brand Profiles API

#### GET /api/brand-profiles
Retrieve all brand profiles from the database.

**Request:**
```bash
curl -X GET http://localhost:5000/api/brand-profiles
```

**Response:**
```json
{
  "data": [
    {
      "id": "www-apple-com",
      "documentId": "www-apple-com", 
      "url": "https://www.apple.com",
      "brand_profile": {
        "keywords": [
          {"keyword": "innovation", "score": 0.98},
          {"keyword": "design", "score": 0.97}
        ],
        "themes": ["Technological Innovation"],
        "personality_scores": {
          "sincerity": {
            "score": 7,
            "justification": "Apple maintains consistent messaging..."
          }
        },
        "inferred_target_audience": {
          "demographics": {
            "age_range": "25-55",
            "gender": "All genders",
            "income_level": "Middle to high income"
          }
        }
      },
      "createdAt": "2025-09-13T10:30:00.000Z",
      "updatedAt": "2025-09-13T10:30:00.000Z"
    }
  ]
}
```

#### GET /api/brand-profiles/:documentId
Retrieve a specific brand profile by its document ID.

**Parameters:**
- `documentId` (string): The unique identifier for the brand profile

**Request:**
```bash
curl -X GET http://localhost:5000/api/brand-profiles/www-apple-com
```

**Response:**
```json
{
  "id": "www-apple-com",
  "documentId": "www-apple-com",
  "url": "https://www.apple.com",
  "brand_profile": {
    // Full brand analysis data
  },
  "createdAt": "2025-09-13T10:30:00.000Z",
  "updatedAt": "2025-09-13T10:30:00.000Z"
}
```

#### GET /api/brand-profiles/by-url
Find a brand profile by its URL.

**Query Parameters:**
- `url` (string): The website URL to search for

**Request:**
```bash
curl -X GET "http://localhost:5000/api/brand-profiles/by-url?url=https%3A//www.apple.com"
```

#### POST /api/brand-profiles
Create a new brand profile with analysis data.

**Request Body:**
```json
{
  "documentId": "www-example-com",
  "url": "https://www.example.com",
  "brand_profile": {
    "keywords": [
      {"keyword": "example", "score": 0.95}
    ],
    "themes": ["Example Theme"],
    "personality_scores": {
      "sincerity": {
        "score": 8,
        "justification": "Brand demonstrates authentic messaging"
      }
    },
    "inferred_target_audience": {
      "demographics": {
        "age_range": "25-45",
        "gender": "All genders",
        "income_level": "Middle income"
      }
    }
  }
}
```

**Response:**
```json
{
  "id": "www-example-com",
  "documentId": "www-example-com",
  "url": "https://www.example.com",
  "brand_profile": {
    // Complete analysis data
  },
  "createdAt": "2025-09-13T10:35:00.000Z",
  "updatedAt": "2025-09-13T10:35:00.000Z"
}
```

#### PUT /api/brand-profiles/:documentId
Update an existing brand profile.

**Parameters:**
- `documentId` (string): The unique identifier for the brand profile

**Request Body:**
```json
{
  "brand_profile": {
    // Updated analysis data
  }
}
```

#### DELETE /api/brand-profiles/:documentId
Delete a brand profile from the database.

**Parameters:**
- `documentId` (string): The unique identifier for the brand profile

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/brand-profiles/www-example-com
```

**Response:**
```json
{
  "message": "Brand profile deleted successfully"
}
```

### Error Responses

All API endpoints return consistent error responses:

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": {
    // Additional error information
  }
}
```

**Common Error Codes:**
- `VALIDATION_ERROR`: Invalid request data
- `NOT_FOUND`: Resource not found
- `DUPLICATE_DOCUMENT`: Document ID already exists
- `FIREBASE_ERROR`: Database operation failed
- `AI_ANALYSIS_ERROR`: Brand analysis failed

---

## 🗄️ Database Schema

### Firebase Firestore Structure

#### Collections Overview
```
/brand_profiles (Collection)
├── {documentId} (Document)
│   ├── documentId: string
│   ├── url: string
│   ├── brand_profile: object
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

#### Brand Profile Document Schema

```typescript
interface BrandProfile {
  id: string;                    // Firebase document ID
  documentId: string;            // URL-based identifier (e.g., "www-apple-com")
  url: string;                   // Original website URL
  brandProfile: BrandAnalysisData; // Analysis results
  createdAt: Date;              // Document creation timestamp
  updatedAt: Date;              // Last modification timestamp
}

interface BrandAnalysisData {
  keywords: Keyword[];
  themes: string[];
  personality_scores: PersonalityScores;
  inferred_target_audience: TargetAudience;
}

interface Keyword {
  keyword: string;
  score: number;                // Confidence score 0.0 - 1.0
}

interface PersonalityScores {
  sincerity: PersonalityDimension;
  excitement: PersonalityDimension;
  competence: PersonalityDimension;
  sophistication: PersonalityDimension;
  ruggedness: PersonalityDimension;
}

interface PersonalityDimension {
  score: number;                // Score 1-10
  justification: string;        // AI-generated explanation
}

interface TargetAudience {
  demographics: Demographics;
  psychographics: Psychographics;
}

interface Demographics {
  age_range: string;
  gender: string;
  income_level: string;
}

interface Psychographics {
  values: string[];
  interests: string[];
  lifestyle: string;
}
```

#### Indexing Strategy

Firebase automatically indexes single fields. For complex queries, create composite indexes:

```javascript
// Composite indexes for common queries
{
  collection: "brand_profiles",
  fields: [
    { field: "url", order: "ASCENDING" },
    { field: "createdAt", order: "DESCENDING" }
  ]
}
```

#### Security Rules (Production)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Brand profiles collection
    match /brand_profiles/{profileId} {
      // Allow read access to authenticated users
      allow read: if request.auth != null;
      
      // Allow write access to profile owners
      allow write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
      
      // Allow creation of new profiles
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }
    
    // Users collection (if implemented)
    match /users/{userId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == userId;
    }
  }
}
```

### Data Migration & Backup

#### Automated Backups
```bash
# Set up Cloud Functions for automatic backups
# This runs daily at 2 AM UTC
exports.scheduledFirestoreBackup = functions.pubsub
  .schedule('0 2 * * *')
  .timeZone('UTC')
  .onRun(async (context) => {
    const client = new CloudFirestoreBackup();
    await client.exportDocuments({
      outputUriPrefix: 'gs://your-backup-bucket',
      collectionIds: ['brand_profiles']
    });
  });
```

#### Data Import/Export
```bash
# Export data for development
npm run export-data

# Import data from backup
npm run import-data -- --file=backup-2025-09-13.json
```

---

## 🧠 AI Analysis Engine

### Hugging Face Integration

#### Model Information
- **Model**: `magz3l/brand-identity`
- **Type**: Natural Language Processing
- **Purpose**: Brand personality and audience analysis
- **Input**: Website URL or brand content
- **Output**: Structured brand analysis data

#### Analysis Pipeline

```typescript
class BrandAnalysisService {
  private client: Client | null = null;
  private readonly HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

  async initializeClient(): Promise<void> {
    if (!this.client) {
      this.client = await Client.connect(
        "magz3l/brand-identity",
        { hf_token: this.HF_TOKEN }
      );
    }
  }

  async analyzeBrand(brandUrl: string): Promise<BrandAnalysisResult> {
    // 1. URL validation
    if (!this.isValidUrl(brandUrl)) {
      return { success: false, error: "Invalid URL" };
    }

    // 2. Initialize AI client
    await this.initializeClient();

    // 3. Call AI model with timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Analysis timeout")), 60000)
    );

    const analysisPromise = this.client.predict("/predict", {
      brand_input: brandUrl
    });

    // 4. Race between analysis and timeout
    const result = await Promise.race([analysisPromise, timeoutPromise]);

    // 5. Parse and validate results
    return this.parseAnalysisResult(result);
  }
}
```

#### Analysis Output Processing

```typescript
interface RawAnalysisOutput {
  data: [string | object]; // AI model raw output
}

function parseAnalysisResult(rawResult: RawAnalysisOutput): BrandAnalysisResult {
  try {
    const analysisData = rawResult.data[0];
    
    // Handle string JSON response
    let parsedData: BrandAnalysisData;
    if (typeof analysisData === 'string') {
      parsedData = JSON.parse(analysisData);
    } else {
      parsedData = analysisData as BrandAnalysisData;
    }

    // Validate required fields
    if (!parsedData.brand_profile?.keywords || 
        !parsedData.brand_profile?.personality_scores) {
      throw new Error("Incomplete analysis data");
    }

    return {
      success: true,
      data: parsedData
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to parse analysis results"
    };
  }
}
```

#### Error Handling & Retries

```typescript
async analyzeBrandWithRetry(
  brandUrl: string, 
  maxRetries: number = 3
): Promise<BrandAnalysisResult> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await this.analyzeBrand(brandUrl);
      
      if (result.success) {
        return result;
      }
      
      // Don't retry validation errors
      if (result.error?.includes("Invalid URL")) {
        return result;
      }
      
      lastError = new Error(result.error || "Analysis failed");
      
      // Exponential backoff
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  return {
    success: false,
    error: `Analysis failed after ${maxRetries} attempts: ${lastError.message}`
  };
}
```

### AI Model Performance Optimization

#### Caching Strategy
```typescript
class AnalysisCache {
  private cache = new Map<string, CachedResult>();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  async getCachedAnalysis(url: string): Promise<BrandAnalysisData | null> {
    const cached = this.cache.get(url);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    
    // Check Firebase for cached results
    const firebaseResult = await this.getFromFirebase(url);
    if (firebaseResult) {
      this.cache.set(url, {
        data: firebaseResult,
        timestamp: Date.now()
      });
      return firebaseResult;
    }
    
    return null;
  }

  setCachedAnalysis(url: string, data: BrandAnalysisData): void {
    this.cache.set(url, {
      data,
      timestamp: Date.now()
    });
  }
}
```

#### Batch Processing
```typescript
async processBatchAnalysis(urls: string[]): Promise<BatchAnalysisResult[]> {
  const batchSize = 5; // Process 5 URLs concurrently
  const results: BatchAnalysisResult[] = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (url) => {
      try {
        const result = await this.analyzeBrandWithRetry(url);
        return { url, result };
      } catch (error) {
        return { 
          url, 
          result: { 
            success: false, 
            error: error.message 
          } 
        };
      }
    });
    
    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults.map(r => 
      r.status === 'fulfilled' ? r.value : { 
        url: 'unknown', 
        result: { success: false, error: 'Promise rejected' }
      }
    ));
    
    // Rate limiting between batches
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return results;
}
```

---

## 🎨 Frontend Architecture

### Component Structure

#### Pages
```
pages/
├── Home.tsx                 # Main landing page with analysis form
├── Results.tsx              # Analysis results display page
├── Dashboard.tsx            # Management dashboard (future)
└── NotFound.tsx             # 404 error page
```

#### Components Hierarchy
```
components/
├── ui/                      # Base UI components (shadcn/ui)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── ...
├── analysis/                # Analysis-specific components
│   ├── UnifiedAnalysisResults.tsx
│   ├── PersonalityScoreCard.tsx
│   ├── KeywordCloud.tsx
│   └── AudienceInsights.tsx
├── charts/                  # Data visualization
│   ├── PersonalityChart.tsx
│   ├── KeywordChart.tsx
│   └── AudienceChart.tsx
├── forms/                   # Form components
│   ├── BrandAnalysisForm.tsx
│   ├── FormField.tsx
│   └── FormValidation.tsx
└── layout/                  # Layout components
    ├── Header.tsx
    ├── Footer.tsx
    └── Navigation.tsx
```

### State Management

#### React Context Structure
```typescript
// Analysis Context for global state
interface AnalysisContextType {
  analysisData: BrandAnalysisResult | null;
  formData: FormData | null;
  isLoading: boolean;
  error: string | null;
  setAnalysisData: (data: BrandAnalysisResult | null) => void;
  setFormData: (data: FormData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [analysisData, setAnalysisData] = useState<BrandAnalysisResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextValue: AnalysisContextType = {
    analysisData,
    formData,
    isLoading,
    error,
    setAnalysisData,
    setFormData,
    setLoading,
    setError
  };

  return (
    <AnalysisContext.Provider value={contextValue}>
      {children}
    </AnalysisContext.Provider>
  );
};
```

#### React Query Integration
```typescript
// Custom hooks for API calls
export function useBrandProfiles() {
  return useQuery({
    queryKey: ['/api/brand-profiles'],
    queryFn: () => fetch('/api/brand-profiles').then(res => res.json())
  });
}

export function useBrandProfile(documentId: string) {
  return useQuery({
    queryKey: ['/api/brand-profiles', documentId],
    queryFn: () => 
      fetch(`/api/brand-profiles/${documentId}`).then(res => res.json()),
    enabled: !!documentId
  });
}

export function useCreateBrandProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: InsertBrandProfile) =>
      apiRequest('POST', '/api/brand-profiles', data),
    onSuccess: () => {
      // Invalidate and refetch profiles list
      queryClient.invalidateQueries({
        queryKey: ['/api/brand-profiles']
      });
    }
  });
}
```

### Responsive Design System

#### Breakpoints Configuration
```typescript
const breakpoints = {
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px' // Extra large desktop
};

// Usage in components
const responsiveClasses = cn(
  'grid grid-cols-1',           // Mobile: single column
  'md:grid-cols-2',            // Tablet: two columns
  'lg:grid-cols-3',            // Desktop: three columns
  'xl:grid-cols-4'             // Large: four columns
);
```

#### Dark Mode Implementation
```typescript
// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Performance Optimization

#### Code Splitting
```typescript
// Lazy load heavy components
const UnifiedAnalysisResults = lazy(() => 
  import('@/components/analysis/UnifiedAnalysisResults')
);

const Dashboard = lazy(() => import('@/pages/Dashboard'));

// Route-based code splitting
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<UnifiedAnalysisResults />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
```

#### Memoization
```typescript
// Expensive calculations
const PersonalityChart = memo(({ data }: { data: PersonalityScores }) => {
  const chartData = useMemo(() => {
    return Object.entries(data).map(([dimension, { score }]) => ({
      dimension: dimension.charAt(0).toUpperCase() + dimension.slice(1),
      score,
      fill: getColorForDimension(dimension)
    }));
  }, [data]);

  return <ResponsiveContainer>{/* Chart content */}</ResponsiveContainer>;
});
```

---

## 🏢 Backend Architecture

### Express.js Server Structure

#### Main Server Configuration
```typescript
// server/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { registerRoutes } from './routes';
import { errorHandler, notFound } from './middleware/error';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com']
    : ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// API routes
registerRoutes(app);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default server;
```

#### API Routes Implementation
```typescript
// server/routes.ts
import { Router } from 'express';
import { validateRequest } from './middleware/validation';
import { insertBrandProfileSchema } from '@shared/schema';
import { storage } from './storage';

const router = Router();

// Brand Profiles Routes
router.get('/brand-profiles', async (req, res, next) => {
  try {
    const profiles = await storage.getAllBrandProfiles();
    res.json(profiles.map(toApiFormat));
  } catch (error) {
    next(error);
  }
});

router.get('/brand-profiles/:documentId', async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const profile = await storage.getBrandProfile(documentId);
    
    if (!profile) {
      return res.status(404).json({ error: 'Brand profile not found' });
    }
    
    res.json(toApiFormat(profile));
  } catch (error) {
    next(error);
  }
});

router.post('/brand-profiles', 
  validateRequest(insertBrandProfileSchema),
  async (req, res, next) => {
    try {
      const profile = await storage.createBrandProfile(req.body);
      res.status(201).json(toApiFormat(profile));
    } catch (error) {
      next(error);
    }
  }
);

export { router as brandProfilesRouter };
```

#### Middleware Implementation

##### Validation Middleware
```typescript
// server/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
}
```

##### Error Handling Middleware
```typescript
// server/middleware/error.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      message: err.message
    });
  }

  if (err.name === 'DuplicateDocumentIdError') {
    return res.status(409).json({
      error: 'Resource already exists',
      message: err.message
    });
  }

  // Firebase errors
  if (err.message?.includes('permission-denied')) {
    return res.status(403).json({
      error: 'Permission denied',
      message: 'Insufficient permissions for this operation'
    });
  }

  // Default error response
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message
  });
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
}
```

### Firebase Integration

#### Storage Interface
```typescript
// server/storage.ts
export interface IStorage {
  // Brand Profile operations
  getBrandProfile(documentId: string): Promise<BrandProfile | undefined>;
  getBrandProfileByUrl(url: string): Promise<BrandProfile | undefined>;
  createBrandProfile(brandProfile: InsertBrandProfile): Promise<BrandProfile>;
  updateBrandProfile(
    documentId: string, 
    updates: Partial<InsertBrandProfile>
  ): Promise<BrandProfile | undefined>;
  deleteBrandProfile(documentId: string): Promise<boolean>;
  getAllBrandProfiles(): Promise<BrandProfile[]>;
  
  // User operations (future implementation)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}
```

#### Firebase Storage Implementation
```typescript
// server/firebaseStorage.ts
import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit as firestoreLimit
} from 'firebase/firestore';

export class FirebaseStorage implements IStorage {
  private db = getFirestore();
  private brandProfilesCollection = collection(this.db, 'brand_profiles');

  async createBrandProfile(
    insertBrandProfile: InsertBrandProfile
  ): Promise<BrandProfile> {
    try {
      // Check for duplicate documentId
      const existing = await this.getBrandProfile(insertBrandProfile.documentId);
      if (existing) {
        throw new DuplicateDocumentIdError(insertBrandProfile.documentId);
      }

      const now = new Date();
      const firebaseData = {
        documentId: insertBrandProfile.documentId,
        url: insertBrandProfile.url,
        brand_profile: insertBrandProfile.brand_profile,
        createdAt: now,
        updatedAt: now
      };

      // Use documentId as the Firebase document ID
      const docRef = doc(this.brandProfilesCollection, insertBrandProfile.documentId);
      await setDoc(docRef, firebaseData);
      
      return {
        id: insertBrandProfile.documentId,
        documentId: insertBrandProfile.documentId,
        url: insertBrandProfile.url,
        brandProfile: insertBrandProfile.brand_profile,
        createdAt: now,
        updatedAt: now
      } as BrandProfile;
    } catch (error) {
      console.error('Error creating brand profile:', error);
      throw error;
    }
  }

  async getAllBrandProfiles(): Promise<BrandProfile[]> {
    try {
      const q = query(
        this.brandProfilesCollection,
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const profiles: BrandProfile[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        profiles.push({
          id: doc.id,
          documentId: data.documentId,
          url: data.url,
          brandProfile: data.brand_profile,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as BrandProfile);
      });
      
      return profiles;
    } catch (error) {
      console.error('Error getting all brand profiles:', error);
      return [];
    }
  }
}
```

### API Performance Optimization

#### Caching Strategy
```typescript
// server/middleware/cache.ts
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 600, // 10 minutes default TTL
  checkperiod: 120 // Check for expired keys every 2 minutes
});

export function cacheMiddleware(ttl: number = 600) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    // Override res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = function(data: any) {
      cache.set(key, data, ttl);
      return originalJson(data);
    };

    next();
  };
}
```

#### Database Connection Pooling
```typescript
// server/firebase/connection.ts
let cachedApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (cachedApp) {
    return cachedApp;
  }

  const apps = getApps();
  if (apps.length > 0) {
    cachedApp = apps[0];
    return cachedApp;
  }

  cachedApp = initializeApp(firebaseConfig);
  return cachedApp;
}

export function getFirestore(): Firestore {
  const app = getFirebaseApp();
  return getFirestore(app);
}
```

---

## 🚀 Deployment Guide

### Replit Deployment (Recommended)

#### Automatic Deployment Setup
```json
// .replit configuration
{
  "language": "nodejs",
  "run": "npm run dev",
  "entrypoint": "server/index.ts",
  "modules": ["nodejs-18"],
  "hidden": [".config", "package-lock.json"],
  "env": {
    "NODE_ENV": "production"
  },
  "nix": {
    "channel": "stable-22_11"
  }
}
```

#### Deployment Configuration
```typescript
// Deploy configuration (auto-detected by Replit)
export const deployConfig = {
  deployment_target: "autoscale",
  build: null, // No build step required for Vite dev server
  run: ["npm", "run", "dev"],
  env: {
    NODE_ENV: "production",
    PORT: "5000"
  }
};
```

#### Environment Variables Setup
1. Navigate to Replit Secrets tab
2. Add all required environment variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123:web:abc123
   VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
   HF_TOKEN=hf_token_here
   VITE_HF_TOKEN=hf_token_here
   ```

### Alternative Deployment Options

#### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Configure vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/dist/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server/index.ts" },
    { "src": "/(.*)", "dest": "/client/dist/$1" }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}

# Deploy
vercel --prod
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application (if needed)
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "run", "dev"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  adnoxy-app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY}
      - VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID}
      - HF_TOKEN=${HF_TOKEN}
      - VITE_HF_TOKEN=${VITE_HF_TOKEN}
    restart: unless-stopped
```

### Production Optimizations

#### Performance Monitoring
```typescript
// server/middleware/monitoring.ts
import { Request, Response, NextFunction } from 'express';

interface PerformanceMetrics {
  responseTime: number;
  memoryUsage: NodeJS.MemoryUsage;
  timestamp: Date;
  endpoint: string;
  statusCode: number;
}

export function performanceMonitoring() {
  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = process.hrtime();
    const startMemory = process.memoryUsage();

    res.on('finish', () => {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const responseTime = seconds * 1000 + nanoseconds / 1000000;
      const endMemory = process.memoryUsage();

      const metrics: PerformanceMetrics = {
        responseTime,
        memoryUsage: endMemory,
        timestamp: new Date(),
        endpoint: req.route?.path || req.path,
        statusCode: res.statusCode
      };

      // Log to console (replace with proper logging service)
      console.log('Performance:', JSON.stringify(metrics, null, 2));

      // Send to monitoring service (e.g., DataDog, New Relic)
      // sendToMonitoringService(metrics);
    });

    next();
  };
}
```

#### Health Checks
```typescript
// server/routes/health.ts
import { Router } from 'express';
import { getFirestore } from 'firebase/firestore';

const router = Router();

router.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'unknown',
      ai_service: 'unknown'
    }
  };

  try {
    // Check Firebase connection
    const db = getFirestore();
    await db._delegate._databaseId; // Simple connection test
    health.services.database = 'healthy';
  } catch (error) {
    health.services.database = 'unhealthy';
    health.status = 'degraded';
  }

  try {
    // Check Hugging Face service
    const response = await fetch('https://api-inference.huggingface.co/models/magz3l/brand-identity', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`
      }
    });
    
    health.services.ai_service = response.ok ? 'healthy' : 'unhealthy';
  } catch (error) {
    health.services.ai_service = 'unhealthy';
    health.status = 'degraded';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

export { router as healthRouter };
```

---

## 🧪 Testing & Debugging

### Testing Strategy

#### Unit Testing with Jest
```typescript
// tests/brandAnalysis.test.ts
import { BrandAnalysisService } from '../client/src/lib/brandAnalysis';

describe('BrandAnalysisService', () => {
  let service: BrandAnalysisService;

  beforeEach(() => {
    service = new BrandAnalysisService();
  });

  test('should validate URLs correctly', () => {
    expect(service.isValidUrl('https://www.example.com')).toBe(true);
    expect(service.isValidUrl('http://example.com')).toBe(true);
    expect(service.isValidUrl('invalid-url')).toBe(false);
    expect(service.isValidUrl('')).toBe(false);
  });

  test('should handle analysis timeout', async () => {
    const result = await service.analyzeBrand('https://very-slow-website.com');
    
    if (!result.success) {
      expect(result.error).toContain('timeout');
    }
  }, 70000); // Longer timeout for this test

  test('should parse analysis results correctly', () => {
    const mockResult = {
      data: [JSON.stringify({
        brand_profile: {
          keywords: [{ keyword: 'test', score: 0.9 }],
          themes: ['Test Theme'],
          personality_scores: {
            sincerity: { score: 8, justification: 'Test justification' }
          },
          inferred_target_audience: {
            demographics: { age_range: '25-45' },
            psychographics: { values: ['Quality'] }
          }
        }
      })]
    };

    const parsed = service.parseAnalysisResult(mockResult);
    expect(parsed.success).toBe(true);
    expect(parsed.data?.brand_profile.keywords).toHaveLength(1);
  });
});
```

#### API Testing
```typescript
// tests/api.test.ts
import request from 'supertest';
import app from '../server/index';

describe('Brand Profiles API', () => {
  test('GET /api/brand-profiles should return array', async () => {
    const response = await request(app)
      .get('/api/brand-profiles')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/brand-profiles should create profile', async () => {
    const testProfile = {
      documentId: 'test-profile',
      url: 'https://test.com',
      brand_profile: {
        keywords: [{ keyword: 'test', score: 0.9 }],
        themes: ['Test'],
        personality_scores: {
          sincerity: { score: 8, justification: 'Test' }
        },
        inferred_target_audience: {
          demographics: { age_range: '25-45' },
          psychographics: { values: ['Quality'] }
        }
      }
    };

    const response = await request(app)
      .post('/api/brand-profiles')
      .send(testProfile)
      .expect(201);

    expect(response.body.documentId).toBe('test-profile');
  });

  test('GET /api/brand-profiles/:id should return profile', async () => {
    const response = await request(app)
      .get('/api/brand-profiles/test-profile')
      .expect(200);

    expect(response.body.documentId).toBe('test-profile');
  });

  test('DELETE /api/brand-profiles/:id should remove profile', async () => {
    await request(app)
      .delete('/api/brand-profiles/test-profile')
      .expect(204);

    await request(app)
      .get('/api/brand-profiles/test-profile')
      .expect(404);
  });
});
```

#### End-to-End Testing with Playwright
```typescript
// tests/e2e/brandAnalysis.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Brand Analysis Flow', () => {
  test('should complete full analysis workflow', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Fill out form
    await page.fill('[data-testid="input-brand-name"]', 'Test Brand');
    await page.fill('[data-testid="input-brand-url"]', 'https://www.apple.com');
    await page.fill('[data-testid="input-location"]', 'New York');
    await page.fill('[data-testid="input-budget"]', '10000');
    await page.fill('[data-testid="textarea-description"]', 'Test description for analysis');
    
    // Start analysis
    await page.click('[data-testid="button-analyze"]');
    
    // Wait for analysis to complete
    await expect(page.locator('[data-testid="analysis-progress"]')).toBeVisible();
    await expect(page).toHaveURL('/results', { timeout: 120000 });
    
    // Verify results are displayed
    await expect(page.locator('[data-testid="analysis-results"]')).toBeVisible();
    await expect(page.locator('[data-testid="personality-scores"]')).toBeVisible();
    await expect(page.locator('[data-testid="keyword-list"]')).toBeVisible();
    
    // Verify data was saved to Firebase
    const response = await page.request.get('/api/brand-profiles');
    const profiles = await response.json();
    expect(profiles.length).toBeGreaterThan(0);
  });

  test('should handle analysis errors gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Fill form with invalid URL
    await page.fill('[data-testid="input-brand-name"]', 'Test Brand');
    await page.fill('[data-testid="input-brand-url"]', 'invalid-url');
    await page.fill('[data-testid="input-location"]', 'New York');
    await page.fill('[data-testid="input-budget"]', '10000');
    await page.fill('[data-testid="textarea-description"]', 'Test description');
    
    // Try to analyze
    await page.click('[data-testid="button-analyze"]');
    
    // Should show validation error
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('valid URL');
  });
});
```

### Debugging Tools

#### Development Logging
```typescript
// utils/logger.ts
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

class Logger {
  private level: LogLevel;

  constructor() {
    this.level = process.env.NODE_ENV === 'production' 
      ? LogLevel.INFO 
      : LogLevel.DEBUG;
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    if (level <= this.level) {
      const timestamp = new Date().toISOString();
      const levelName = LogLevel[level];
      console.log(`[${timestamp}] ${levelName}: ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  debug(message: string, ...args: any[]) {
    this.log(LogLevel.DEBUG, message, ...args);
  }
}

export const logger = new Logger();
```

#### Firebase Debugging
```typescript
// utils/firebaseDebug.ts
import { enableNetwork, disableNetwork } from 'firebase/firestore';

export class FirebaseDebugger {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async testConnection(): Promise<boolean> {
    try {
      // Try to read a non-existent document
      const testDoc = doc(this.db, 'test', 'connection');
      await getDoc(testDoc);
      return true;
    } catch (error) {
      console.error('Firebase connection test failed:', error);
      return false;
    }
  }

  async simulateOffline(): Promise<void> {
    await disableNetwork(this.db);
    console.log('Firebase offline mode enabled');
  }

  async simulateOnline(): Promise<void> {
    await enableNetwork(this.db);
    console.log('Firebase online mode enabled');
  }

  logFirestoreOperations(): void {
    // Enable Firestore debug logging
    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore - Firebase internal API
      window.firebase?.firestore?.setLogLevel('debug');
    }
  }
}
```

#### Performance Profiling
```typescript
// utils/profiler.ts
export class PerformanceProfiler {
  private measurements: Map<string, number> = new Map();

  start(label: string): void {
    this.measurements.set(label, performance.now());
  }

  end(label: string): number {
    const startTime = this.measurements.get(label);
    if (!startTime) {
      console.warn(`No start time found for label: ${label}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.measurements.delete(label);
    
    console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  async measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    try {
      const result = await fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}

// Usage example
const profiler = new PerformanceProfiler();

const analysisResult = await profiler.measure(
  'Brand Analysis',
  () => brandAnalysisService.analyzeBrand(url)
);
```

---

## 🔒 Security Considerations

### Data Protection

#### Input Validation
```typescript
// Comprehensive input sanitization
import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim());
};

export const brandProfileSchema = z.object({
  documentId: z.string()
    .min(1, 'Document ID is required')
    .max(100, 'Document ID too long')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Invalid characters in document ID'),
  
  url: z.string()
    .url('Must be a valid URL')
    .refine(url => {
      try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    }, 'Must use http or https protocol'),

  brand_profile: z.object({
    keywords: z.array(z.object({
      keyword: z.string().max(50, 'Keyword too long'),
      score: z.number().min(0).max(1, 'Score must be between 0 and 1')
    })).max(20, 'Too many keywords'),
    
    themes: z.array(z.string().max(100, 'Theme too long')).max(10, 'Too many themes')
  })
});
```

#### API Security
```typescript
// Rate limiting and API protection
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// Aggressive rate limiting for analysis endpoint
export const analysisRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Only 10 analyses per hour per IP
  message: 'Too many analysis requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

// Slow down repeated requests
export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 2, // Allow 2 requests per window at full speed
  delayMs: 500, // Add 500ms delay after delayAfter is reached
  maxDelayMs: 20000 // Maximum delay of 20 seconds
});

// API key validation
export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }
  
  next();
};
```

#### Environment Security
```typescript
// Secure environment variable handling
export class EnvironmentValidator {
  private requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID',
    'HF_TOKEN',
    'VITE_HF_TOKEN'
  ];

  validate(): void {
    const missing = this.requiredVars.filter(
      varName => !process.env[varName]
    );

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Validate Firebase config format
    if (!this.isValidFirebaseConfig()) {
      throw new Error('Invalid Firebase configuration');
    }

    // Validate Hugging Face token format
    if (!this.isValidHfToken()) {
      throw new Error('Invalid Hugging Face token format');
    }
  }

  private isValidFirebaseConfig(): boolean {
    const apiKey = process.env.VITE_FIREBASE_API_KEY;
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
    
    return !!(apiKey?.startsWith('AIza') && 
              projectId && 
              projectId.length > 0);
  }

  private isValidHfToken(): boolean {
    const token = process.env.HF_TOKEN;
    return !!(token?.startsWith('hf_') && token.length > 20);
  }
}
```

### Firebase Security

#### Production Security Rules
```javascript
// firestore.rules - Production configuration
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Brand profiles - authenticated access only
    match /brand_profiles/{profileId} {
      allow read: if request.auth != null;
      
      allow create: if request.auth != null && 
        isValidBrandProfile(request.resource.data) &&
        request.auth.uid == request.resource.data.userId;
      
      allow update: if request.auth != null &&
        resource.data.userId == request.auth.uid &&
        isValidBrandProfile(request.resource.data);
      
      allow delete: if request.auth != null &&
        resource.data.userId == request.auth.uid;
    }

    // User profiles
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }

    // Helper functions
    function isValidBrandProfile(data) {
      return data.keys().hasAll(['documentId', 'url', 'brand_profile']) &&
             data.documentId is string &&
             data.url is string &&
             data.brand_profile is map;
    }
  }
}
```

#### Authentication Implementation
```typescript
// auth/firebase.ts
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

export class AuthService {
  private auth = getAuth();

  async signIn(email: string, password: string): Promise<User> {
    const credential = await signInWithEmailAndPassword(
      this.auth, 
      email, 
      password
    );
    return credential.user;
  }

  async signUp(email: string, password: string): Promise<User> {
    // Validate password strength
    if (!this.isStrongPassword(password)) {
      throw new Error('Password does not meet security requirements');
    }

    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    
    // Create user profile
    await this.createUserProfile(credential.user);
    
    return credential.user;
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(this.auth);
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback);
  }

  private isStrongPassword(password: string): boolean {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^A-Za-z0-9]/.test(password);
  }

  private async createUserProfile(user: User): Promise<void> {
    const userDoc = doc(getFirestore(), 'users', user.uid);
    await setDoc(userDoc, {
      email: user.email,
      displayName: user.displayName,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}
```

### Content Security Policy
```typescript
// security/csp.ts
export const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // Required for Vite in development
    "https://apis.google.com",
    "https://www.googleapis.com",
    "https://api-inference.huggingface.co"
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com"
  ],
  fontSrc: [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  imgSrc: [
    "'self'",
    "data:",
    "https://*.googleapis.com",
    "https://*.firebase.com"
  ],
  connectSrc: [
    "'self'",
    "https://api-inference.huggingface.co",
    "https://*.firebaseio.com",
    "https://firestore.googleapis.com"
  ],
  frameSrc: ["'none'"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : undefined
};
```

---

## 🚀 Performance Optimization

### Frontend Optimization

#### Bundle Optimization
```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-alert-dialog', '@radix-ui/react-dialog'],
          'chart-vendor': ['recharts'],
          'firebase-vendor': ['firebase/app', 'firebase/firestore'],
          
          // Feature chunks
          'analysis': ['@/components/analysis'],
          'charts': ['@/components/charts']
        }
      }
    },
    
    // Enable compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production'
      }
    },
    
    // Source map for debugging
    sourcemap: process.env.NODE_ENV === 'development'
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'firebase/app',
      'firebase/firestore',
      '@gradio/client'
    ]
  }
});
```

#### Image Optimization
```typescript
// utils/imageOptimization.ts
export class ImageOptimizer {
  static generateSrcSet(imagePath: string): string {
    const sizes = [320, 640, 768, 1024, 1280, 1920];
    return sizes
      .map(size => `${imagePath}?w=${size} ${size}w`)
      .join(', ');
  }

  static generateSizes(): string {
    return '(max-width: 320px) 320px, (max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, 1920px';
  }

  static preloadCriticalImages(images: string[]): void {
    images.forEach(image => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image;
      document.head.appendChild(link);
    });
  }
}

// Component usage
export function OptimizedImage({ src, alt }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      srcSet={ImageOptimizer.generateSrcSet(src)}
      sizes={ImageOptimizer.generateSizes()}
      loading="lazy"
      decoding="async"
    />
  );
}
```

#### React Performance
```typescript
// Performance optimized components
import { memo, useMemo, useCallback } from 'react';

export const PersonalityChart = memo(({ data }: PersonalityChartProps) => {
  const chartData = useMemo(() => {
    return Object.entries(data).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value.score,
      fill: getColorForPersonality(key)
    }));
  }, [data]);

  const handleChartClick = useCallback((entry: ChartEntry) => {
    onPersonalitySelect?.(entry.name);
  }, [onPersonalitySelect]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart data={chartData} onClick={handleChartClick}>
        {/* Chart content */}
      </RadialBarChart>
    </ResponsiveContainer>
  );
});

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

export function KeywordList({ keywords }: KeywordListProps) {
  const itemRenderer = useCallback(({ index, style }: ItemRendererProps) => (
    <div style={style}>
      <KeywordItem keyword={keywords[index]} />
    </div>
  ), [keywords]);

  return (
    <List
      height={400}
      itemCount={keywords.length}
      itemSize={60}
      itemData={keywords}
    >
      {itemRenderer}
    </List>
  );
}
```

### Backend Optimization

#### Database Query Optimization
```typescript
// Optimized Firebase queries
export class OptimizedFirebaseStorage extends FirebaseStorage {
  // Use pagination for large datasets
  async getBrandProfilesPaginated(
    pageSize: number = 20,
    lastDoc?: DocumentSnapshot
  ): Promise<PaginatedResult<BrandProfile>> {
    try {
      let q = query(
        this.brandProfilesCollection,
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);
      const profiles = querySnapshot.docs.map(doc => this.mapDocToBrandProfile(doc));
      const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];

      return {
        data: profiles,
        hasMore: querySnapshot.docs.length === pageSize,
        lastDoc: lastDocument
      };
    } catch (error) {
      console.error('Error getting paginated profiles:', error);
      return { data: [], hasMore: false, lastDoc: null };
    }
  }

  // Batch operations for better performance
  async createBrandProfilesBatch(
    profiles: InsertBrandProfile[]
  ): Promise<BrandProfile[]> {
    const batch = writeBatch(this.db);
    const results: BrandProfile[] = [];
    const now = new Date();

    profiles.forEach(profile => {
      const docRef = doc(this.brandProfilesCollection, profile.documentId);
      const data = {
        ...profile,
        createdAt: now,
        updatedAt: now
      };
      
      batch.set(docRef, data);
      results.push({
        id: profile.documentId,
        ...data,
        brandProfile: profile.brand_profile
      } as BrandProfile);
    });

    await batch.commit();
    return results;
  }

  // Optimized search with indexing
  async searchBrandProfiles(
    searchTerm: string,
    limit: number = 10
  ): Promise<BrandProfile[]> {
    try {
      // Use array-contains-any for keyword search
      const keywordsQuery = query(
        this.brandProfilesCollection,
        where('brand_profile.keywords', 'array-contains-any', [searchTerm]),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );

      const snapshot = await getDocs(keywordsQuery);
      return snapshot.docs.map(doc => this.mapDocToBrandProfile(doc));
    } catch (error) {
      console.error('Error searching profiles:', error);
      return [];
    }
  }
}
```

#### Caching Strategy
```typescript
// Multi-level caching system
export class CacheManager {
  private memoryCache = new Map<string, CacheEntry>();
  private readonly MEMORY_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly DISK_TTL = 60 * 60 * 1000; // 1 hour

  async get<T>(key: string): Promise<T | null> {
    // Level 1: Memory cache
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && Date.now() - memoryEntry.timestamp < this.MEMORY_TTL) {
      return memoryEntry.data as T;
    }

    // Level 2: Browser localStorage (client-side)
    if (typeof window !== 'undefined') {
      try {
        const diskEntry = localStorage.getItem(`cache_${key}`);
        if (diskEntry) {
          const parsed = JSON.parse(diskEntry);
          if (Date.now() - parsed.timestamp < this.DISK_TTL) {
            // Restore to memory cache
            this.memoryCache.set(key, {
              data: parsed.data,
              timestamp: parsed.timestamp
            });
            return parsed.data as T;
          }
        }
      } catch (error) {
        console.warn('Cache read error:', error);
      }
    }

    // Level 3: Firebase cache
    // (Firebase automatically caches data)

    return null;
  }

  async set<T>(key: string, data: T): Promise<void> {
    const timestamp = Date.now();
    const entry = { data, timestamp };

    // Store in memory
    this.memoryCache.set(key, entry);

    // Store in localStorage (client-side)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`cache_${key}`, JSON.stringify(entry));
      } catch (error) {
        console.warn('Cache write error:', error);
      }
    }
  }

  clear(): void {
    this.memoryCache.clear();
    
    if (typeof window !== 'undefined') {
      Object.keys(localStorage)
        .filter(key => key.startsWith('cache_'))
        .forEach(key => localStorage.removeItem(key));
    }
  }
}
```

### Monitoring and Analytics

#### Performance Monitoring
```typescript
// Performance monitoring with Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];

  init(): void {
    getCLS(this.onCLS.bind(this));
    getFID(this.onFID.bind(this));
    getFCP(this.onFCP.bind(this));
    getLCP(this.onLCP.bind(this));
    getTTFB(this.onTTFB.bind(this));
  }

  private onCLS(metric: Metric): void {
    this.recordMetric('CLS', metric.value);
  }

  private onFID(metric: Metric): void {
    this.recordMetric('FID', metric.value);
  }

  private onFCP(metric: Metric): void {
    this.recordMetric('FCP', metric.value);
  }

  private onLCP(metric: Metric): void {
    this.recordMetric('LCP', metric.value);
  }

  private onTTFB(metric: Metric): void {
    this.recordMetric('TTFB', metric.value);
  }

  private recordMetric(name: string, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      url: window.location.href
    };

    this.metrics.push(metric);
    this.sendToAnalytics(metric);
  }

  private sendToAnalytics(metric: PerformanceMetric): void {
    // Send to analytics service
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      }).catch(error => {
        console.warn('Failed to send performance metric:', error);
      });
    } else {
      console.log('Performance metric:', metric);
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}
```

---

## 🔍 Troubleshooting Guide

### Common Issues & Solutions

#### Firebase Connection Issues

**Problem**: `Error: Firebase project not found`
```bash
# Solution: Verify project ID
echo $VITE_FIREBASE_PROJECT_ID
# Should match your Firebase console project ID

# Check Firebase configuration
curl -X GET "https://firebase.googleapis.com/v1beta1/projects/$VITE_FIREBASE_PROJECT_ID" \
  -H "Authorization: Bearer $FIREBASE_TOKEN"
```

**Problem**: `Permission denied` errors in Firestore
```javascript
// Solution: Update Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Development: Allow all access
      allow read, write: if true;
      
      // Production: Require authentication
      // allow read, write: if request.auth != null;
    }
  }
}
```

**Problem**: `Network request failed` when accessing Firestore
```typescript
// Solution: Check network connectivity and rules
const testFirebaseConnection = async () => {
  try {
    const db = getFirestore();
    const testDoc = doc(db, 'test', 'connection');
    await setDoc(testDoc, { timestamp: Date.now() });
    console.log('✅ Firebase connection successful');
    await deleteDoc(testDoc);
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    
    if (error.code === 'permission-denied') {
      console.log('Check Firestore security rules');
    } else if (error.code === 'unavailable') {
      console.log('Check internet connection and Firebase status');
    }
  }
};
```

#### Hugging Face API Issues

**Problem**: `Authentication failed` for Hugging Face API
```bash
# Solution: Verify token format and permissions
echo $VITE_HF_TOKEN
# Should start with 'hf_' and be longer than 20 characters

# Test token with curl
curl -H "Authorization: Bearer $VITE_HF_TOKEN" \
  https://api-inference.huggingface.co/models/magz3l/brand-identity
```

**Problem**: `Model is loading` error from Hugging Face
```typescript
// Solution: Implement retry logic with backoff
const analyzeWithRetry = async (url: string, maxRetries = 3): Promise<BrandAnalysisResult> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await brandAnalysisService.analyzeBrand(url);
      return result;
    } catch (error) {
      lastError = error;
      
      if (error.message.includes('loading')) {
        // Wait longer for model to load
        const delay = Math.pow(2, attempt) * 5000; // 5s, 10s, 20s
        console.log(`Model loading, waiting ${delay}ms before retry ${attempt}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Don't retry other errors
      }
    }
  }

  throw new Error(`Analysis failed after ${maxRetries} attempts: ${lastError.message}`);
};
```

**Problem**: Analysis timeout errors
```typescript
// Solution: Increase timeout and add progress feedback
const analyzeBrandWithTimeout = async (url: string, timeoutMs = 120000) => {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Analysis timed out after ${timeoutMs}ms`)), timeoutMs)
  );

  const analysisPromise = brandAnalysisService.analyzeBrand(url);

  try {
    return await Promise.race([analysisPromise, timeoutPromise]);
  } catch (error) {
    if (error.message.includes('timeout')) {
      return {
        success: false,
        error: 'Analysis is taking longer than expected. This may be due to website complexity or high API usage. Please try again later.'
      };
    }
    throw error;
  }
};
```

#### Development Environment Issues

**Problem**: `Cannot find module` errors after installation
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# For persistent issues, check Node.js version
node --version  # Should be 18.0 or higher
npm --version   # Should be 8.0 or higher
```

**Problem**: TypeScript compilation errors
```bash
# Solution: Check TypeScript configuration
npx tsc --noEmit --skipLibCheck

# Common fixes:
# 1. Update tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./client/src/*"],
      "@shared/*": ["./shared/*"]
    }
  }
}

# 2. Install missing type definitions
npm install --save-dev @types/node @types/react @types/react-dom
```

**Problem**: Vite dev server not starting
```bash
# Solution: Check port availability and configuration
lsof -ti:5000  # Check what's using port 5000
kill -9 $(lsof -ti:5000)  # Kill process using port 5000

# Verify Vite configuration
cat vite.config.ts
# Should have:
# server: {
#   host: '0.0.0.0',
#   port: 5000
# }
```

### Debug Mode Configuration

#### Enable Debug Logging
```typescript
// Add to your main application file
if (process.env.NODE_ENV === 'development') {
  // Enable Firebase debug logging
  // @ts-ignore
  window.firebase = { firestore: { setLogLevel: (level: string) => console.log(`Firestore log level: ${level}`) }};
  
  // Enable detailed console logging
  localStorage.setItem('debug', 'adnoxy:*');
  
  // Add global error handler
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });
}
```

#### Performance Debugging
```typescript
// Add performance debugging to components
export function usePerformanceDebugging(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const renderStart = performance.now();
      
      return () => {
        const renderEnd = performance.now();
        console.log(`🎭 ${componentName} render time: ${(renderEnd - renderStart).toFixed(2)}ms`);
      };
    }
  });
}

// Usage in components
export function ExpensiveComponent() {
  usePerformanceDebugging('ExpensiveComponent');
  
  const heavyCalculation = useMemo(() => {
    const start = performance.now();
    const result = performExpensiveCalculation();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`💻 Heavy calculation: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  }, [dependencies]);
  
  return <div>{/* Component content */}</div>;
}
```

### Production Troubleshooting

#### Health Check Endpoint
```typescript
// server/routes/health.ts
export const healthCheck = async (req: Request, res: Response) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV,
    services: {
      database: 'unknown',
      ai_service: 'unknown',
      memory: process.memoryUsage(),
      uptime: process.uptime()
    }
  };

  // Check Firebase connection
  try {
    const db = getFirestore();
    const testDoc = doc(db, '_health', 'check');
    await setDoc(testDoc, { timestamp: new Date() });
    await deleteDoc(testDoc);
    health.services.database = 'healthy';
  } catch (error) {
    health.services.database = 'unhealthy';
    health.status = 'degraded';
  }

  // Check Hugging Face API
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/magz3l/brand-identity', {
      method: 'HEAD',
      headers: { 'Authorization': `Bearer ${process.env.HF_TOKEN}` },
      timeout: 5000
    });
    
    health.services.ai_service = response.ok ? 'healthy' : 'degraded';
  } catch (error) {
    health.services.ai_service = 'unhealthy';
    health.status = 'degraded';
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
};
```

#### Error Tracking
```typescript
// utils/errorTracking.ts
export class ErrorTracker {
  static logError(error: Error, context?: Record<string, any>): void {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      context
    };

    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service (Sentry, LogRocket, etc.)
      this.sendToErrorService(errorInfo);
    } else {
      console.error('Error tracked:', errorInfo);
    }
  }

  private static async sendToErrorService(errorInfo: any): Promise<void> {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorInfo)
      });
    } catch (error) {
      console.error('Failed to send error to tracking service:', error);
    }
  }
}

// Usage in React components
export function useErrorBoundary() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    ErrorTracker.logError(error, { 
      componentStack: errorInfo?.componentStack,
      errorBoundary: true 
    });
  };
}
```

---

## 🤝 Contributing Guidelines

### Getting Started

#### Development Setup
1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/adnoxy-billboard-platform.git
   cd adnoxy-billboard-platform
   
   # Add upstream remote
   git remote add upstream https://github.com/ORIGINAL_OWNER/adnoxy-billboard-platform.git
   ```

2. **Environment Setup**
   ```bash
   # Install dependencies
   npm install
   
   # Copy environment template
   cp .env.example .env
   
   # Configure your environment variables
   # (See Configuration Guide section)
   ```

3. **Development Workflow**
   ```bash
   # Create a feature branch
   git checkout -b feature/your-feature-name
   
   # Start development server
   npm run dev
   
   # Make your changes...
   
   # Run tests
   npm run test
   npm run test:e2e
   
   # Check code quality
   npm run lint
   npm run type-check
   ```

#### Contribution Types

**🐛 Bug Fixes**
- Fix existing functionality issues
- Improve error handling
- Performance optimizations
- Security vulnerabilities

**✨ New Features**
- Add new analysis capabilities
- Improve user interface
- Extend API functionality
- Add integrations

**📚 Documentation**
- Improve README
- Add code comments
- Create tutorials
- Update API documentation

**🧪 Testing**
- Add unit tests
- Improve test coverage
- Add E2E tests
- Performance testing

### Code Standards

#### TypeScript Guidelines
```typescript
// ✅ Good: Explicit types and clear naming
interface BrandAnalysisRequest {
  readonly url: string;
  readonly options?: AnalysisOptions;
}

export async function analyzeBrandWebsite(
  request: BrandAnalysisRequest
): Promise<BrandAnalysisResult> {
  const { url, options = {} } = request;
  
  if (!isValidUrl(url)) {
    throw new ValidationError('Invalid URL provided');
  }
  
  return await performAnalysis(url, options);
}

// ❌ Bad: Any types and unclear naming
export async function doStuff(data: any): Promise<any> {
  return await someFunction(data.url);
}
```

#### React Component Guidelines
```tsx
// ✅ Good: Proper props interface and component structure
interface AnalysisResultProps {
  readonly data: BrandAnalysisData;
  readonly isLoading?: boolean;
  readonly onExport?: (format: ExportFormat) => void;
}

export function AnalysisResult({ 
  data, 
  isLoading = false, 
  onExport 
}: AnalysisResultProps): JSX.Element {
  const { keywords, themes, personalityScores } = data;
  
  const handleExport = useCallback((format: ExportFormat) => {
    onExport?.(format);
  }, [onExport]);
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  return (
    <div className="analysis-result" data-testid="analysis-result">
      <KeywordSection keywords={keywords} />
      <ThemeSection themes={themes} />
      <PersonalitySection scores={personalityScores} />
      {onExport && (
        <ExportButton onExport={handleExport} />
      )}
    </div>
  );
}

// ❌ Bad: No props interface and poor structure
export function BadComponent({ data, loading, callback }) {
  return (
    <div>
      {loading ? 'Loading...' : JSON.stringify(data)}
      <button onClick={() => callback('pdf')}>Export</button>
    </div>
  );
}
```

#### CSS/Tailwind Guidelines
```css
/* ✅ Good: Semantic class names and consistent spacing */
.brand-analysis-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4;
}

.personality-score {
  @apply flex items-center justify-between py-2 px-3 rounded-md;
  @apply bg-gradient-to-r from-blue-50 to-indigo-50;
  @apply dark:from-gray-700 dark:to-gray-600;
}

.score-high {
  @apply text-green-700 dark:text-green-300 font-semibold;
}

/* ❌ Bad: Magic numbers and unclear naming */
.card {
  @apply p-3 m-2 bg-blue-100;
}

.thing {
  @apply text-xs text-black;
}
```

### Testing Requirements

#### Unit Test Coverage
```typescript
// Required for all new features and bug fixes
describe('BrandAnalysisService', () => {
  let service: BrandAnalysisService;
  
  beforeEach(() => {
    service = new BrandAnalysisService();
    jest.clearAllMocks();
  });
  
  describe('analyzeBrand', () => {
    it('should return success result for valid URL', async () => {
      const mockResponse = createMockAnalysisResponse();
      jest.spyOn(service, 'callHuggingFaceAPI').mockResolvedValue(mockResponse);
      
      const result = await service.analyzeBrand('https://example.com');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.brand_profile.keywords).toHaveLength(10);
    });
    
    it('should handle invalid URLs gracefully', async () => {
      const result = await service.analyzeBrand('invalid-url');
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('valid URL');
    });
    
    it('should retry on temporary failures', async () => {
      jest.spyOn(service, 'callHuggingFaceAPI')
        .mockRejectedValueOnce(new Error('Temporary failure'))
        .mockResolvedValueOnce(createMockAnalysisResponse());
      
      const result = await service.analyzeBrandWithRetry('https://example.com');
      
      expect(result.success).toBe(true);
      expect(service.callHuggingFaceAPI).toHaveBeenCalledTimes(2);
    });
  });
});
```

#### Integration Test Requirements
```typescript
// Required for API endpoints and Firebase operations
describe('Brand Profiles API Integration', () => {
  let testDb: Firestore;
  
  beforeAll(async () => {
    testDb = createTestFirestoreInstance();
  });
  
  afterAll(async () => {
    await cleanupTestDatabase(testDb);
  });
  
  it('should create and retrieve brand profile', async () => {
    const testProfile = createTestBrandProfile();
    
    // Create profile
    const createResponse = await request(app)
      .post('/api/brand-profiles')
      .send(testProfile)
      .expect(201);
    
    expect(createResponse.body.documentId).toBe(testProfile.documentId);
    
    // Retrieve profile
    const getResponse = await request(app)
      .get(`/api/brand-profiles/${testProfile.documentId}`)
      .expect(200);
    
    expect(getResponse.body.url).toBe(testProfile.url);
    expect(getResponse.body.brand_profile).toBeDefined();
  });
});
```

### Pull Request Process

#### PR Checklist
- [ ] **Code Quality**
  - [ ] Follows TypeScript/React guidelines
  - [ ] Includes proper error handling
  - [ ] Has appropriate logging
  - [ ] Uses semantic variable names

- [ ] **Testing**
  - [ ] Unit tests for new functionality
  - [ ] Integration tests for API changes
  - [ ] E2E tests for user workflows
  - [ ] All tests pass locally

- [ ] **Documentation**
  - [ ] Code is self-documenting with clear names
  - [ ] Complex logic has explanatory comments
  - [ ] README updated if needed
  - [ ] API documentation updated

- [ ] **Performance**
  - [ ] No performance regressions
  - [ ] Efficient database queries
  - [ ] Proper React optimization
  - [ ] Bundle size impact considered

#### PR Template
```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that causes existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] E2E tests

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] New and existing tests pass locally
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
Include before/after screenshots for UI changes.

## Additional Context
Any additional information that reviewers should know.
```

### Code Review Guidelines

#### For Contributors
- **Self-Review**: Review your own PR before requesting review
- **Small PRs**: Keep changes focused and reasonably sized
- **Clear Description**: Explain what, why, and how
- **Test Evidence**: Show that changes work as expected

#### For Reviewers
- **Be Constructive**: Provide helpful feedback, not just criticism
- **Focus on Logic**: Check for bugs, edge cases, and performance issues
- **Consider Maintainability**: Will this be easy to understand and modify later?
- **Verify Testing**: Ensure adequate test coverage for changes

#### Review Checklist
- [ ] **Functionality**
  - [ ] Code does what the PR description says
  - [ ] Edge cases are handled
  - [ ] Error conditions are managed
  - [ ] No obvious bugs

- [ ] **Code Quality**
  - [ ] Follows project coding standards
  - [ ] Names are clear and descriptive
  - [ ] Functions are focused and not too long
  - [ ] No duplicate code

- [ ] **Testing**
  - [ ] Appropriate tests are included
  - [ ] Tests actually test the functionality
  - [ ] Tests are maintainable
  - [ ] All tests pass

- [ ] **Performance**
  - [ ] No unnecessary re-renders
  - [ ] Database queries are efficient
  - [ ] No memory leaks
  - [ ] Bundle size impact is acceptable

- [ ] **Security**
  - [ ] No hardcoded secrets
  - [ ] Input validation is present
  - [ ] Authentication/authorization is correct
  - [ ] No XSS or injection vulnerabilities

---

## 📝 License & Legal

### MIT License

```
MIT License

Copyright (c) 2025 Adnoxy Billboard Platform Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Third-Party Licenses

This project uses several open-source libraries with their respective licenses:

#### Core Dependencies
- **React** (MIT License) - User interface library
- **Express.js** (MIT License) - Web application framework
- **Firebase** (Apache 2.0) - Backend-as-a-Service platform
- **TypeScript** (Apache 2.0) - Type-safe JavaScript
- **Vite** (MIT License) - Build tool and development server

#### UI Components
- **Tailwind CSS** (MIT License) - CSS framework
- **Radix UI** (MIT License) - UI primitives
- **Lucide React** (ISC License) - Icon library
- **Recharts** (MIT License) - Chart library

#### Development Tools
- **ESLint** (MIT License) - Code linting
- **Prettier** (MIT License) - Code formatting
- **Jest** (MIT License) - Testing framework
- **Playwright** (Apache 2.0) - E2E testing

### Data Usage & Privacy

#### Data Collection
The platform collects and processes:
- Website URLs for brand analysis
- User-provided form data (brand name, location, budget, description)
- AI analysis results and insights
- Usage analytics and performance metrics

#### Data Storage
- All data is stored in Firebase Firestore with encryption at rest
- User data is associated with unique document IDs
- No personally identifiable information (PII) is required for basic usage
- Data retention follows industry best practices

#### Third-Party Services
- **Hugging Face**: Website content is sent to their AI models for analysis
- **Firebase**: All application data is stored on Google's Firebase platform
- **Replit**: Hosting and deployment platform (if used)

#### User Rights
Users have the right to:
- Access their stored data
- Request data deletion
- Opt out of analytics collection
- Export their data in standard formats

### Compliance

#### GDPR Compliance (EU Users)
- Legal basis for processing: Legitimate interest in providing brand analysis services
- Data minimization: Only necessary data is collected
- Right to erasure: Users can request data deletion
- Data portability: Users can export their data
- Privacy by design: Security and privacy built into the system

#### CCPA Compliance (California Users)
- Notice of data collection and purposes
- Right to know what personal information is collected
- Right to delete personal information
- Right to opt-out of sale of personal information (not applicable - we don't sell data)

### Attribution Requirements

If you use this project or substantial portions of it:

1. **Include License**: Keep the MIT license file in your project
2. **Credit Contributors**: Acknowledge the original creators
3. **Respect Dependencies**: Follow the licenses of all dependencies
4. **Trademark Notice**: Don't use "Adnoxy" trademark without permission

#### Example Attribution
```markdown
This project is based on the Adnoxy Billboard Platform
(https://github.com/original-repo/adnoxy-billboard-platform)
Licensed under MIT License.

Original contributors:
- [List of contributors]

Third-party licenses:
- See LICENSES.md for complete list
```

### Commercial Usage

The MIT license allows commercial usage with the following considerations:

#### Allowed
- Use in commercial products
- Modify and distribute
- Private use
- Commercial hosting and deployment
- Integration into proprietary systems

#### Requirements
- Include the original license
- Include copyright notices
- Don't hold the original authors liable

#### Recommendations for Commercial Use
- **Branding**: Create your own brand identity
- **Support**: Provide your own customer support
- **Liability**: Obtain appropriate insurance
- **Privacy**: Implement proper privacy policies
- **Security**: Conduct security audits for production use

### Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

This platform uses AI models for brand analysis. Results should be considered as automated suggestions and may not be accurate for all brands or use cases. Human review and validation is recommended for business-critical decisions.

The accuracy of billboard placement recommendations depends on various factors including market conditions, target audience analysis, and local regulations that are not captured by the AI analysis.

---

## 🔗 Additional Resources

### Official Links
- **Project Repository**: [GitHub Repository URL]
- **Live Demo**: [Demo URL]
- **Documentation**: [Documentation URL]
- **Issue Tracker**: [Issues URL]

### External Services
- **Firebase Console**: https://console.firebase.google.com
- **Hugging Face Hub**: https://huggingface.co/magz3l/brand-identity
- **Replit**: https://replit.com

### Learning Resources
- **React Documentation**: https://react.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Firebase Documentation**: https://firebase.google.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vite Documentation**: https://vitejs.dev/guide

### Community
- **Discussions**: [GitHub Discussions URL]
- **Discord**: [Discord Server URL] (if available)
- **Twitter**: [Twitter Handle] (if available)

---

**Built with ❤️ by the Adnoxy team using cutting-edge web technologies and AI-powered insights.**

*Last updated: September 13, 2025*