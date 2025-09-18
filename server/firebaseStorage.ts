import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { type User, type InsertUser, type BrandProfile, type InsertBrandProfile } from "@shared/schema";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Firebase configuration using environment variables (server-side - no VITE prefix)
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN', 
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

// Validate required environment variables
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  throw new Error(`Missing required Firebase environment variables: ${missingVars.join(', ')}. Please check your .env file.`);
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Firebase config loaded from environment variables securely

// Initialize Firebase (only if not already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export class DuplicateDocumentIdError extends Error {
  constructor(documentId: string) {
    super(`Brand profile with documentId '${documentId}' already exists`);
    this.name = 'DuplicateDocumentIdError';
  }
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Brand Profile methods
  getBrandProfile(documentId: string): Promise<BrandProfile | undefined>;
  getBrandProfileByUrl(url: string): Promise<BrandProfile | undefined>;
  createBrandProfile(brandProfile: InsertBrandProfile): Promise<BrandProfile>;
  updateBrandProfile(documentId: string, updates: Partial<InsertBrandProfile>): Promise<BrandProfile | undefined>;
  deleteBrandProfile(documentId: string): Promise<boolean>;
  getAllBrandProfiles(): Promise<BrandProfile[]>;
}

export class FirebaseStorage implements IStorage {
  private usersCollection = collection(db, 'users');
  private brandProfilesCollection = collection(db, 'brand_profiles');

  async getUser(id: string): Promise<User | undefined> {
    try {
      const docRef = doc(this.usersCollection, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as User;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const q = query(this.usersCollection, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as User;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const docRef = await addDoc(this.usersCollection, insertUser);
      return { id: docRef.id, ...insertUser } as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Brand Profile methods
  async getBrandProfile(documentId: string): Promise<BrandProfile | undefined> {
    try {
      const q = query(this.brandProfilesCollection, where("documentId", "==", documentId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          documentId: data.documentId,
          url: data.url,
          brandProfile: data.brand_profile, // Firebase uses snake_case
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as BrandProfile;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting brand profile:', error);
      return undefined;
    }
  }

  async getBrandProfileByUrl(url: string): Promise<BrandProfile | undefined> {
    try {
      const q = query(this.brandProfilesCollection, where("url", "==", url));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          documentId: data.documentId,
          url: data.url,
          brandProfile: data.brand_profile, // Firebase uses snake_case
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as BrandProfile;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting brand profile by URL:', error);
      return undefined;
    }
  }

  async createBrandProfile(insertBrandProfile: InsertBrandProfile): Promise<BrandProfile> {
    try {
      console.log('Creating brand profile for:', insertBrandProfile.documentId);
      
      // Check for duplicate documentId
      const existing = await this.getBrandProfile(insertBrandProfile.documentId);
      if (existing) {
        throw new DuplicateDocumentIdError(insertBrandProfile.documentId);
      }

      const now = new Date();
      const firebaseData = {
        documentId: insertBrandProfile.documentId,
        url: insertBrandProfile.url,
        brand_profile: insertBrandProfile.brand_profile, // Store as snake_case in Firebase
        createdAt: now,
        updatedAt: now
      };

      console.log('Saving to Firestore:', {
        collection: 'brand_profiles',
        data: {
          documentId: firebaseData.documentId,
          url: firebaseData.url,
          hasProfile: !!firebaseData.brand_profile
        }
      });

      // Use the sanitized URL as the Firebase document ID for better visibility
      const docRef = doc(this.brandProfilesCollection, insertBrandProfile.documentId);
      await setDoc(docRef, firebaseData);
      
      console.log('Brand profile created successfully with ID:', docRef.id);
      
      return {
        id: docRef.id,
        documentId: insertBrandProfile.documentId,
        url: insertBrandProfile.url,
        brandProfile: insertBrandProfile.brand_profile, // Return as camelCase for API
        createdAt: now,
        updatedAt: now
      } as BrandProfile;
    } catch (error) {
      console.error('Error creating brand profile:', error);
      throw error;
    }
  }

  async updateBrandProfile(documentId: string, updates: Partial<InsertBrandProfile>): Promise<BrandProfile | undefined> {
    try {
      const existing = await this.getBrandProfile(documentId);
      if (!existing) return undefined;

      // Check for documentId collision if documentId is being changed
      if (updates.documentId && updates.documentId !== existing.documentId) {
        const existingWithNewId = await this.getBrandProfile(updates.documentId);
        if (existingWithNewId) {
          throw new DuplicateDocumentIdError(updates.documentId);
        }
      }

      // Check if data has actually changed to avoid unnecessary Firebase writes
      const hasChanges = (
        (updates.documentId && updates.documentId !== existing.documentId) ||
        (updates.url && updates.url !== existing.url) ||
        (updates.brand_profile && JSON.stringify(updates.brand_profile) !== JSON.stringify(existing.brandProfile))
      );

      if (!hasChanges) {
        console.log(`No changes detected for documentId: ${documentId}, skipping database update`);
        return existing; // Return existing data without update
      }

      console.log(`Data changes detected for documentId: ${documentId}, updating database`);

      // Find the document in Firebase
      const q = query(this.brandProfilesCollection, where("documentId", "==", documentId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return undefined;

      const docRef = querySnapshot.docs[0].ref;
      const now = new Date();
      
      const updateData: any = {
        updatedAt: now
      };

      if (updates.documentId) updateData.documentId = updates.documentId;
      if (updates.url) updateData.url = updates.url;
      if (updates.brand_profile) updateData.brand_profile = updates.brand_profile;

      await updateDoc(docRef, updateData);

      return {
        id: querySnapshot.docs[0].id,
        documentId: updates.documentId ?? existing.documentId,
        url: updates.url ?? existing.url,
        brandProfile: updates.brand_profile ?? existing.brandProfile,
        createdAt: existing.createdAt,
        updatedAt: now
      } as BrandProfile;
    } catch (error) {
      console.error('Error updating brand profile:', error);
      throw error;
    }
  }

  async deleteBrandProfile(documentId: string): Promise<boolean> {
    try {
      const q = query(this.brandProfilesCollection, where("documentId", "==", documentId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return false;

      await deleteDoc(querySnapshot.docs[0].ref);
      return true;
    } catch (error) {
      console.error('Error deleting brand profile:', error);
      return false;
    }
  }

  async getAllBrandProfiles(): Promise<BrandProfile[]> {
    try {
      const querySnapshot = await getDocs(this.brandProfilesCollection);
      const profiles: BrandProfile[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        profiles.push({
          id: doc.id,
          documentId: data.documentId,
          url: data.url,
          brandProfile: data.brand_profile, // Convert snake_case to camelCase for API
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
