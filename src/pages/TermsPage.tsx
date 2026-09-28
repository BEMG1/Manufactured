import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-slate-800 font-sans antialiased">
      <Header onNavigate={() => navigate("/")} hideCart />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <button onClick={() => navigate("/")} className="hover:text-[#00B4D8] transition-colors focus:outline-none cursor-pointer">Inicio</button>
          <span>/</span>
          <span className="text-slate-900">Términos y Condiciones de Uso</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">Términos y Condiciones de Uso</h1>
          <p className="text-sm font-semibold text-[#00B4D8] mb-8">Última actualización: 27 de Septiembre de 2026</p>

          <div className="space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">
            <p>
              Bienvenido a <strong>Manufacturer And Marketer Of Eco-Friendly Solutions S.A.S.</strong> Al acceder, navegar y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, le sugerimos no utilizar el sitio.
            </p>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">1. Naturaleza del Sitio Web</h2>
              <p>
                El sitio web de <strong>Manufacturer And Marketer Of Eco-Friendly Solutions S.A.S.</strong> opera exclusivamente como un catálogo digital e informativo. El sitio web no procesa transacciones financieras directas, no cuenta con pasarelas de pago integradas y no realiza cobros automáticos con tarjetas de crédito o débito.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">2. Proceso de Selección, Cotización y Compra</h2>
              <ul className="list-disc pl-5 space-y-3">
                <li><strong>Cálculo preliminar en el sitio web:</strong> El carrito de compras de Manufacturer And Marketer Of Eco-Friendly Solutions S.A.S. realiza un cálculo automático y referencial del valor de los productos seleccionados. Este valor no incluye costos de envío ni comisiones asociadas a determinados métodos de pago, salvo que se indique expresamente lo contrario.</li>
                <li><strong>Cotización no vinculante:</strong> La selección de productos y la generación del resumen en el carrito no constituyen una reserva de inventario ni un contrato de venta final.</li>
                <li>
                  <strong>Confirmación y cierre vía WhatsApp:</strong> Al presionar el botón para finalizar el pedido, el sitio web redirige al usuario a una conversación directa en nuestra línea oficial de WhatsApp con el detalle de los artículos y el valor estimado. A través de este canal de mensajería se acordarán y confirmarán definitivamente:
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-slate-500">
                    <li>La disponibilidad real del inventario.</li>
                    <li>El costo del envío según la ciudad o dirección de destino.</li>
                    <li>El método de pago acordado (transferencias, pago contra entrega u otros medios disponibles).</li>
                    <li>Los tiempos estimados de despacho y entrega.</li>
                  </ul>
                </li>
                <li><strong>Perfeccionamiento de la venta:</strong> La compra se considerará formalizada únicamente cuando las partes acuerden las condiciones por WhatsApp y se valide el comprobante de pago o se confirme la orden bajo la modalidad acordada.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">3. Precios y Disponibilidad</h2>
              <p>
                Los precios y productos publicados en el sitio web pueden ser actualizados o modificados en cualquier momento sin previo aviso. En caso de presentarse algún error tipográfico, de digitación o desactualización en los precios o en el stock disponible, se le informará al usuario a través del chat de WhatsApp antes de concretar la transacción para que decida si desea continuar con el pedido.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">4. Uso de Plataformas de Terceros</h2>
              <p>
                El contacto y la coordinación final se realizan mediante la aplicación WhatsApp, propiedad de Meta Platforms, Inc. <strong>Manufacturer And Marketer Of Eco-Friendly Solutions S.A.S.</strong> no se hace responsable por fallas técnicas, caídas del servicio, suspensiones o problemas de conectividad propios de dicha plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">5. Contacto</h2>
              <p>
                Para resolver cualquier duda respecto a estos Términos y Condiciones, puede comunicarse directamente a nuestra línea de atención vía WhatsApp o al correo electrónico: <strong>manufacturer@gmail.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
