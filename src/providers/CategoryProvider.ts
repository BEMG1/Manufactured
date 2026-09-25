import { ICategory } from "../interfaces/ICategory";
import { StorageProvider } from "./StorageProvider";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

export class CategoryProvider {
  /**
   * Obtiene la lista de categorías desde Google Sheets
   */
  static async getCategories(): Promise<ICategory[]> {
    if (StorageProvider.isCacheValid("categories")) {
      const cached = StorageProvider.get<ICategory[]>("categories");
      if (cached) return cached;
    }

    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");

    const url = `${SCRIPT_URL}?action=getCategories`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Error de conexión al obtener categorías.");
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
       return [];
    }

    const categories = data.map((item: any) => ({
      id: String(item.Id || item.ID || item.id || ""),
      name: item.Nombre || item.name || "",
      description: item.Descripcion || item.description || "",
      icon: "📦" // Se podría agregar una columna Icono en el Excel después
    }));

    StorageProvider.set("categories", categories);
    StorageProvider.setLastFetchTime("categories");

    return categories;
  }

  static clearCache() {
    StorageProvider.clearCache("categories");
  }

  /**
   * Crea una nueva categoría en Google Sheets
   */
  static async createCategory(name: string, description: string): Promise<boolean> {
    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");
    
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "createCategory",
        nombre: name,
        descripcion: description
      }),
    });
    
    if (!response.ok) throw new Error("Error de conexión al crear categoría");
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "No se pudo crear la categoría");
    }
    
    this.clearCache();
    return true;
  }

  /**
   * Actualiza una categoría en Google Sheets
   */
  static async updateCategory(id: string, name: string, description: string): Promise<boolean> {
    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");
    
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "updateCategory",
        id: id,
        nombre: name,
        descripcion: description
      }),
    });
    
    if (!response.ok) throw new Error("Error de conexión al actualizar categoría");
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "No se pudo actualizar la categoría");
    }
    
    this.clearCache();
    return true;
  }

  /**
   * Elimina una categoría en Google Sheets
   */
  static async deleteCategory(id: string): Promise<boolean> {
    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");
    
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "deleteCategory",
        id: id
      }),
    });
    
    if (!response.ok) throw new Error("Error de conexión al eliminar categoría");
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "No se pudo eliminar la categoría");
    }
    
    this.clearCache();
    return true;
  }
}
