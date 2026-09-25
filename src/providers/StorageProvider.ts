// Cache duration (1 day)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export class StorageProvider {
  static get<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  static set<T>(key: string, data: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to sessionStorage:`, error);
    }
  }

  static isCacheValid(key: string): boolean {
    const lastFetch = sessionStorage.getItem(`${key}_last_fetch`);
    if (!lastFetch) return false;

    const lastFetchTime = parseInt(lastFetch, 10);
    return Date.now() - lastFetchTime < CACHE_DURATION;
  }

  static setLastFetchTime(key: string): void {
    sessionStorage.setItem(`${key}_last_fetch`, Date.now().toString());
  }

  static clearCache(key: string): void {
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(`${key}_last_fetch`);
  }
}
