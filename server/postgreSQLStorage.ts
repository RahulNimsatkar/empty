import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, and } from "drizzle-orm";
import { type User, type InsertUser, type BrandProfile, type InsertBrandProfile, users, brandProfiles } from "@shared/schema";

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

export class PostgreSQLStorage implements IStorage {
  private db;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    
    const sql = neon(process.env.DATABASE_URL);
    this.db = drizzle(sql);
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
      return result[0];
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
      return result[0];
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const result = await this.db.insert(users).values(insertUser).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getBrandProfile(documentId: string): Promise<BrandProfile | undefined> {
    try {
      const result = await this.db
        .select()
        .from(brandProfiles)
        .where(eq(brandProfiles.documentId, documentId))
        .limit(1);
      return result[0];
    } catch (error) {
      console.error('Error getting brand profile:', error);
      return undefined;
    }
  }

  async getBrandProfileByUrl(url: string): Promise<BrandProfile | undefined> {
    try {
      const result = await this.db
        .select()
        .from(brandProfiles)
        .where(eq(brandProfiles.url, url))
        .limit(1);
      return result[0];
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

      const result = await this.db
        .insert(brandProfiles)
        .values({
          documentId: insertBrandProfile.documentId,
          url: insertBrandProfile.url,
          brandProfile: insertBrandProfile.brand_profile,
        })
        .returning();
      
      console.log('Brand profile created successfully with ID:', result[0].id);
      return result[0];
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

      // Check if data has actually changed to avoid unnecessary database writes
      const hasChanges = (
        (updates.documentId && updates.documentId !== existing.documentId) ||
        (updates.url && updates.url !== existing.url) ||
        (updates.brand_profile && JSON.stringify(updates.brand_profile) !== JSON.stringify(existing.brandProfile))
      );

      if (!hasChanges) {
        console.log(`No changes detected for documentId: ${documentId}, skipping database update`);
        return existing;
      }

      console.log(`Data changes detected for documentId: ${documentId}, updating database`);

      const updateData: any = {
        updatedAt: new Date()
      };

      if (updates.documentId) updateData.documentId = updates.documentId;
      if (updates.url) updateData.url = updates.url;
      if (updates.brand_profile) updateData.brandProfile = updates.brand_profile;

      const result = await this.db
        .update(brandProfiles)
        .set(updateData)
        .where(eq(brandProfiles.documentId, documentId))
        .returning();

      return result[0];
    } catch (error) {
      console.error('Error updating brand profile:', error);
      throw error;
    }
  }

  async deleteBrandProfile(documentId: string): Promise<boolean> {
    try {
      const result = await this.db
        .delete(brandProfiles)
        .where(eq(brandProfiles.documentId, documentId))
        .returning();
      
      return result.length > 0;
    } catch (error) {
      console.error('Error deleting brand profile:', error);
      return false;
    }
  }

  async getAllBrandProfiles(): Promise<BrandProfile[]> {
    try {
      const result = await this.db.select().from(brandProfiles);
      return result;
    } catch (error) {
      console.error('Error getting all brand profiles:', error);
      return [];
    }
  }
}