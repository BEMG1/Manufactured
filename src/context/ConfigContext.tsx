import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AppConfig {
  appName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
}

interface ConfigContextType {
  config: AppConfig | null;
  loading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}config.json`);
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Failed to load config.json:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-teal rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ConfigContext.Provider value={{ config, loading: false }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfigContext() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfigContext must be used within a ConfigProvider");
  }
  return context;
}
