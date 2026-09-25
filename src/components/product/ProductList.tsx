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

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? "" : categoryName);
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="catalogo">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pb-4 border-b border-slate-200">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight font-heading">Catálogo</h2>
          </div>

          <div className="flex gap-3 justify-start overflow-x-auto pt-2 pb-4 snap-x mt-2 px-1 mb-6">
          <Button
            variant={selectedCategory === "" ? "primary" : "outline"}
            className="shrink-0 rounded-full"
            onClick={() => handleCategoryClick("")}
          >
            <Sparkles className="w-4 h-4" />
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "primary" : "outline"}
              className="shrink-0 rounded-full"
              onClick={() => handleCategoryClick(category.name)}
            >
              <Box className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
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
