/**
 * URL normalization and document ID generation utilities
 * Used by both client and server to ensure consistent processing
 */

/**
 * Normalizes a URL to a canonical form
 * - Removes trailing slashes
 * - Converts to lowercase
 * - Ensures proper protocol
 */
export function normalizeUrl(url: string): string {
  try {
    // Add protocol if missing (case-insensitive check)
    if (!url.toLowerCase().startsWith('http://') && !url.toLowerCase().startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const urlObj = new URL(url);
    
    // Normalize to canonical form
    return `${urlObj.protocol}//${urlObj.hostname.toLowerCase()}${urlObj.pathname}${urlObj.search}`
      .replace(/\/$/, ''); // Remove trailing slash
  } catch (error) {
    // If URL parsing fails, return cleaned input
    return url.replace(/\/$/, '').toLowerCase();
  }
}

/**
 * Converts a URL to a document ID suitable for Firebase
 * - Extracts hostname and path
 * - Replaces special characters with hyphens
 * - Removes consecutive hyphens
 * - Trims leading/trailing hyphens
 */
export function toDocumentId(url: string): string {
  const normalized = normalizeUrl(url);
  
  try {
    const urlObj = new URL(normalized);
    // Use hostname + pathname for document ID
    const base = urlObj.hostname + urlObj.pathname;
    
    return base
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/-+/g, '-')        // Collapse multiple hyphens
      .replace(/^-+|-+$/g, '');   // Trim leading/trailing hyphens
  } catch (error) {
    // Fallback for invalid URLs
    return url
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}