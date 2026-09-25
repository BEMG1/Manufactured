import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { IProduct } from "../interfaces/IProduct";
import { useConfigContext } from "./ConfigContext";

export interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartTotal: number;
  cartItemCount: number;
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, delta: number) => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { config } = useConfigContext();
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: IProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.ID === product.ID);
      if (existing) {
        return prev.map((item) =>
          item.product.ID === product.ID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prev) => prev.filter((item) => item.product.ID !== productId));
  };

  const updateQuantity = (productId: string | number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.ID === productId) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: newQ > 0 ? newQ : 1 };
        }
        return item;
      })
    );
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.Precio * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const checkout = () => {
    if (cart.length === 0 || !config) return;

    let text = "Hola, me gustaría realizar el siguiente pedido:\n\n";
    cart.forEach((item) => {
      text += `- ${item.quantity}x ${item.product.Nombre} ($${item.product.Precio * item.quantity})\n`;
    });
    text += `\n*Total estimado:* $${cartTotal}\n\nQuedo atento(a).`;

    const encodedText = encodeURIComponent(text);
    // Remove all spaces and special chars from contact phone
    const cleanPhone = config.contactPhone.replace(/\s+/g, "").replace("+", "");
    const url = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(url, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        cartItemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
