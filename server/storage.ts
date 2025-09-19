// Import Memory storage implementation (better for Replit compatibility)
import { MemoryStorage, DuplicateDocumentIdError, type IStorage } from "./memoryStorage";

// Export the interfaces and errors for use by routes
export { DuplicateDocumentIdError, type IStorage };

// Use Memory storage for Replit environment (no external dependencies)
export const storage = new MemoryStorage();
