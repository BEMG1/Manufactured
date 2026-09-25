import { useState } from "react";
import { CategoryProvider } from "../../providers/CategoryProvider";
import { ICategory } from "../../interfaces/ICategory";
import { Button } from "../ui/Button";
import { Plus, Tag, Edit2, X, Trash2 } from "lucide-react";
import { useCategoryContext } from "../../context/CategoryContext";

import { ShowMessageConfirm } from "../ui/ShowMessageConfirm";
import { ShowMessage } from "../ui/ShowMessage";

export function AdminCategories() {
  const { categories, isLoadingCategories, refreshCategories, deleteCategory } = useCategoryContext();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Confirm and Message State
  const [deleteConfirm, setDeleteConfirm] = useState<{isOpen: boolean, id: string, name: string} | null>(null);
  const [message, setMessage] = useState<{isOpen: boolean, title: string, text: string, variant: "error"|"success"|"info"} | null>(null);
  
  // Form state
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setCatName("");
    setCatDesc("");
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (cat: ICategory) => {
    setIsEditing(true);
    setEditingId(cat.id);
    setCatName(cat.name);
    setCatDesc(cat.description);
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteConfirm({ isOpen: true, id, name });
  };

  const executeDelete = async () => {
    if (!deleteConfirm) return;
    const idToDelete = deleteConfirm.id;
    setDeleteConfirm(null); // Cerrar el modal inmediatamente
    
    try {
      await deleteCategory(idToDelete);
    } catch (err: any) {
      setMessage({ isOpen: true, title: "Error", text: err.message || "Error al eliminar", variant: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName) {
      setError("El nombre es obligatorio");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError("");
      
      if (isEditing && editingId) {
        await CategoryProvider.updateCategory(editingId, catName, catDesc);
      } else {
        await CategoryProvider.createCategory(catName, catDesc);
      }
      
      await refreshCategories();
      closeModal();
    } catch (err: any) {
      setError(err.message || "Error al guardar la categoría");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 relative">
      
      {/* Header and Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-400" />
            Categorías Registradas
          </h3>
          <div className="relative group">
            <button 
              onClick={openCreateModal}
              className="p-2 bg-brand-teal text-white rounded-full hover:bg-brand-teal/90 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
            </button>
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              Agregar Categoría
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Nombre</th>
                <th className="px-6 py-4 font-medium">Descripción</th>
                <th className="px-6 py-4 font-medium text-center w-24">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoadingCategories ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Cargando categorías...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No hay categorías registradas. Presiona el botón + para crear una.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{cat.description || <span className="text-gray-300 italic">Sin descripción</span>}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button 
                          onClick={() => openEditModal(cat)}
                          className="p-2 text-gray-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors"
                          title="Editar categoría"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar categoría"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative">
            
            {/* Overlay de carga interno */}
            {isSubmitting && (
              <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin mb-4" />
                <p className="text-gray-700 font-medium text-sm animate-pulse">Guardando cambios...</p>
              </div>
            )}

            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                {isEditing ? "Editar Categoría" : "Nueva Categoría"}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input 
                    type="text" 
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-teal outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Ej. Químicos Industriales"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea 
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    disabled={isSubmitting}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-brand-teal outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Opcional..."
                  />
                </div>
                
                <div className="pt-2 flex gap-3">
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
      
      {/* Confirmación y Mensajes */}
      <ShowMessageConfirm 
        isOpen={deleteConfirm?.isOpen || false}
        options={{
          title: "Eliminar Categoría",
          message: `¿Estás seguro de que deseas eliminar "${deleteConfirm?.name}"? Esta acción no se puede deshacer.`,
          confirmText: "Eliminar",
          cancelText: "Cancelar",
          variant: "danger"
        }}
        onConfirm={executeDelete}
        onCancel={() => setDeleteConfirm(null)}
      />

      <ShowMessage 
        isOpen={message?.isOpen || false}
        options={{
          title: message?.title || "",
          message: message?.text || "",
          variant: message?.variant
        }}
        onClose={() => setMessage(null)}
      />

    </div>
  );
}
