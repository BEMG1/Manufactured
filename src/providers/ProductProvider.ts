import { IProduct } from "../interfaces/IProduct";
import { StorageProvider } from "./StorageProvider";

// URL de tu Google Apps Script
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

export class ProductProvider {
  static async getProducts(category?: string, search?: string): Promise<IProduct[]> {
    let products: IProduct[] = [];

    // Try to get from cache first
    if (StorageProvider.isCacheValid()) {
      const cached = StorageProvider.get<IProduct[]>("quimipro_products");
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
      StorageProvider.set("quimipro_products", products);
      StorageProvider.setLastFetchTime();
    }

    // Apply filters
    let filtered = products;
    if (category) {
      filtered = filtered.filter(p => p.Categoría === category);
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
    localStorage.removeItem("quimipro_products");
    localStorage.removeItem("quimipro_last_fetch");
  }

  static async createProduct(
    nombre: string, 
    descripcion: string, 
    categoria: string, 
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
        categoria,
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
    categoria: string, 
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
        categoria,
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
}
