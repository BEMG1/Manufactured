import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProductList } from "./components/ProductList";
import { ProductDetail } from "./components/ProductDetail";

type View = "list" | "detail";

function App() {
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedProductId("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        {currentView === "list" && (
          <ProductList onProductClick={handleProductClick} />
        )}

        {currentView === "detail" && selectedProductId && (
          <ProductDetail
            productId={selectedProductId}
            onBack={handleBackToList}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
