import { Button } from "./Button";
import { AlertCircle } from "lucide-react";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "danger";
}

interface ShowMessageConfirmProps {
  isOpen: boolean;
  options: ConfirmOptions | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ShowMessageConfirm({ isOpen, options, onConfirm, onCancel }: ShowMessageConfirmProps) {
  if (!isOpen || !options) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${options.variant === 'danger' ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-brand-teal/10 text-brand-teal border border-brand-teal/20'}`}>
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{options.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{options.message}</p>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={onCancel}
          >
            {options.cancelText || "Cancelar"}
          </Button>
          <Button 
            variant={options.variant === "danger" ? "danger" : "primary"} 
            className="flex-1" 
            onClick={onConfirm}
          >
            {options.confirmText || "Confirmar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
