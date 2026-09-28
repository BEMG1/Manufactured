import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ConfigProvider } from "./context/ConfigContext";
import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";
import { CategoryContextProvider } from "./context/CategoryContext";
import { LoaderProvider } from "./context/LoaderContext";
import { MainPage } from "./pages/MainPage";
import { AdminPage } from "./pages/AdminPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";

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
                      <Route path="/terminos" element={<TermsPage />} />
                      <Route path="/privacidad" element={<PrivacyPage />} />
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
