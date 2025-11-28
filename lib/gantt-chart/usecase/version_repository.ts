import { Version, CreateVersionData } from './types';

/**
 * Repository interface for Version snapshot operations
 */
export interface VersionRepository {
  /**
   * Get all versions
   * @returns Promise resolving to array of all versions, sorted by number descending
   */
  getAll(): Promise<Version[]>;

  /**
   * Get version by ID
   * @param id - Version ID
   * @returns Promise resolving to version or null if not found
   */
  getById(id: string): Promise<Version | null>;

  /**
   * Get version by number
   * @param number - Version number
   * @returns Promise resolving to version or null if not found
   */
  getByNumber(number: number): Promise<Version | null>;

  /**
   * Create a new version snapshot
   * @param data - Version creation data
   * @returns Promise resolving to created version
   */
  create(data: CreateVersionData): Promise<Version>;

  /**
   * Delete a version
   * @param id - Version ID to delete
   * @returns Promise resolving to true if deleted, false if not found
   */
  delete(id: string): Promise<boolean>;

  /**
   * Get next version number
   * @returns Promise resolving to next sequential version number
   */
  getNextVersionNumber(): Promise<number>;
}
