import { useState, useEffect } from "react";
import { Product, Category } from "../types";
import { api } from "../services/api";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  onProductClick: (id: string) => void;
}

export function ProductList({ onProductClick }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery]);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getProducts(
        selectedCategory || undefined,
        searchQuery || undefined
      );
      setProducts(data);
    } catch (err) {
      setError("Error al cargar los productos. Por favor, intenta de nuevo.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? "" : categoryId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <h1>Productos Químicos de Alta Calidad</h1>
          <p>Soluciones profesionales para industria y hogar</p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container" style={{ paddingTop: "var(--space-2xl)" }}>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="input search-input"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="category-pills">
          <button
            className={`category-pill ${
              selectedCategory === "" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("")}
          >
            <span>✨</span>
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-pill ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container py-xl">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "var(--space-2xl)",
              color: "var(--color-danger)",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "var(--space-3xl)",
              color: "var(--color-text-muted)",
            }}
          >
            <h3>No se encontraron productos</h3>
            <p>Intenta con otra búsqueda o categoría</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
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
