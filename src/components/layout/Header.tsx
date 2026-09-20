import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/Button";

interface HeaderProps {
  onNavigate: (view: "list" | "cart") => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const { cartItemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-green cursor-pointer" 
          onClick={() => onNavigate("list")}
        >
          Manufactured
        </div>
        <Button onClick={() => onNavigate("cart")}>
          <ShoppingCart className="w-5 h-5" /> Carrito ({cartItemCount})
        </Button>
      </div>
    </header>
  );
}
