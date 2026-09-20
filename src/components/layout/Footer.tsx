import { useConfig } from "../../context/ConfigContext";
import { Mail, Smartphone } from "lucide-react";

export function Footer() {
  const { config } = useConfig();
  if (!config) return null;

  return (
    <footer className="bg-gray-900 text-white mt-auto py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">
              {config.companyName}
            </h3>
            <p className="text-gray-400 font-light max-w-sm leading-relaxed">
              Productos químicos de alta calidad para industria y hogar. Soluciones eco-amigables y efectivas.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 text-white">Contacto</h4>
            <div className="flex flex-col gap-3 text-gray-400">
              <a href={`mailto:${config.contactEmail}`} className="hover:text-brand-light transition-colors flex items-center gap-2">
                <Mail className="w-5 h-5" /> {config.contactEmail}
              </a>
              <a href={`https://wa.me/${config.contactPhone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-brand-light transition-colors flex items-center gap-2">
                <Smartphone className="w-5 h-5" /> {config.contactPhone}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p className="m-0">
            © {new Date().getFullYear()} {config.companyName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
