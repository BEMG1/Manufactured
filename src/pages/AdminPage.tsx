import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Login } from "../components/admin/Login";
import { Button } from "../components/ui/Button";
import { LogOut, Package, Tags, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminProducts } from "../components/admin/AdminProducts";
import { AdminCategories } from "../components/admin/AdminCategories";

type AdminView = "dashboard" | "products" | "categories";

export function AdminPage() {
  const { isAuthenticated, logout } = useAuthContext();
  const [currentView, setCurrentView] = useState<AdminView>("products");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => {}} />;
  }

  const NavItems = () => (
    <>
      <button
        onClick={() => { setCurrentView("products"); setIsMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          currentView === "products" 
            ? "bg-brand-teal text-white font-medium" 
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Package className="w-5 h-5" />
        Productos
      </button>
      <button
        onClick={() => { setCurrentView("categories"); setIsMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          currentView === "categories" 
            ? "bg-brand-teal text-white font-medium" 
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Tags className="w-5 h-5" />
        Categorías
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm group-hover:border-brand-light transition-colors">
              <img alt="Manufactured Logo" className="h-10 w-10 object-contain rounded-xl" src={`${import.meta.env.BASE_URL}images/Logo.png`} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-brand-green transition-colors leading-tight">Manufactured</span>                
              </div>
              <span className="text-[10px] font-extrabold tracking-widest text-brand-teal uppercase leading-none">ECO-FRIENDLY SOLUTIONS S.A.S</span>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 py-6 space-y-2">
          <NavItems />
        </div>
        <div className="p-4 border-t border-gray-100">
          <Button variant="danger" className="w-full justify-center" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm group-hover:border-brand-light transition-colors">
              <img alt="Manufactured Logo" className="h-10 w-10 object-contain rounded-xl" src={`${import.meta.env.BASE_URL}images/Logo.png`} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-brand-green transition-colors leading-tight">Manufactured</span>                
              </div>
              <span className="text-[10px] font-extrabold tracking-widest text-brand-teal uppercase leading-none">ECO-FRIENDLY SOLUTIONS S.A.S</span>
            </div>
          </div>
          <button 
            className="p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 space-y-2 shadow-lg">
            <NavItems />
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Button variant="danger" className="w-full justify-center" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen pt-16 md:pt-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 hidden md:flex items-center justify-between px-8 py-4 sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {currentView === "products" ? "Gestión de Productos" : "Gestión de Categorías"}
          </h2>
          <Link to="/">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Ver Tienda
            </Button>
          </Link>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {currentView === "products" && <AdminProducts />}
            {currentView === "categories" && <AdminCategories />}
          </div>
        </div>
      </main>
    </div>
  );
}
