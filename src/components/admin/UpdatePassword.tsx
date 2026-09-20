import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { KeyRound, ShieldAlert } from "lucide-react";

interface UpdatePasswordProps {
  username: string;
  onUpdateSuccess: () => void;
  onCancel: () => void;
}

export function UpdatePassword({ username, onUpdateSuccess, onCancel }: UpdatePasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { updatePassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const success = await updatePassword(username, password);
      
      if (success) {
        onUpdateSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error guardando la contraseña. Revisa que Google no haya bloqueado la petición (CORS).");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Actualizar Contraseña</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Por seguridad, debes actualizar tu contraseña antes de poder continuar.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nueva Contraseña
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-teal rounded-xl outline-none transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-teal rounded-xl outline-none transition-all"
                placeholder="Repite la contraseña"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full text-lg py-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Actualizando...
                </span>
              ) : (
                "Guardar Contraseña y Entrar"
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar y volver al login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
