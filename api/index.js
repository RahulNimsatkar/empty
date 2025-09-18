const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import storage with TypeScript transpilation handling
let storage;
try {
  // Try to import the compiled version first
  storage = require('../dist/storage').storage;
} catch (error) {
  // Fallback to TypeScript files (for development)
  require('tsx/cjs');
  storage = require('../server/storage').storage;
}

// Import shared utilities
let normalizeUrl, toDocumentId;
try {
  const sharedUrl = require('../dist/shared/url');
  normalizeUrl = sharedUrl.normalizeUrl;
  toDocumentId = sharedUrl.toDocumentId;
} catch (error) {
  require('tsx/cjs');
  const sharedUrl = require('../shared/url');
  normalizeUrl = sharedUrl.normalizeUrl;
  toDocumentId = sharedUrl.toDocumentId;
}

// Import schema
let insertBrandProfileSchema, updateBrandProfileSchema;
try {
  const schema = require('../dist/shared/schema');
  insertBrandProfileSchema = schema.insertBrandProfileSchema;
  updateBrandProfileSchema = schema.updateBrandProfileSchema;
} catch (error) {
  require('tsx/cjs');
  const schema = require('../shared/schema');
  insertBrandProfileSchema = schema.insertBrandProfileSchema;
  updateBrandProfileSchema = schema.updateBrandProfileSchema;
}

// Import DuplicateDocumentIdError
let DuplicateDocumentIdError;
try {
  DuplicateDocumentIdError = require('../dist/storage').DuplicateDocumentIdError;
} catch (error) {
  require('tsx/cjs');
  DuplicateDocumentIdError = require('../server/storage').DuplicateDocumentIdError;
}

// Helper function to convert response to Firebase-compatible format
function toFirebaseFormat(profile) {
  return {
    id: profile.id,
    documentId: profile.documentId,
    url: profile.url,
    brand_profile: profile.brandProfile, // Convert camelCase to snake_case
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt
  };
}

// Brand Profile API routes

// GET /api/brand-profiles - Get all brand profiles
app.get("/api/brand-profiles", async (req, res) => {
  try {
    const profiles = await storage.getAllBrandProfiles();
    res.json(profiles.map(toFirebaseFormat));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brand profiles" });
  }
});

// GET /api/brand-profiles/by-url - Get brand profile by URL (using query param)
app.get("/api/brand-profiles/by-url", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: "URL query parameter is required" });
    }
    
    const decodedUrl = decodeURIComponent(url);
    const canonicalUrl = normalizeUrl(decodedUrl);
    console.log(`URL lookup normalization: "${decodedUrl}" → "${canonicalUrl}"`);
    
    let profile = await storage.getBrandProfileByUrl(canonicalUrl);
    
    // If canonical lookup fails, try legacy URL variants for backward compatibility
    if (!profile) {
      console.log(`Canonical URL lookup failed for: ${canonicalUrl}. Trying legacy variants.`);
      const legacyUrlVariants = [
        decodedUrl, // original URL as provided
        decodedUrl + '/', // with trailing slash  
        decodedUrl.replace(/\/$/, '') // without trailing slash
      ];
      
      for (const urlVariant of legacyUrlVariants) {
        if (urlVariant !== canonicalUrl) {
          profile = await storage.getBrandProfileByUrl(urlVariant);
          if (profile) {
            console.log(`Found profile using legacy URL variant: ${urlVariant}`);
            break;
          }
        }
      }
    }
    
    if (!profile) {
      return res.status(404).json({ error: "Brand profile not found" });
    }
    res.json(toFirebaseFormat(profile));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brand profile" });
  }
});

// GET /api/brand-profiles/:documentId - Get brand profile by document ID
app.get("/api/brand-profiles/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params;
    const profile = await storage.getBrandProfile(documentId);
    if (!profile) {
      return res.status(404).json({ error: "Brand profile not found" });
    }
    res.json(toFirebaseFormat(profile));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brand profile" });
  }
});

