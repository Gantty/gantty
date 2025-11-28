import { StorageUsage } from '../usecase/types';

/**
 * Storage service interface for abstracting storage operations
 */
export interface StorageService {
  /**
   * Get item from storage
   * @param key - Storage key
   * @returns Promise resolving to parsed value or null if not found
   */
  get<T>(key: string): Promise<T | null>;

  /**
   * Set item in storage
   * @param key - Storage key
   * @param value - Value to store (will be JSON stringified)
   * @returns Promise resolving when save completes
   * @throws Error if quota exceeded
   */
  set<T>(key: string, value: T): Promise<void>;

  /**
   * Remove item from storage
   * @param key - Storage key
   * @returns Promise resolving when removal completes
   */
  remove(key: string): Promise<void>;

  /**
   * Clear all storage
   * @returns Promise resolving when clear completes
   */
  clear(): Promise<void>;

  /**
   * Check if storage is available
   * @returns Promise resolving to true if storage is accessible
   */
  isAvailable(): Promise<boolean>;

  /**
   * Get approximate storage usage
   * @returns Promise resolving to usage info
   */
  getUsage(): Promise<StorageUsage>;
}
