// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

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

  static isCacheValid(): boolean {
    const lastFetch = sessionStorage.getItem("quimipro_last_fetch");
    if (!lastFetch) return false;

    const lastFetchTime = parseInt(lastFetch, 10);
    return Date.now() - lastFetchTime < CACHE_DURATION;
  }

  static setLastFetchTime(): void {
    sessionStorage.setItem("quimipro_last_fetch", Date.now().toString());
  }

  static clearCache(): void {
    sessionStorage.removeItem("quimipro_products");
    sessionStorage.removeItem("quimipro_last_fetch");
    console.log("🗑️ Cache cleared");
  }
}
