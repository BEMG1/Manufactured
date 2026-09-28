import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-800 font-sans antialiased">
      <Header onNavigate={() => navigate("/")} hideCart />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <button onClick={() => navigate("/")} className="hover:text-[#00B4D8] transition-colors focus:outline-none cursor-pointer">Inicio</button>
          <span>/</span>
          <span className="text-slate-900">Política de Privacidad y Tratamiento de Datos</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">Política de Privacidad y Tratamiento de Datos</h1>
          <p className="text-sm font-semibold text-[#00B4D8] mb-8">Última actualización: 27 de Septiembre de 2026</p>

          <div className="space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">
            <p>
              En <strong>Manufacturer And Marketer Of Eco-Friendly Solutions S.A.S.</strong> valoramos y respetamos su privacidad. Esta política describe cómo se maneja la información cuando navega en nuestro sitio web y cuando se comunica con nosotros a través de canales de mensajería.
            </p>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">1. Responsable del Tratamiento</h2>
              <p>
                El responsable del tratamiento de los datos personales suministrados es <strong>Manufacturer And Marketer Of Eco-Friendly Solutions S.A.S.</strong>, con domicilio en Colombia, canal de atención en WhatsApp y correo electrónico: <strong>manufacturer@gmail.com</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">2. Información Recopilada en el Sitio Web</h2>
              <ul className="list-disc pl-5 space-y-3">
                <li><strong>Navegación general:</strong> No exigimos registro previo de cuentas, contraseñas ni almacenamiento de perfiles de usuario para explorar el catálogo.</li>
                <li><strong>Funcionamiento del carrito:</strong> El sitio web utiliza almacenamiento local temporal en el navegador del usuario para recordar los productos añadidos mientras navega. El sitio web no almacena números de tarjetas de crédito, cuentas bancarias ni credenciales financieras.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">3. Datos Suministrados vía WhatsApp y Finalidad del Tratamiento</h2>
              <p className="mb-4">
                Al pulsar el enlace para cotizar o confirmar su pedido por WhatsApp, el usuario inicia contacto voluntario y nos suministra su número de teléfono. Para efectos de entrega y facturación, se le podrán solicitar datos adicionales como: nombre completo, documento de identidad (si aplica para facturación) y dirección física de entrega.
              </p>
              <p className="mb-2 font-medium text-slate-700">Estos datos se utilizan estrictamente para:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Atender la solicitud, validar disponibilidad y concretar la cotización.</li>
                <li>Gestionar la entrega del pedido con las empresas transportadoras o de mensajería.</li>
                <li>Emitir los comprobantes de compra o facturas correspondientes.</li>
                <li>Atender solicitudes de garantía, cambios o soporte posventa.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">4. Almacenamiento y Seguridad de la Información</h2>
              <p>
                Los datos de contacto y pedidos se conservan en nuestros registros operativos y de atención únicamente durante el tiempo necesario para cumplir con la entrega del producto y con las obligaciones legales y contables aplicables. No vendemos, alquilamos ni transferimos sus datos personales a terceros con fines publicitarios ajenos a nuestro negocio.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">5. Derechos del Titular y Eliminación de Datos</h2>
              <p>
                El titular de los datos tiene derecho a conocer, actualizar, rectificar y solicitar la eliminación de su información personal de nuestros registros en cualquier momento. Para ejercer estos derechos, basta con enviar un mensaje solicitándolo a nuestra línea oficial de WhatsApp o escribir a nuestro correo <strong>manufacturer@gmail.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
