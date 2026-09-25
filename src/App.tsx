import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ConfigProvider } from "./context/ConfigContext";
import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";
import { CategoryContextProvider } from "./context/CategoryContext";
import { LoaderProvider } from "./context/LoaderContext";
import { MainPage } from "./pages/MainPage";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  return (
    <ConfigProvider>
        <LoaderProvider>
          <CategoryContextProvider>
            <DataContextProvider>
              <CartProvider>
                <AuthContextProvider>
                  <Router>
                    <Routes>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                  </Router>
                </AuthContextProvider>
              </CartProvider>
            </DataContextProvider>
          </CategoryContextProvider>
        </LoaderProvider>
    </ConfigProvider>
  );
}
