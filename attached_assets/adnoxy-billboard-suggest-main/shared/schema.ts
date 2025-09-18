import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Domain types for brand profile JSON fields
export const keywordSchema = z.object({
  keyword: z.string(),
  score: z.number().min(0).max(1)
});

export const personalityScoresSchema = z.object({
  sincerity: z.object({
    score: z.number().min(1).max(10),
    justification: z.string()
  }),
  excitement: z.object({
    score: z.number().min(1).max(10),
    justification: z.string()
  }),
  competence: z.object({
    score: z.number().min(1).max(10),
    justification: z.string()
  }),
  sophistication: z.object({
    score: z.number().min(1).max(10),
    justification: z.string()
  }),
  ruggedness: z.object({
    score: z.number().min(1).max(10),
    justification: z.string()
  })
});

export const targetAudienceSchema = z.object({
  demographics: z.object({
    age_range: z.string(),
    gender: z.string(),
    income_level: z.string()
  }),
  psychographics: z.object({
    values: z.array(z.string()),
    interests: z.array(z.string()),
    lifestyle: z.string()
  })
});

export type Keyword = z.infer<typeof keywordSchema>;
export type PersonalityScores = z.infer<typeof personalityScoresSchema>;
export type TargetAudience = z.infer<typeof targetAudienceSchema>;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Brand profile structure to match Firebase format exactly
export const brandProfileDataSchema = z.object({
  keywords: z.array(keywordSchema).min(1),
  themes: z.array(z.string()).min(1),
  personality_scores: personalityScoresSchema,
  inferred_target_audience: targetAudienceSchema,
});

export type BrandProfileData = z.infer<typeof brandProfileDataSchema>;

export const brandProfiles = pgTable("brand_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: text("document_id").notNull().unique(), // e.g., "www-apple-com"
  url: text("url").notNull(),
  brandProfile: json("brand_profile").$type<BrandProfileData>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Create brand profile validation schema to match Firebase format exactly
export const insertBrandProfileSchema = z.object({
  documentId: z.string().min(1),
  url: z.string().url(),
  brand_profile: brandProfileDataSchema,
});

// Schema for partial updates
export const updateBrandProfileSchema = insertBrandProfileSchema.partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBrandProfile = z.infer<typeof insertBrandProfileSchema>;
export type UpdateBrandProfile = z.infer<typeof updateBrandProfileSchema>;
export type BrandProfile = typeof brandProfiles.$inferSelect;
