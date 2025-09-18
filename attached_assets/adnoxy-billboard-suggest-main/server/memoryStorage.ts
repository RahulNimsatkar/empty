import { type User, type InsertUser, type BrandProfile, type InsertBrandProfile } from "@shared/schema";

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

export class MemoryStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private brandProfiles: Map<string, BrandProfile> = new Map();
  private idCounter = 1;

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = `user_${this.idCounter++}`;
    const user: User = {
      id,
      ...insertUser
    };
    this.users.set(id, user);
    return user;
  }

  async getBrandProfile(documentId: string): Promise<BrandProfile | undefined> {
    return this.brandProfiles.get(documentId);
  }

  async getBrandProfileByUrl(url: string): Promise<BrandProfile | undefined> {
    for (const profile of this.brandProfiles.values()) {
      if (profile.url === url) {
        return profile;
      }
    }
    return undefined;
  }

  async createBrandProfile(insertBrandProfile: InsertBrandProfile): Promise<BrandProfile> {
    // Check for duplicate documentId
    if (this.brandProfiles.has(insertBrandProfile.documentId)) {
      throw new DuplicateDocumentIdError(insertBrandProfile.documentId);
    }

    const now = new Date();
    const brandProfile: BrandProfile = {
      id: `profile_${this.idCounter++}`,
      documentId: insertBrandProfile.documentId,
      url: insertBrandProfile.url,
      brandProfile: insertBrandProfile.brand_profile,
      createdAt: now,
      updatedAt: now
    };

    this.brandProfiles.set(insertBrandProfile.documentId, brandProfile);
    return brandProfile;
  }

  async updateBrandProfile(documentId: string, updates: Partial<InsertBrandProfile>): Promise<BrandProfile | undefined> {
    const existing = this.brandProfiles.get(documentId);
    if (!existing) {
      return undefined;
    }

    // Check for documentId collision if documentId is being changed
    if (updates.documentId && updates.documentId !== existing.documentId) {
      if (this.brandProfiles.has(updates.documentId)) {
        throw new DuplicateDocumentIdError(updates.documentId);
      }
    }

    // Check if data has actually changed
    const hasChanges = (
      (updates.documentId && updates.documentId !== existing.documentId) ||
      (updates.url && updates.url !== existing.url) ||
      (updates.brand_profile && JSON.stringify(updates.brand_profile) !== JSON.stringify(existing.brandProfile))
    );

    if (!hasChanges) {
      console.log(`No changes detected for documentId: ${documentId}, skipping update`);
      return existing;
    }

    console.log(`Data changes detected for documentId: ${documentId}, updating record`);

    const now = new Date();
    const updatedProfile: BrandProfile = {
      ...existing,
      documentId: updates.documentId ?? existing.documentId,
      url: updates.url ?? existing.url,
      brandProfile: updates.brand_profile ?? existing.brandProfile,
      updatedAt: now
    };

    // If documentId is changing, remove old key and add new one
    if (updates.documentId && updates.documentId !== existing.documentId) {
      this.brandProfiles.delete(documentId);
      this.brandProfiles.set(updates.documentId, updatedProfile);
    } else {
      this.brandProfiles.set(documentId, updatedProfile);
    }

    return updatedProfile;
  }

  async deleteBrandProfile(documentId: string): Promise<boolean> {
    return this.brandProfiles.delete(documentId);
  }

  async getAllBrandProfiles(): Promise<BrandProfile[]> {
    return Array.from(this.brandProfiles.values());
  }
}