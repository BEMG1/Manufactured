import { config } from "../config";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-text)",
        color: "white",
        padding: "var(--space-3xl) 0",
        marginTop: "var(--space-3xl)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "var(--space-2xl)",
            marginBottom: "var(--space-2xl)",
          }}
        >
          <div>
            <h3 style={{ color: "white", marginBottom: "var(--space-lg)" }}>
              {config.companyName}
            </h3>
            <p style={{ opacity: 0.8 }}>
              Productos químicos de alta calidad para industria y hogar.
            </p>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "var(--space-md)" }}>
              Contacto
            </h4>
            <p style={{ opacity: 0.8, marginBottom: "var(--space-sm)" }}>
              📧 {config.contactEmail}
            </p>
            <p style={{ opacity: 0.8 }}>📱 {config.contactPhone}</p>
          </div>

        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "var(--space-xl)",
            textAlign: "center",
            opacity: 0.6,
          }}
        >
          <p style={{ marginBottom: 0 }}>
            © {new Date().getFullYear()} {config.companyName}. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
