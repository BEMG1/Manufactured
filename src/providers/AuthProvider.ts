import { IAdminUser } from "../interfaces/IAdminUser";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

export class AuthProvider {
  /**
   * Obtiene la lista de administradores desde Google Sheets
   */
  static async getAdmins(): Promise<IAdminUser[]> {
    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");

    const url = `${SCRIPT_URL}?action=getAdmins`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Error de conexión al obtener credenciales.");
    }
    
    const text = await response.text();
    let users: IAdminUser[] = [];
    try {
      users = JSON.parse(text);
    } catch(e) {
      throw new Error("El endpoint de admins no devolvió un formato correcto.");
    }

    if (!Array.isArray(users)) {
       throw new Error("Respuesta inválida del servidor. Se esperaba un array.");
    }

    return users;
  }

  /**
   * Envía la nueva contraseña hasheada a Google Sheets
   */
  static async postUpdatePassword(username: string, newHash: string): Promise<boolean> {
    if (!SCRIPT_URL) throw new Error("VITE_GOOGLE_APPS_SCRIPT_URL no está configurada.");
    
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "updatePassword",
        username: username,
        newHash: newHash
      }),
    });
    
    if (!response.ok) throw new Error("Error de conexión");
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "No se pudo actualizar");
    }
    
    return true;
  }
}
