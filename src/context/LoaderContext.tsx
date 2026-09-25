import { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
  isGlobalLoading: boolean;
  showLoader: (text?: string) => void;
  hideLoader: () => void;
  loaderText: string;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("Cargando...");

  const showLoader = (text = "Cargando...") => {
    setLoaderText(text);
    setIsGlobalLoading(true);
  };

  const hideLoader = () => {
    setIsGlobalLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ isGlobalLoading, showLoader, hideLoader, loaderText }}>
      {children}
      {isGlobalLoading && (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-200">
          <div className="w-12 h-12 border-4 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin mb-4" />
          <p className="text-gray-700 font-bold text-lg animate-pulse">{loaderText}</p>
        </div>
      )}
    </LoaderContext.Provider>
  );
}

export function useLoaderContext() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoaderContext must be used within a LoaderProvider");
  }
  return context;
}
