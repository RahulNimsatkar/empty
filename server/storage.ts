// Import Firebase storage implementation
import { FirebaseStorage, DuplicateDocumentIdError, type IStorage } from "./firebaseStorage";

// Export the interfaces and errors for use by routes
export { DuplicateDocumentIdError, type IStorage };

// Use Firebase storage with credentials from environment variables
export const storage = new FirebaseStorage();
