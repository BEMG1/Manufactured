import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IProduct } from "../interfaces/IProduct";
import { ProductProvider } from "../providers/ProductProvider";
import { useLoaderContext } from "./LoaderContext";
import { useCategoryContext } from "./CategoryContext";

interface DataContextType {
  products: IProduct[];
  isLoading: boolean;
  refreshData: (categoryId?: string, search?: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataContextProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showLoader, hideLoader } = useLoaderContext();
  const { refreshCategories } = useCategoryContext();

  const loadData = async (categoryId?: string, search?: string) => {
    try {
      setIsLoading(true);
      // Buscamos localmente con los datos en caché (StorageProvider/Memoria)
      const prodData = await ProductProvider.getProducts(categoryId, search);
      setProducts(prodData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Verificación silenciosa (Stale-While-Revalidate) usando triggers
    const checkUpdates = async () => {
      const { productsChanged, categoriesChanged } = await ProductProvider.checkTriggersAndUpdateCache();
      if (productsChanged) {
        const freshData = await ProductProvider.getProducts();
        setProducts(freshData);
      }
      if (categoriesChanged) {
        await refreshCategories();
      }
    };
    checkUpdates();
  }, []);

  const deleteProduct = async (id: string) => {
    try {
      showLoader("Eliminando producto...");
      
      // Actualización optimista: lo quitamos de la vista inmediatamente
      setProducts(prev => prev.filter(p => String(p.ID || (p as any).Id) !== id));
      
      await ProductProvider.deleteProduct(id);
      await loadData(); // Recargamos para estar seguros (ya en el background)
    } catch(err) {
      // Si falla, volvemos a cargar los datos reales para deshacer la actualización optimista
      await loadData();
      throw err;
    } finally {
      hideLoader();
    }
  };

  return (
    <DataContext.Provider value={{ products, isLoading, refreshData: loadData, deleteProduct }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
}
