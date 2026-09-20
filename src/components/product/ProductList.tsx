import { useState, useEffect } from "react";
import { IProduct } from "../../interfaces/IProduct";
import { ICategory } from "../../interfaces/ICategory";
import { ProductProvider } from "../../providers/ProductProvider";
import { CategoryProvider } from "../../providers/CategoryProvider";
import { ProductCard } from "./ProductCard";
import { Search, Sparkles, Box } from "lucide-react";
import { Button } from "../ui/Button";

interface ProductListProps {
  onProductClick: (id: string) => void;
}

export function ProductList({ onProductClick }: ProductListProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      try {
        const categoriesData = await CategoryProvider.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    init();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      
      const productsData = await ProductProvider.getProducts(
        selectedCategory || undefined,
        searchQuery || undefined
      );
      
      setProducts(productsData);
    } catch (err) {
      setError("Error al cargar los productos. Por favor, intenta de nuevo.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? "" : categoryName);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-teal to-brand-green text-white py-20 text-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,<svg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h40v40H0V0zm20 20h20v20H20V20z\" fill=\"%23ffffff\" fill-rule=\"evenodd\"/></svg>')", backgroundSize: '20px 20px' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md">Catálogo de Productos</h1>
          <p className="text-xl md:text-2xl font-light opacity-95">Selecciona tus productos y completa tu pedido vía WhatsApp</p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/20 transition-all text-lg shadow-sm"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex gap-3 justify-start md:justify-center overflow-x-auto pt-2 pb-4 snap-x mt-2 px-1">
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
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-teal rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-10 px-6 bg-red-50 text-red-600 rounded-2xl max-w-2xl mx-auto border border-red-100">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <h3 className="text-2xl font-bold mb-3 text-gray-700">No se encontraron productos</h3>
            <p className="text-lg">Intenta con otra búsqueda o categoría</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.ID}
                product={product}
                onClick={onProductClick}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
