import { useState, useEffect } from "react";
import { IProduct } from "../../interfaces/IProduct";
import { ProductProvider } from "../../providers/ProductProvider";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/Button";

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await ProductProvider.getProductById(productId);
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
    }).format(price || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-teal rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Button 
          variant="outline"
          className="mb-8"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" /> Volver
        </Button>
        <div className="text-center py-12 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-medium">
          {error || "Producto no encontrado"}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
      <Button
        variant="outline"
        className="mb-10"
        onClick={onBack}
      >
        <ArrowLeft className="w-5 h-5" /> Volver a Productos
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 group">
          <img
            src={product.URL_Imagen || "https://via.placeholder.com/600?text=No+Image"}
            alt={product.Nombre}
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="flex flex-col h-full">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {product.Nombre}
            </h1>
            {product.Categoría && (
              <span className="bg-brand-light/20 text-brand-green border border-brand-light/30 px-4 py-1.5 rounded-full font-bold text-sm">
                {product.Categoría}
              </span>
            )}
          </div>

          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 font-light">
            {product.Descripción}
          </p>

          <div className="mt-auto">
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-2xl font-bold text-gray-400">$</span>
              <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                {formatPrice(product.Precio).replace(/[^\d.,]/g, "")}
              </span>
            </div>

            <Button
              size="lg"
              className="w-full py-5 rounded-2xl text-xl"
              onClick={() => {
                 addToCart(product);
                 onBack(); // Volver después de añadir para seguir comprando (opcional)
              }}
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Agregar al Carrito</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
