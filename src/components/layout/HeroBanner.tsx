import { Search, ArrowRight } from "lucide-react";

interface HeroBannerProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onExplore?: () => void;
}

export function HeroBanner({ searchQuery = "", onSearchChange, onExplore }: HeroBannerProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#0b3b24] via-[#0d4f31] to-[#093520] text-white py-14 sm:py-20 px-4 overflow-hidden border-b border-brand-green/40">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-brand-light blur-3xl"></div>
        <div className="absolute -bottom-24 -right-20 w-96 h-96 rounded-full bg-brand-teal blur-3xl"></div>
      </div>
      
      <div className="relative max-w-5xl mx-auto z-10 text-center space-y-6">        
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-sm font-heading">
          Soluciones Sostenibles de Alto Rendimiento
        </h1>
        
        <p className="text-sm sm:text-base text-gray-200 font-normal max-w-2xl mx-auto leading-relaxed">
          Transforma la huella de tu negocio con productos sostenibles y biodegradables certificados. Selecciona y despacha tu pedido directo a WhatsApp con tarifas de fabricante.
        </p>
        
        <div className="pt-2">
          <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col sm:flex-row gap-2 items-center">
            <div className="flex items-center w-full px-3 py-1 text-gray-400">
              <Search className="w-5 h-5 mr-2.5 flex-shrink-0 text-brand-teal" />
              <input 
                type="text" 
                className="w-full bg-transparent border-0 text-sm placeholder-gray-400 focus:ring-0 p-1 text-gray-800 font-medium outline-none" 
                placeholder="¿Qué producto buscas? (ej. Vasos biodegradables...)" 
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onExplore) {
                    onExplore();
                  }
                }}
              />
            </div>
            <button 
              onClick={onExplore}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-teal hover:bg-[#028090] text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>Explorar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
