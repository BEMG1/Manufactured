export interface IAdminUser {
  Usuario: string;
  Contraseña: string; // Hash de bcrypt
  Estado?: string | number;
  Fecha?: string; // Formato de fecha
}
