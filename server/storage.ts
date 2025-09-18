// Import memory storage implementation  
import { MemoryStorage, DuplicateDocumentIdError, type IStorage } from "./memoryStorage";

// Export the interfaces and errors for use by routes
export { DuplicateDocumentIdError, type IStorage };

// Use in-memory storage for development
export const storage = new MemoryStorage();
