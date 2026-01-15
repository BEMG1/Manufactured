import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="card fade-in"
      onClick={() => onClick(product.id)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="card-image"
        loading="lazy"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "0.5rem",
        }}
      >
        <h3 className="card-title" style={{ marginBottom: 0 }}>
          {product.name}
        </h3>
        {product.inStock ? (
          <span className="badge badge-success">En Stock</span>
        ) : (
          <span className="badge badge-danger">Agotado</span>
        )}
      </div>

      <p className="card-description">{product.description}</p>

      <div style={{ marginBottom: "1rem" }}>
        <span
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-muted)",
            display: "block",
            marginBottom: "0.25rem",
          }}
        >
          {product.presentation}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="price">
          <span className="price-currency">$</span>
          {formatPrice(product.price).replace(/[^\d.,]/g, "")}
        </div>
        <button
          className="btn btn-primary"
          style={{ padding: "0.5rem 1.5rem" }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(product.id);
          }}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}
