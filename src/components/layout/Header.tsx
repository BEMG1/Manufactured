import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../../context/CartContext";

interface HeaderProps {
  onNavigate: (view: "list" | "cart") => void;
  hideCart?: boolean;
}

export function Header({ onNavigate, hideCart = false }: HeaderProps) {
  const { cartItemCount } = useCartContext();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-3 group flex-shrink-0 text-left bg-transparent border-none p-0 cursor-pointer" 
              title="Manufactured Eco-Friendly Solutions" 
              onClick={() => onNavigate("list")}
            >
              <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm group-hover:border-brand-light transition-colors">
                <img alt="Manufactured Logo" className="h-10 w-10 object-contain rounded-xl" src={`${import.meta.env.BASE_URL}images/Logo.png`} />
              </div>
              <div className="flex flex-col items-start justify-center pt-1">
                <div className="flex flex-col items-start text-[13px] sm:text-[15px] font-medium tracking-widest text-slate-900 uppercase leading-tight">
                  <span>Manufacturer And</span>
                  <span>Marketer Of</span>
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-brand-teal uppercase leading-none mt-1">ECO-FRIENDLY SOLUTIONS S.A.S</span>
              </div>
            </button>
          </div>
          {!hideCart && (
            <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              <button 
                onClick={() => onNavigate("cart")} 
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-green hover:bg-[#0b3d1c] text-white font-bold text-xs tracking-tight shadow-md transition-all duration-200 focus:outline-none border border-brand-green/50 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 text-brand-teal" />
                <span className="hidden sm:inline text-slate-200">Carrito</span>
                <span className="px-2 py-0.5 rounded-full bg-brand-teal text-white text-[10px] font-extrabold">{cartItemCount}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
