import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IProduct } from "../interfaces/IProduct";
import { ProductProvider } from "../providers/ProductProvider";
import { useLoaderContext } from "./LoaderContext";

interface DataContextType {
  products: IProduct[];
  isLoading: boolean;
  refreshData: (category?: string, search?: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataContextProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showLoader, hideLoader } = useLoaderContext();

  const loadData = async (category?: string, search?: string) => {
    try {
      setIsLoading(true);
      if (search) {
        showLoader("Buscando productos...");
        const prodData = await ProductProvider.searchProducts(search);
        if (category) {
          setProducts(prodData.filter(p => p.Categoría === category));
        } else {
          setProducts(prodData);
        }
        hideLoader();
      } else {
        const prodData = await ProductProvider.getProducts(category);
        setProducts(prodData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
