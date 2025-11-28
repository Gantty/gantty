import { StorageService } from '../repository/storage_service';
import { StorageUsage } from '../usecase/types';
import { QuotaExceededError, StorageUnavailableError } from '../usecase/errors';

/**
 * localStorage implementation of StorageService
 */
export class LocalStorageService implements StorageService {
  private readonly storagePrefix = 'gantt_';

  async get<T>(key: string): Promise<T | null> {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return null;
      }

      const prefixedKey = this.getPrefixedKey(key);
      const item = window.localStorage.getItem(prefixedKey);
      
      if (!item) {
        return null;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting item from localStorage (key: ${key}):`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        throw new StorageUnavailableError();
      }

      const prefixedKey = this.getPrefixedKey(key);
      const serialized = JSON.stringify(value);
      
      window.localStorage.setItem(prefixedKey, serialized);
    } catch (error) {
      if (error instanceof StorageUnavailableError) {
        throw error;
      }
      
      // Check if it's a quota exceeded error
      if (
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' ||
         error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      ) {
        throw new QuotaExceededError();
      }

      throw new Error(`Failed to save to localStorage: ${error}`);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }

      const prefixedKey = this.getPrefixedKey(key);
      window.localStorage.removeItem(prefixedKey);
    } catch (error) {
      console.error(`Error removing item from localStorage (key: ${key}):`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }

      // Only clear items with our prefix
      const keys = Object.keys(window.localStorage);
      for (const key of keys) {
        if (key.startsWith(this.storagePrefix)) {
          window.localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }

      // Test if we can actually write to localStorage
      const testKey = `${this.storagePrefix}__test__`;
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      
      return true;
    } catch {
      return false;
    }
  }

  async getUsage(): Promise<StorageUsage> {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return { used: 0, available: 0, percentage: 0 };
      }

      // Calculate approximate usage by summing all our keys
      let totalSize = 0;
      const keys = Object.keys(window.localStorage);
      
      for (const key of keys) {
        if (key.startsWith(this.storagePrefix)) {
          const value = window.localStorage.getItem(key);
          if (value) {
            // Approximate size (2 bytes per character in UTF-16)
            totalSize += (key.length + value.length) * 2;
          }
        }
      }

      // Most browsers have ~5-10MB localStorage limit
      // We'll use 5MB as conservative estimate
      const estimatedQuota = 5 * 1024 * 1024; // 5MB in bytes
      const percentage = (totalSize / estimatedQuota) * 100;

      return {
        used: totalSize,
        available: estimatedQuota - totalSize,
        percentage: Math.min(percentage, 100)
      };
    } catch (error) {
      console.error('Error calculating storage usage:', error);
      return { used: 0, available: 0, percentage: 0 };
    }
  }

  private getPrefixedKey(key: string): string {
    return `${this.storagePrefix}${key}`;
  }
}
