import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ConfigProvider } from "./context/ConfigContext";
import { AuthContextProvider } from "./context/AuthContext";
import { MainPage } from "./pages/MainPage";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  return (
    <ConfigProvider>
      <CartProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </CartProvider>
    </ConfigProvider>
  );
}
