import { Button } from "./Button";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

export interface MessageOptions {
  title: string;
  message: string;
  buttonText?: string;
  variant?: "info" | "success" | "error";
}

interface ShowMessageProps {
  isOpen: boolean;
  options: MessageOptions | null;
  onClose: () => void;
}

export function ShowMessage({ isOpen, options, onClose }: ShowMessageProps) {
  if (!isOpen || !options) return null;

  const getIcon = () => {
    switch (options.variant) {
      case "success": return <CheckCircle2 className="w-8 h-8" />;
      case "error": return <AlertCircle className="w-8 h-8" />;
      default: return <Info className="w-8 h-8" />;
    }
  };

  const getStyle = () => {
    switch (options.variant) {
      case "success": return "bg-green-50 text-green-500 border border-green-100";
      case "error": return "bg-red-50 text-red-500 border border-red-100";
      default: return "bg-blue-50 text-blue-500 border border-blue-100";
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${getStyle()}`}>
            {getIcon()}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{options.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{options.message}</p>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex">
          <Button 
            variant={options.variant === "error" ? "danger" : "primary"} 
            className="flex-1" 
            onClick={onClose}
          >
            {options.buttonText || "Aceptar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
