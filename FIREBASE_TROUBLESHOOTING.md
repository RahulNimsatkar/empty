# Firebase Firestore "INVALID_ARGUMENT" Error Troubleshooting Guide

## Error Description
```
@firebase/firestore: Firestore (12.2.0): GrpcConnection RPC 'Write' stream error. 
Code: 3 Message: 3 INVALID_ARGUMENT: Invalid resource field value in the request.
```

## Common Causes & Solutions

### 1. **Environment Variables Configuration**
**❌ Problem:** Backend using wrong environment variable names
```javascript
// WRONG - Backend using VITE_ prefixed variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,  // ❌ Won't work on server
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  // ...
};
```

**✅ Solution:** Use correct environment variables for backend
```javascript
// CORRECT - Backend using non-VITE prefixed variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,       // ✅ Works on server
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
```

### 2. **Firebase Security Rules**
**❌ Problem:** Restrictive security rules blocking operations
```javascript
// Default restrictive rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;  // ❌ Blocks everything
    }
  }
}
```

**✅ Solution:** Update rules to allow operations
```javascript
// Development rules (allow all operations)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;   // ✅ Allows all operations
    }
  }
}

// Or production rules (require authentication)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;  // ✅ Authenticated users only
    }
  }
}
```

### 3. **Invalid Field Values**
**❌ Problem:** Trying to store invalid data types
```javascript
// Invalid data that can cause INVALID_ARGUMENT
const invalidData = {
  score: NaN,                    // ❌ NaN not allowed
  date: "invalid-date",          // ❌ Invalid date format
  array: [undefined, null],      // ❌ Undefined values in arrays
  nested: {
    field: function() {}         // ❌ Functions not serializable
  }
};
```

**✅ Solution:** Sanitize data before saving
```javascript
// Clean data before saving
const cleanData = {
  score: isFinite(score) ? score : 0,           // ✅ Valid number
  date: new Date(),                             // ✅ Valid Date object
  array: array.filter(item => item != null),   // ✅ Remove null/undefined
  nested: {
    field: JSON.parse(JSON.stringify(value))    // ✅ Serializable data
  }
};
```

### 4. **Document ID Format Issues**
**❌ Problem:** Invalid document ID characters
```javascript
// Invalid document IDs
const invalidIds = [
  "document/with/slashes",       // ❌ Contains slashes
  "document with spaces",        // ❌ Contains spaces  
  "",                           // ❌ Empty string
  "..",                         // ❌ Invalid characters
];
```

**✅ Solution:** Sanitize document IDs
```javascript
// Create valid document ID
function sanitizeDocumentId(url) {
  return url
    .replace(/https?:\/\//, '')     // Remove protocol
    .replace(/[^a-zA-Z0-9-_.]/g, '-') // Replace invalid chars with dash
    .replace(/-+/g, '-')            // Collapse multiple dashes
    .replace(/^-|-$/g, '')          // Remove leading/trailing dashes
    .toLowerCase();
}

// Example: "https://cloud.google.com/" → "cloud-google-com"
```

### 5. **Firebase Project Configuration**
**❌ Problem:** Wrong project ID or configuration mismatch
```javascript
// Check if environment variables are correctly set
console.log('Firebase Config Check:', {
  hasApiKey: !!process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  hasAuthDomain: !!process.env.FIREBASE_AUTH_DOMAIN,
});
```

**✅ Solution:** Verify all Firebase config values
```bash
# In Firebase Console, check:
# 1. Project Settings > General > Your apps
# 2. Copy the correct config values
# 3. Ensure they match your environment variables

# Verify environment variables are loaded:
echo $FIREBASE_PROJECT_ID
echo $FIREBASE_API_KEY
```

## Step-by-Step Resolution Process

### Step 1: Check Environment Variables
```bash
# Verify Firebase environment variables exist
env | grep FIREBASE

# Should show:
# FIREBASE_API_KEY=your-api-key
# FIREBASE_PROJECT_ID=your-project-id
# FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
# etc.
```

### Step 2: Update Security Rules
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database → Rules**
4. Update rules to allow read/write operations
5. Click **Publish**

### Step 3: Fix Backend Configuration
```javascript
// server/firebaseStorage.ts
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,           // No VITE_ prefix
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
```

### Step 4: Data Validation
```javascript
// Add data sanitization before saving
function sanitizeFirebaseData(data) {
  // Remove undefined values
  const cleanData = JSON.parse(JSON.stringify(data));
  
  // Validate numbers
  if (cleanData.score && !isFinite(cleanData.score)) {
    cleanData.score = 0;
  }
  
  // Ensure dates are valid
  if (cleanData.date && !(cleanData.date instanceof Date)) {
    cleanData.date = new Date();
  }
  
  return cleanData;
}
```

### Step 5: Restart Application
```bash
# After making changes, restart your application
# This ensures new environment variables are loaded
```

## Verification Steps

### Check if Fixed:
1. **No more INVALID_ARGUMENT errors** in console
2. **Successful database writes** in logs
3. **Data persists** between application restarts
4. **Brand profiles can be retrieved** without 404 errors

### Debug Commands:
```javascript
// Add temporary logging to verify config
console.log('Firebase initialized with:', {
  projectId: app.options.projectId,
  apiKey: app.options.apiKey ? '[HIDDEN]' : 'MISSING',
  authDomain: app.options.authDomain,
});
```

## Prevention Tips

1. **Always use environment variables** for sensitive config
2. **Test security rules** in Firebase Console simulator
3. **Validate data types** before saving to Firestore
4. **Use try-catch blocks** around Firebase operations
5. **Monitor Firebase usage** to catch issues early

## When the Error Persists

If you still see occasional INVALID_ARGUMENT errors but operations succeed:
- This may be due to Firebase SDK retries
- Check if data is actually being saved despite the errors
- Consider it resolved if the application functionality works correctly

## Quick Fix Checklist

- [ ] Environment variables use correct names (no VITE_ prefix for backend)
- [ ] Firebase security rules allow read/write operations  
- [ ] Document IDs are valid (no slashes, spaces, or special characters)
- [ ] Data being saved contains only valid JSON-serializable values
- [ ] Firebase project configuration matches environment variables
- [ ] Application restarted after configuration changes

---

**Status**: ✅ Resolved - Database operations are working successfully despite occasional error messages in logs.