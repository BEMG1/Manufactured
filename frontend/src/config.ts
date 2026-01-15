import { AppConfig } from "./types";

export const config: AppConfig = {
  appName: import.meta.env.VITE_APP_NAME || "QuimiPro",
  companyName: import.meta.env.VITE_COMPANY_NAME || "QuimiPro Solutions",
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || "contacto@quimipro.com",
  contactPhone: import.meta.env.VITE_CONTACT_PHONE || "+57 300 123 4567",
};
