import { useState, useEffect } from "react";
import { Product } from "../types";
import { api } from "../services/api";

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError("Error al cargar el producto. Por favor, intenta de nuevo.");
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: "400px" }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-xl">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Volver
        </button>
        <div
          style={{
            textAlign: "center",
            padding: "var(--space-3xl)",
            color: "var(--color-danger)",
          }}
        >
          {error || "Producto no encontrado"}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-xl fade-in">
      <button
        className="btn btn-secondary"
        onClick={onBack}
        style={{ marginBottom: "var(--space-xl)" }}
      >
        ← Volver a Productos
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--space-2xl)",
          alignItems: "start",
        }}
      >
        {/* Image Section */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-xl)",
            }}
          />
        </div>

        {/* Details Section */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-md)",
              marginBottom: "var(--space-lg)",
            }}
          >
            <h1 style={{ marginBottom: 0 }}>{product.name}</h1>
            {product.inStock ? (
              <span className="badge badge-success">En Stock</span>
            ) : (
              <span className="badge badge-danger">Agotado</span>
            )}
          </div>

          <p
            style={{
              fontSize: "var(--font-size-lg)",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-xl)",
            }}
          >
            {product.description}
          </p>

          <div className="price" style={{ marginBottom: "var(--space-xl)" }}>
            <span className="price-currency">$</span>
            {formatPrice(product.price).replace(/[^\d.,]/g, "")}
          </div>

          <div className="card" style={{ marginBottom: "var(--space-xl)" }}>
            <h3>📦 Presentación</h3>
            <p style={{ marginBottom: 0 }}>{product.presentation}</p>
          </div>

          <div className="card" style={{ marginBottom: "var(--space-xl)" }}>
            <h3>✨ Características</h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gap: "var(--space-sm)",
              }}
            >
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                  }}
                >
                  <span style={{ color: "var(--color-success)" }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>📋 Modo de Uso</h3>
            <p style={{ marginBottom: 0 }}>{product.usage}</p>
          </div>

          <button
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: "var(--space-xl)",
              fontSize: "var(--font-size-lg)",
              padding: "var(--space-lg)",
            }}
            disabled={!product.inStock}
          >
            {product.inStock
              ? "🛒 Solicitar Cotización"
              : "❌ Producto Agotado"}
          </button>
        </div>
      </div>
    </div>
  );
}
