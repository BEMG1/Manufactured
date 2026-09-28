import { IProduct } from "../interfaces/IProduct";
import { StorageProvider } from "./StorageProvider";

// URL de tu Google Apps Script
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

export class ProductProvider {
  static async getProducts(categoryId?: string, search?: string): Promise<IProduct[]> {
    let products: IProduct[] = [];

    // Try to get from cache first
    if (StorageProvider.isCacheValid("products")) {
      const cached = StorageProvider.get<IProduct[]>("products");
      if (cached) {        
        products = cached;
      }
    }

    if (products.length === 0) {
      if (!SCRIPT_URL) {
        throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");
      }

      // Fetch from Google Apps Script API      
      const response = await fetch(SCRIPT_URL);
      if (!response.ok) {
        throw new Error("Error al obtener los productos de Google Sheets");
      }
      
      products = await response.json();
      
      // Transformar URLs de Google Drive a URLs directas de imagen
      products = products.map((p: any) => {
        let imageUrl = String(p.URL_Imagen || "");
        
        const fileIdMatch = imageUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        let fileId = null;
        
        if (fileIdMatch && fileIdMatch[1]) {
          fileId = fileIdMatch[1];
        } else {
          const idMatch = imageUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
          if (idMatch && idMatch[1]) {
            fileId = idMatch[1];
          }
        }
        
        if (fileId) {
          // Usar la API de thumbnail de Drive que es más confiable para etiquetas <img>
          imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
        }
        
        // Mapeamos Categoria (sin acento) a Categoría (con acento) por si en Excel lo escriben sin acento
        return { ...p, URL_Imagen: imageUrl, Categoría: p.Categoría || p.Categoria } as IProduct;
      });
      
      // Cache the results
      StorageProvider.set("products", products);
      StorageProvider.setLastFetchTime("products");
    }

    // Apply filters
    let filtered = products;
    if (categoryId) {
      filtered = filtered.filter(p => String(p.Categoría) === String(categoryId));
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p => 
        String(p.Nombre).toLowerCase().includes(s) || 
        String(p.Descripción).toLowerCase().includes(s)
      );
    }

    return filtered;
  }

  static async getProductById(id: string): Promise<IProduct> {
    const products = await this.getProducts();
    const product = products.find((p) => String(p.ID) === String(id) || String((p as any).Id) === String(id));
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  static clearCache() {
    StorageProvider.clearCache("products");
  }

  static async createProduct(
    nombre: string, 
    descripcion: string, 
    categoriaId: string, 
    precio: number, 
    imageBase64?: string
  ): Promise<boolean> {
    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "createProduct",
        nombre,
        descripcion,
        categoriaId,
        precio,
        imageBase64
      }),
    });
    
    if (!response.ok) throw new Error("Error de conexión al crear producto");
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "No se pudo crear el producto");
    }
    
    this.clearCache();
    return true;
  }

  static async updateProduct(
    id: string,
    nombre: string, 
    descripcion: string, 
    categoriaId: string, 
    precio: number, 
    currentImageUrl: string,
    imageBase64?: string
  ): Promise<boolean> {
    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "updateProduct",
        id,
        nombre,
        descripcion,
        categoriaId,
        precio,
        currentImageUrl,
        imageBase64
      }),
    });
    
    if (!response.ok) throw new Error("Error de conexión al actualizar producto");
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "No se pudo actualizar el producto");
    }
    
    this.clearCache();
    return true;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "deleteProduct",
        id
      }),
    });
    
    if (!response.ok) throw new Error("Error de conexión al eliminar producto");
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "No se pudo eliminar el producto");
    }
    
    this.clearCache();
    return true;
  }


  static async checkTriggersAndUpdateCache(): Promise<{ productsChanged: boolean, categoriesChanged: boolean }> {
    let flags = { productsChanged: false, categoriesChanged: false };
    if (!SCRIPT_URL) return flags;
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getTriggers`);
      
      const result = await response.json();
      console.log("result", result);
      if (result.success) {
        const localProdTrigger = StorageProvider.get<number>("products_trigger");
        const remoteProdTrigger = Number(result.productsTrigger);
        
        if (remoteProdTrigger && localProdTrigger !== remoteProdTrigger) {
          StorageProvider.clearCache("products");
          StorageProvider.set("products_trigger", remoteProdTrigger);
          flags.productsChanged = true;
        }

        const localCatTrigger = StorageProvider.get<number>("categories_trigger");
        const remoteCatTrigger = Number(result.categoriesTrigger);
        
        if (remoteCatTrigger && localCatTrigger !== remoteCatTrigger) {
          StorageProvider.clearCache("categories");
          StorageProvider.set("categories_trigger", remoteCatTrigger);
          flags.categoriesChanged = true;
        }
      }
    } catch (e) {
      console.error("Error checking triggers", e);
    }
    return flags;
  }
}
