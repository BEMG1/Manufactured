import { IProduct } from "../../interfaces/IProduct";
import { useCartContext } from "../../context/CartContext";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: IProduct;
  onClick: (id: string) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCartContext();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price || 0).replace(/[^\d.,]/g, "");
  };

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-level-1 transition-all flex flex-col group hover:border-brand-light cursor-pointer h-full"
      onClick={() => onClick(String(product.ID || (product as any).Id))}
    >
      <div className="relative bg-gradient-to-b from-slate-50 to-brand-green/5 aspect-[4/3] flex items-center justify-center border-b border-slate-100 overflow-hidden">
        {product.Categoría && (
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            <span className="bg-brand-green text-brand-light text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-brand-green/50 shadow-sm">
              {product.Categoría}
            </span>
          </div>
        )}        
        
        <img
          src={product.URL_Imagen || "https://via.placeholder.com/300?text=No+Image"}
          alt={product.Nombre}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">        
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-green transition-colors line-clamp-2">
          {product.Nombre}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed flex-1">
          {product.Descripción}
        </p>

        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-500">$</span>
              <span className="text-xl font-black text-slate-900">
                {formatPrice(product.Precio)}
              </span>
              <span className="text-[10px] font-bold text-slate-400">COP</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">x unidad</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-brand-teal hover:bg-[#0096C7] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-1.5 hover:shadow-level-1 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
