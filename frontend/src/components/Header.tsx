import { config } from "../config";

export function Header() {
  return (
    <header className="header">
      <div className="header-content container">
        <div className="logo">{config.appName}</div>
        <nav className="nav">
          <a href="#productos" className="nav-link">
            Productos
          </a>
          <a href="#contacto" className="nav-link">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
