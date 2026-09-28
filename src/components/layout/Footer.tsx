import { Link } from "react-router-dom";
import { useConfigContext } from "../../context/ConfigContext";
import { Mail, Smartphone } from "lucide-react";

export function Footer() {
  const { config } = useConfigContext();
  if (!config) return null;

  return (
    <footer className="bg-[#0a1820] text-slate-300 pt-12 pb-10 px-4 sm:px-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
                <img alt="Manufactured Logo" className="h-full w-full object-contain rounded-lg" src={`${import.meta.env.BASE_URL}images/Logo.png`} />
              </div>
              <div>
                <div className="flex flex-col items-start text-[13px] sm:text-[15px] font-medium tracking-widest text-white uppercase leading-tight">
                  <span>Manufacturer And</span>
                  <span>Marketer Of</span>
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-brand-teal uppercase leading-none mt-1 block">ECO-FRIENDLY SOLUTIONS S.A.S</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">Líderes en productos biodegradables y soluciones de limpieza amigables con el medio ambiente en Colombia. Impulsamos la transición hacia una economía verdaderamente circular.</p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <p><strong className="text-slate-300">Razón Social:</strong> MANUFACTURER AND MARKETER OF ECO-FRIENDLY SOLUTIONS S.A.S</p>
              <p><strong className="text-slate-300">NIT:</strong> 901.554.892-1 · Registro Mercantil Colombia</p>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Contacto Directo</h5>
            <div className="space-y-2 text-xs text-slate-400">
              <a className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-light flex-shrink-0" />
                <span>manufacturer@gmail.com</span>
              </a>
              <a href={`https://wa.me/${config.contactPhone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Smartphone className="w-4 h-4 text-brand-light flex-shrink-0" />
                <span>{config.contactPhone} (WhatsApp Directo)</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Manufacturer And Marketer Of Eco-Friendly Solutions S.A.S.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-brand-light font-semibold block sm:inline">Fabricado con orgullo para Colombia</span>
          </div>
          <div className="flex items-center gap-6">
            <Link className="hover:text-slate-400 transition-colors" to="/privacidad" onClick={() => window.scrollTo(0, 0)}>Política de Privacidad</Link>
            <Link className="hover:text-slate-400 transition-colors" to="/terminos" onClick={() => window.scrollTo(0, 0)}>Términos y Condiciones de Uso</Link>
            <a className="hover:text-brand-light transition-colors inline-flex items-center gap-1 font-semibold" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Volver arriba ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
