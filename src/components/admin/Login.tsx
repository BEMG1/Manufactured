import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { Lock, User } from "lucide-react";
import { UpdatePassword } from "./UpdatePassword";

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor, ingresa usuario y contraseña.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const result = await login(username, password);
      
      if (result.success) {
        if (result.requiresUpdate) {
          setNeedsUpdate(true);
        } else {
          onLoginSuccess();
        }
      } else {
        setError(result.error || "Credenciales incorrectas.");
      }
    } catch (err: any) {
      setError(err.message || "Error al intentar iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  if (needsUpdate) {
    return (
      <UpdatePassword 
        username={username} 
        onUpdateSuccess={onLoginSuccess}
        onCancel={() => {
          setNeedsUpdate(false);
          setPassword("");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-teal/10 text-brand-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Acceso Privado</h2>
          <p className="text-gray-500 mt-2">Ingresa tus credenciales de administrador</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none transition-colors peer-focus:text-brand-teal" />
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              className="peer w-full pl-12 pr-4 pt-6 pb-2 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-teal rounded-xl outline-none transition-all"                
            />
            <label
              htmlFor="username"
              className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-12 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-brand-teal peer-focus:font-bold cursor-text pointer-events-none"
            >
              Usuario
            </label>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10 pointer-events-none transition-colors peer-focus:text-brand-teal" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full pl-12 pr-4 pt-6 pb-2 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-teal rounded-xl outline-none transition-all"                
            />
            <label
              htmlFor="password"
              className="absolute text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-12 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-brand-teal peer-focus:font-bold cursor-text pointer-events-none"
            >
              Contraseña
            </label>
          </div>

          <Button
            type="submit"
            className="w-full text-lg py-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Validando...
              </span>
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
