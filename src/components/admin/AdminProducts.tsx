import { useState, useEffect, useRef } from "react";
import { ProductProvider } from "../../providers/ProductProvider";
import { CategoryProvider } from "../../providers/CategoryProvider";
import { IProduct } from "../../interfaces/IProduct";
import { ICategory } from "../../interfaces/ICategory";
import { Button } from "../ui/Button";
import { Edit2, Search, Plus, Package, X, Upload } from "lucide-react";

export function AdminProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [nombre, setNombre] = useState("");
  const [desc, setDesc] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [currentImage, setCurrentImage] = useState(""); 
  const [imageBase64, setImageBase64] = useState(""); 
  const [imagePreview, setImagePreview] = useState(""); 
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [prodData, catData] = await Promise.all([
        ProductProvider.getProducts(),
        CategoryProvider.getCategories()
      ]);
      setProducts(prodData);
      setCategories(catData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setNombre("");
    setDesc("");
    setCategoria(categories.length > 0 ? categories[0].name : "");
    setPrecio("");
    setCurrentImage("");
    setImageBase64("");
    setImagePreview("");
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (product: IProduct) => {
    setIsEditing(true);
    setEditingId(String(product.ID || (product as any).Id));
    setNombre(product.Nombre);
    setDesc(product.Descripción);
    setCategoria(product.Categoría);
    setPrecio(product.Precio);
    setCurrentImage(product.URL_Imagen || "");
    setImageBase64("");
    setImagePreview(product.URL_Imagen || "");
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Crear preview local rápido
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    // Convertir a Base64 para el backend
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !categoria || precio === "") {
      setError("Nombre, Categoría y Precio son obligatorios.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      if (isEditing && editingId) {
        await ProductProvider.updateProduct(
          editingId,
          nombre,
          desc,
          categoria,
          Number(precio),
          currentImage,
          imageBase64 || undefined
        );
      } else {
        await ProductProvider.createProduct(
          nombre,
          desc,
          categoria,
          Number(precio),
          imageBase64 || undefined
        );
      }

      await loadData();
      closeModal();
    } catch (err: any) {
      setError(err.message || "Error al guardar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.Nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.Categoría?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 relative">
      
      {/* Header and Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-400" />
            Inventario de Productos
          </h3>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar producto..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-teal outline-none transition-all text-sm"
              />
            </div>
            
            <div className="relative group">
              <button 
                onClick={openCreateModal}
                className="p-2 bg-brand-teal text-white rounded-full hover:bg-brand-teal/90 transition-colors shadow-sm flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>
              <div className="absolute -top-10 right-0 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Agregar Producto
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium w-20">Imagen</th>
                <th className="px-6 py-4 font-medium">Nombre</th>
                <th className="px-6 py-4 font-medium">Categoría</th>
                <th className="px-6 py-4 font-medium">Precio</th>
                <th className="px-6 py-4 font-medium text-center w-24">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <div className="w-6 h-6 border-2 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin mx-auto mb-2" />
                    Cargando productos...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={String(product.ID || (product as any).Id)} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        {product.URL_Imagen ? (
                          <img 
                            src={product.URL_Imagen} 
                            alt={product.Nombre} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <span className="text-gray-400 text-xs text-center leading-tight">Sin img</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-900">{product.Nombre}</td>
                    <td className="px-6 py-3">
                      <span className="px-3 py-1 bg-brand-teal/10 text-brand-teal text-xs rounded-full font-medium">
                        {product.Categoría}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      $ {Number(product.Precio).toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="p-2 text-gray-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors"
                        title="Editar producto"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative my-8">
            
            {/* Overlay de carga interno */}
            {isSubmitting && (
              <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin mb-4" />
                <p className="text-gray-700 font-medium text-sm animate-pulse">Guardando producto e imagen...</p>
                <p className="text-gray-400 text-xs mt-2">Esto puede tomar unos segundos.</p>
              </div>
            )}

            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-20">
              <h3 className="text-lg font-bold text-gray-900">
                {isEditing ? "Editar Producto" : "Nuevo Producto"}
              </h3>
              <button 
                onClick={closeModal}
                disabled={isSubmitting}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm relative z-20">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Imagen */}
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="w-32 h-32 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <Upload className="w-8 h-8 mb-1" />
                        <span className="text-xs">Sin imagen</span>
                      </div>
                    )}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium"
                    >
                      Cambiar
                    </button>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden" 
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                  >
                    Seleccionar Imagen
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input 
                      type="text" 
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-teal outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Ej. Limpiador Multiusos"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea 
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      disabled={isSubmitting}
                      rows={2}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-teal outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Características del producto..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-teal outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Selecciona una...</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value ? Number(e.target.value) : "")}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-teal outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="outline" className="w-full" onClick={closeModal} disabled={isSubmitting}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    Guardar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
