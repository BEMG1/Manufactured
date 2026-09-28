import { Search, ArrowRight } from "lucide-react";

interface HeroBannerProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onExplore?: () => void;
}

export function HeroBanner({ searchQuery = "", onSearchChange, onExplore }: HeroBannerProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#0b3b24] via-[#0d4f31] to-[#093520] text-white py-14 sm:py-20 px-4 overflow-hidden" data-purpose="hero-section">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src={`${import.meta.env.BASE_URL}images/FondoBanner.png`} alt="Follaje botánico natural" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity filter blur-[0.5px] pointer-events-none" />
        <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-emerald-400 blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -right-20 w-96 h-96 rounded-full bg-cyan-400 blur-3xl opacity-20"></div>
        
        <svg className="absolute -left-12 top-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 text-emerald-400/15 pointer-events-none transform -rotate-12 transition-transform duration-700 hover:rotate-0" fill="currentColor" viewBox="0 0 200 200">
          <path d="M42.7,-72.2C54.8,-66.3,63.7,-53.8,70.2,-40.4C76.8,-27,81,-12.7,79.9,1.1C78.8,14.9,72.4,28.2,64.2,40.1C56,52,46,62.5,33.8,69.5C21.6,76.5,7.2,80,-7.7,81.1C-22.6,82.2,-38,80.9,-50.2,73.5C-62.4,66.1,-71.4,52.6,-76.9,38.2C-82.4,23.8,-84.4,8.5,-81.8,-5.5C-79.2,-19.5,-72,-32.2,-62.4,-42.6C-52.8,-53,-40.8,-61.1,-28.3,-66.8C-15.8,-72.5,-2.8,-75.8,11.2,-74.6C25.2,-73.4,30.6,-78.1,42.7,-72.2Z" opacity="0.2" transform="translate(100 100)"></path>
          <path d="M80,10 C120,40 140,90 110,140 C80,190 20,180 5,140 C-10,100 20,40 80,10 Z" fill="currentColor" opacity="0.35"></path>
          <path d="M10 140 Q 60 90 110 30 M 40 110 Q 75 115 105 100 M 55 85 Q 90 85 115 65 M 75 58 Q 100 55 110 40" fill="none" opacity="0.5" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5"></path>
        </svg>
        <svg className="absolute -right-16 top-6 w-80 h-80 sm:w-[26rem] sm:h-[26rem] text-cyan-300/15 pointer-events-none transform rotate-45" fill="currentColor" viewBox="0 0 200 200">
          <path d="M100,15 C150,30 185,80 165,130 C145,180 90,185 50,160 C10,135 -5,80 25,45 C55,10 70,5 100,15 Z" fill="currentColor" opacity="0.25"></path>
          <path d="M30 160 Q 95 105 155 35 M 65 130 Q 110 135 145 115 M 85 100 Q 125 100 150 75 M 110 70 Q 135 68 148 50" fill="none" opacity="0.45" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5"></path>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg className="relative block w-full h-8 sm:h-12 text-[#F8FAF8]" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>
      
      <div className="relative max-w-5xl mx-auto z-20 text-center space-y-6 pb-6">        
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-sm font-heading">
          Productos Sostenibles y de Alto Rendimiento
        </h1>
        
        <p className="text-sm sm:text-base text-emerald-100/90 font-normal max-w-2xl mx-auto leading-relaxed">
          Abastece tu negocio con soluciones de limpieza, higiene y ambientación de alta eficacia y biodegradables.
        </p>
        
        <div className="pt-2">
          <div className="w-full max-w-2xl mx-auto bg-white rounded-full shadow-lg border border-[#CBD5E1] focus-within:border-[#00B4D8] focus-within:ring-2 focus-within:ring-[#00B4D8] focus-within:ring-offset-0 p-1.5 flex flex-col sm:flex-row gap-2 items-center transition-all">
            <div className="flex items-center w-full px-4 py-1.5 text-slate-400">
              <Search className="w-5 h-5 mr-3 flex-shrink-0 text-[#00B4D8]" />
              <input 
                type="text" 
                className="w-full bg-transparent border-0 text-sm placeholder-slate-400 focus:ring-0 p-1 text-slate-800 font-medium outline-none" 
                placeholder="¿Qué producto buscas? (ej. Jabón, ambientador...)" 
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
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#00B4D8] hover:bg-[#0096C7] hover:scale-[0.98] text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 flex-shrink-0"
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
