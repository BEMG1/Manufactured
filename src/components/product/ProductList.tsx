import { useState, useEffect } from "react";
import { useCategoryContext } from "../../context/CategoryContext";
import { useDataContext } from "../../context/DataContext";
import { ProductCard } from "./ProductCard";
import { Sparkles, Box } from "lucide-react";
import { Button } from "../ui/Button";
import { HeroBanner } from "../layout/HeroBanner";

interface ProductListProps {
  onProductClick: (id: string) => void;
}

export function ProductList({ onProductClick }: ProductListProps) {
  const { products, isLoading, refreshData } = useDataContext();
  const { categories } = useCategoryContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSearch, setActiveSearch] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, activeSearch]);

  const loadProducts = async () => {
    try {
      setError("");
      await refreshData(selectedCategory || undefined, activeSearch || undefined);
    } catch (err) {
      setError("Error al cargar los productos. Por favor, intenta de nuevo.");
      console.error("Error loading products:", err);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? "" : categoryId);
    setSearchQuery("");
    setActiveSearch("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const onExplore = () => {
    setActiveSearch(searchQuery); // Disparar la búsqueda remota solo al dar clic
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8FAF8]">
      <HeroBanner 
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onExplore={onExplore}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative" id="catalogo" data-purpose="product-catalog">
        <div className="pointer-events-none absolute right-4 top-16 w-64 h-64 text-emerald-600/[0.04] -z-10">
          <svg className="w-full h-full transform rotate-12" fill="currentColor" viewBox="0 0 100 100"><path d="M50 0 C75 25 85 60 70 85 C55 100 20 95 10 70 C0 45 25 20 50 0 Z"></path><path d="M10 70 Q 45 45 70 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path><path d="M28 55 Q 50 55 65 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"></path></svg>
        </div>
        <div className="pointer-events-none absolute left-0 bottom-10 w-72 h-72 text-cyan-600/[0.035] -z-10">
          <svg className="w-full h-full transform -rotate-45" fill="currentColor" viewBox="0 0 100 100"><path d="M50 0 C75 25 85 60 70 85 C55 100 20 95 10 70 C0 45 25 20 50 0 Z"></path><path d="M10 70 Q 45 45 70 10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path></svg>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-8 pb-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" strokeLinecap="round" strokeLinejoin="round"></path><line strokeLinecap="round" strokeLinejoin="round" x1="16" x2="2" y1="8" y2="22"></line><line strokeLinecap="round" strokeLinejoin="round" x1="17.5" x2="9" y1="15" y2="15"></line></svg>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight font-heading">Catálogo</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Línea completa de limpieza ecológica y biodegradabilidad certificada directa de fábrica</p>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <button
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-colors ${
                  selectedCategory === ""
                    ? "bg-[#1B5E20] text-white font-bold shadow-sm"
                    : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] font-semibold cursor-pointer"
                }`}
                onClick={() => handleCategoryClick("")}
              >
                {selectedCategory === "" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#48BB78]"></span>
                )}
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-colors ${
                    selectedCategory === category.id
                      ? "bg-[#1B5E20] text-white font-bold shadow-sm"
                      : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] font-semibold cursor-pointer"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {selectedCategory === category.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#48BB78]"></span>
                  )}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          {/* Products Grid */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-teal rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-10 px-6 bg-red-50 text-red-600 rounded-2xl max-w-2xl mx-auto border border-red-100">
              {error}
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <h3 className="text-2xl font-bold mb-3 text-gray-700">No se encontraron productos</h3>
              <p className="text-lg">Intenta con otra búsqueda o categoría</p>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.ID}
                  product={product}
                  onClick={onProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
