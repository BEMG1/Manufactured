import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ICategory } from "../interfaces/ICategory";
import { CategoryProvider as CategoryAPI } from "../providers/CategoryProvider";
import { useLoaderContext } from "./LoaderContext";

interface CategoryContextType {
  categories: ICategory[];
  isLoadingCategories: boolean;
  refreshCategories: () => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryContextProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const { showLoader, hideLoader } = useLoaderContext();

  const loadCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const catData = await CategoryAPI.getCategories();
      setCategories(catData);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      showLoader("Eliminando categoría...");
      // Optimistic update
      setCategories(prev => prev.filter(c => String(c.id || (c as any).Id) !== id));
      
      await CategoryAPI.deleteCategory(id);
      await loadCategories(); // Recargar para asegurar el estado real
      hideLoader();
    } catch(err) {
      // Revertir si falla
      await loadCategories();
      hideLoader();
      throw err;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, isLoadingCategories, refreshCategories: loadCategories, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("CategoryContext must be used within a CategoryContextProvider");
  }
  return context;
}
