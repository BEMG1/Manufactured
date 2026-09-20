import { createContext, useContext, useState, ReactNode } from "react";
import bcrypt from "bcryptjs";
import { AuthProvider as AuthApi } from "../providers/AuthProvider";

interface LoginResult {
  success: boolean;
  requiresUpdate?: boolean;
  error?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, passwordPlain: string) => Promise<LoginResult>;
  updatePassword: (username: string, newPasswordPlain: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    sessionStorage.getItem("admin_token") === "authenticated"
  );

  const login = async (username: string, passwordPlain: string): Promise<LoginResult> => {
    try {
      const users = await AuthApi.getAdmins();
      const user = users.find(u => u.Usuario?.toLowerCase() === username.toLowerCase());
      
      if (!user) {
        return { success: false, error: "Usuario no encontrado" };
      }

      const isValid = await bcrypt.compare(passwordPlain, user.Contraseña);
      
      if (isValid) {
        let requiresUpdate = false;
        
        if (String(user.Estado) === "2") {
          requiresUpdate = true;
        } else if (user.Fecha) {
          const updateDate = new Date(user.Fecha);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - updateDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays >= 30) {
            requiresUpdate = true;
          }
        } else {
          requiresUpdate = true;
        }

        if (!requiresUpdate) {
          sessionStorage.setItem("admin_token", "authenticated");
          setIsAuthenticated(true);
        }
        
        return { success: true, requiresUpdate };
      }
      
      return { success: false, error: "Credenciales incorrectas" };
    } catch (error: any) {
      console.error("Error en autenticación:", error);
      throw error;
    }
  };

  const updatePassword = async (username: string, newPasswordPlain: string): Promise<boolean> => {
    try {
      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(newPasswordPlain, salt);
      
      const success = await AuthApi.postUpdatePassword(username, newHash);
      if (success) {
        sessionStorage.setItem("admin_token", "authenticated");
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error actualizando contraseña:", error);
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, updatePassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthContextProvider");
  }
  return context;
}
