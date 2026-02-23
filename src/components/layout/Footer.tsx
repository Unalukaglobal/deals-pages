import Link from "next/link";

const footerLinks = [
  {
    title: "Categorias",
    links: [
      { label: "Tecnologia", href: "/deals?cat=tecnologia" },
      { label: "Gaming", href: "/deals?cat=gaming" },
      { label: "Audio", href: "/deals?cat=audio" },
      { label: "Deportes", href: "/deals?cat=deportes" },
    ],
  },
  {
    title: "Unaluka",
    links: [
      { label: "Todos los Deals", href: "/deals" },
      { label: "Unaluka.com", href: "https://unaluka.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-lg font-bold text-foreground">Unaluka Deals</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Las mejores ofertas curadas de internet, enviadas directamente a tu pantalla.
              Precios en soles peruanos con envio a Peru.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclosure */}
        <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground">
            <strong>Aviso:</strong> Los precios y disponibilidad de los productos pueden cambiar.
            Unaluka Deals muestra ofertas curadas y puede ganar una comision por compras
            realizadas a traves de nuestros enlaces. Los precios mostrados estan en Soles
            Peruanos (PEN) e incluyen costos de importacion.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Unaluka Deals. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
