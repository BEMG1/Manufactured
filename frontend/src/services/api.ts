import { Product, Category, ApiResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// SessionStorage keys
const STORAGE_KEYS = {
  PRODUCTS: "quimipro_products",
  CATEGORIES: "quimipro_categories",
  LAST_FETCH: "quimipro_last_fetch",
};

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

class ApiService {
  private async fetchFromApi<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<T> = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.error || "API request failed");
    }
    return data.data;
  }

  private getFromStorage<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  private saveToStorage<T>(key: string, data: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
    }
  }

  private isCacheValid(): boolean {
    const lastFetch = sessionStorage.getItem(STORAGE_KEYS.LAST_FETCH);
    if (!lastFetch) return false;

    const lastFetchTime = parseInt(lastFetch, 10);
    return Date.now() - lastFetchTime < CACHE_DURATION;
  }

  async getProducts(category?: string, search?: string): Promise<Product[]> {
    // Try to get from cache first
    if (!category && !search && this.isCacheValid()) {
      const cached = this.getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS);
      if (cached) {
        console.log("📦 Products loaded from sessionStorage");
        return cached;
      }
    }

    // Fetch from API
    let endpoint = "/products";
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (search) params.append("search", search);
    if (params.toString()) endpoint += `?${params.toString()}`;

    console.log("🌐 Fetching products from API");
    const products = await this.fetchFromApi<Product[]>(endpoint);

    // Cache only if no filters
    if (!category && !search) {
      this.saveToStorage(STORAGE_KEYS.PRODUCTS, products);
      sessionStorage.setItem(STORAGE_KEYS.LAST_FETCH, Date.now().toString());
    }

    return products;
  }

  async getProductById(id: string): Promise<Product> {
    // Try cache first
    const cached = this.getFromStorage<Product[]>(STORAGE_KEYS.PRODUCTS);
    if (cached) {
      const product = cached.find((p) => p.id === id);
      if (product) {
        console.log("📦 Product loaded from sessionStorage");
        return product;
      }
    }

    // Fetch from API
    console.log("🌐 Fetching product from API");
    return this.fetchFromApi<Product>(`/products/${id}`);
  }

  async getCategories(): Promise<Category[]> {
    // Try cache first
    if (this.isCacheValid()) {
      const cached = this.getFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES);
      if (cached) {
        console.log("📦 Categories loaded from sessionStorage");
        return cached;
      }
    }

    // Fetch from API
    console.log("🌐 Fetching categories from API");
    const categories = await this.fetchFromApi<Category[]>("/categories");
    this.saveToStorage(STORAGE_KEYS.CATEGORIES, categories);

    return categories;
  }

  clearCache(): void {
    sessionStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    sessionStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    sessionStorage.removeItem(STORAGE_KEYS.LAST_FETCH);
    console.log("🗑️ Cache cleared");
  }
}

export const api = new ApiService();