// POST /api/brand-profiles - Create or update brand profile (upsert)
app.post("/api/brand-profiles", async (req, res) => {
  try {
    console.log('Received brand profile data:', JSON.stringify(req.body, null, 2));
    const validatedData = insertBrandProfileSchema.parse(req.body);
    
    // Normalize URL and generate canonical document ID
    const canonicalUrl = normalizeUrl(validatedData.url);
    const canonicalDocumentId = toDocumentId(canonicalUrl);
    
    console.log(`URL normalization: "${validatedData.url}" → "${canonicalUrl}" → documentId: "${canonicalDocumentId}"`);
    
    // Check for existing profile by URL first (prevent URL duplicates)
    const existingByUrl = await storage.getBrandProfileByUrl(canonicalUrl);
    // Also check by the canonical document ID
    const existingById = await storage.getBrandProfile(canonicalDocumentId);
    
    let existingProfile = existingByUrl || existingById;
    
    // If no canonical match found, probe for legacy/non-canonical records
    if (!existingProfile) {
      console.log(`No canonical match found. Probing for legacy records for URL: ${canonicalUrl}`);
      
      // Try common legacy variants that could exist due to previous bugs
      const legacyVariants = [
        canonicalDocumentId + '-',  // trailing dash (www-apple-com-)
        canonicalDocumentId + '--', // double dash
        toDocumentId(validatedData.url) // original unprocessed documentId if different
      ];
      
      for (const legacyId of legacyVariants) {
        if (legacyId !== canonicalDocumentId) {
          const legacyRecord = await storage.getBrandProfile(legacyId);
          if (legacyRecord) {
            console.log(`Found legacy record with ID: ${legacyId} for URL: ${canonicalUrl}`);
            existingProfile = legacyRecord;
            break;
          }
        }
      }
      
      // Also try to find by original non-canonical URL variants
      if (!existingProfile) {
        const urlVariants = [
          validatedData.url, // original URL as provided
          validatedData.url + '/', // with trailing slash
          validatedData.url.replace(/\/$/, '') // without trailing slash
        ];
        
        for (const urlVariant of urlVariants) {
          if (urlVariant !== canonicalUrl) {
            const variantRecord = await storage.getBrandProfileByUrl(urlVariant);
            if (variantRecord) {
              console.log(`Found legacy record with URL variant: ${urlVariant} for canonical: ${canonicalUrl}`);
              existingProfile = variantRecord;
              break;
            }
          }
        }
      }
    }
    
    // Use canonical values
    const profileData = {
      ...validatedData,
      url: canonicalUrl,
      documentId: canonicalDocumentId
    };
    
    let profile;
    if (existingProfile) {
      // Check if existing profile has canonical document ID
      if (existingProfile.documentId === canonicalDocumentId) {
        // Update existing profile (already canonical)
        console.log(`Updating existing canonical profile for URL: ${canonicalUrl} (documentId: ${canonicalDocumentId})`);
        profile = await storage.updateBrandProfile(existingProfile.documentId, profileData);
        res.status(200).json(toFirebaseFormat(profile));
      } else {
        // Existing profile has non-canonical document ID - this is a duplicate
        console.log(`Found duplicate with non-canonical ID. Existing: ${existingProfile.documentId}, Canonical: ${canonicalDocumentId}`);
        console.log(`Updating existing profile and noting the canonical ID should be: ${canonicalDocumentId}`);
        
        // Update the existing record but keep its current document ID to avoid key mismatch
        // The normalization will prevent future duplicates
        profile = await storage.updateBrandProfile(existingProfile.documentId, {
          ...profileData,
          documentId: existingProfile.documentId // Keep existing documentId to prevent key/field mismatch
        });
        res.status(200).json(toFirebaseFormat(profile));
      }
    } else {
      // Create new profile with canonical values
      console.log(`Creating new profile for URL: ${canonicalUrl} (documentId: ${canonicalDocumentId})`);
      profile = await storage.createBrandProfile(profileData);
      res.status(201).json(toFirebaseFormat(profile));
    }
  } catch (error) {
    console.error('Brand profile save error:', error);
    if (error.name === 'ZodError') {
      console.log('Validation errors:', error.errors);
      return res.status(400).json({ error: "Invalid data", details: error.errors });
    }
    if (error instanceof DuplicateDocumentIdError) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to save brand profile", details: error.message });
  }
});

// PUT /api/brand-profiles/:documentId - Update brand profile
app.put("/api/brand-profiles/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params;
    const validatedUpdates = updateBrandProfileSchema.parse(req.body);
    
    // If URL is being updated, normalize it
    if (validatedUpdates.url) {
      const canonicalUrl = normalizeUrl(validatedUpdates.url);
      console.log(`URL update normalization: "${validatedUpdates.url}" → "${canonicalUrl}"`);
      
      // Check for URL conflicts (don't allow updating to a URL that already exists elsewhere)
      const existingByUrl = await storage.getBrandProfileByUrl(canonicalUrl);
      if (existingByUrl && existingByUrl.documentId !== documentId) {
        return res.status(409).json({ 
          error: `URL ${canonicalUrl} is already used by another profile (${existingByUrl.documentId})` 
        });
      }
      
      validatedUpdates.url = canonicalUrl;
    }
    
    const profile = await storage.updateBrandProfile(documentId, validatedUpdates);
    if (!profile) {
      return res.status(404).json({ error: "Brand profile not found" });
    }
    res.json(toFirebaseFormat(profile));
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: "Invalid data", details: error.errors });
    }
    if (error instanceof DuplicateDocumentIdError) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update brand profile" });
  }
});

// DELETE /api/brand-profiles/:documentId - Delete brand profile
app.delete("/api/brand-profiles/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params;
    const deleted = await storage.deleteBrandProfile(documentId);
    if (!deleted) {
      return res.status(404).json({ error: "Brand profile not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete brand profile" });
  }
});

// Export the app for Vercel
module.exports = app;