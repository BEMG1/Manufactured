import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ProductList } from "../components/product/ProductList";
import { ProductDetail } from "../components/product/ProductDetail";
import { CartView } from "../components/cart/CartView";

export type View = "list" | "detail" | "cart";

export function MainPage() {
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    handleNavigate("detail");
  };

  const handleBackToList = () => {
    setSelectedProductId("");
    handleNavigate("list");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Header onNavigate={handleNavigate} />

      <main className="flex-1 pb-10">
        {currentView === "list" && (
          <ProductList onProductClick={handleProductClick} />
        )}

        {currentView === "detail" && selectedProductId && (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBackToList}
          />
        )}

        {currentView === "cart" && (
          <CartView onBack={handleBackToList} />
        )}
      </main>

      <Footer />
    </div>
  );
}
