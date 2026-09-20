import { IProduct } from "../../interfaces/IProduct";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/Button";

interface ProductCardProps {
  product: IProduct;
  onClick: (id: string) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCart();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-brand-teal/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full overflow-hidden group animate-[fadeIn_0.5s_ease-out]"
      onClick={() => onClick(String(product.ID))}
    >
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.URL_Imagen || "https://via.placeholder.com/300?text=No+Image"}
          alt={product.Nombre}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.Categoría && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-green text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {product.Categoría}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-brand-teal transition-colors">
          {product.Nombre}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
          {product.Descripción}
        </p>

        <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm font-semibold text-gray-400">$</span>
            <span className="text-2xl font-extrabold text-gray-900 ml-1">
              {formatPrice(product.Precio).replace(/[^\d.,]/g, "")}
            </span>
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}
