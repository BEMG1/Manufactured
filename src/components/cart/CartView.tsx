import { useCartContext } from "../../context/CartContext";
import { ArrowLeft, X, MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";

interface CartViewProps {
  onBack: () => void;
}

export function CartView({ onBack }: CartViewProps) {
  const { cart, cartTotal, updateQuantity, removeFromCart, checkout } = useCartContext();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-[fadeIn_0.3s_ease-out]">
      <Button 
        variant="outline"
        className="mb-8"
        onClick={onBack}
      >
        <ArrowLeft className="w-5 h-5" /> Seguir Comprando
      </Button>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Tu Carrito de Compras</h2>
      
      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Tu carrito está vacío.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <ul className="divide-y divide-gray-100">
            {cart.map((item) => (
              <li key={item.product.ID} className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.product.URL_Imagen || "https://via.placeholder.com/80"} 
                    alt={item.product.Nombre} 
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-xl shadow-sm" 
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 m-0">{item.product.Nombre}</h4>
                    <span className="text-gray-500">${item.product.Precio.toLocaleString()} c/u</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item.product.ID, -1)} 
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all font-bold"
                    >
                      -
                    </button>
                    <span className="w-4 text-center font-semibold text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.ID, 1)} 
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-lg text-gray-900 min-w-[100px] text-right">
                    ${(item.product.Precio * item.quantity).toLocaleString()}
                  </span>
                  <Button
                    variant="danger"
                    size="icon"
                    className="w-8 h-8 rounded-lg"
                    onClick={() => removeFromCart(item.product.ID)} 
                    title="Eliminar"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl">
              <span className="text-gray-500">Total a pagar:</span>
              <span className="font-extrabold text-3xl text-brand-green ml-3">${cartTotal.toLocaleString()}</span>
            </div>
            <Button 
              size="lg"
              className="w-full md:w-auto" 
              onClick={checkout}
            >
              <span>Enviar Pedido por WhatsApp</span>
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
