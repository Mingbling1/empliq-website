import Link from "next/link";
import { Wordmark } from "./Wordmark";

const COLS = [
  {
    title: "Plataforma",
    items: [
      { href: "/buscar",     label: "Buscar" },
      { href: "/empresas",   label: "Directorio de empresas" },
      { href: "/salarios",   label: "Salarios por puesto" },
      { href: "/compartir",  label: "Compartir sueldo" },
    ],
  },
  {
    title: "Editorial",
    items: [
      { href: "/manifiesto", label: "Manifiesto" },
      { href: "/datos",      label: "Datos abiertos" },
      { href: "/contacto",   label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    items: [
      { href: "/anonimato",  label: "Política de anonimato" },
      { href: "/privacidad", label: "Privacidad" },
      { href: "/terminos",   label: "Términos" },
    ],
  },
];

export function EditorialFooter() {
  return (
    <footer className="bg-paper border-t border-ink">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <Wordmark className="text-[1.5rem]" href={null} />
            <p className="font-serif italic text-[1.0625rem] text-ink-soft leading-relaxed mt-5 max-w-[36ch]">
              Cada empresa peruana tiene su versión oficial. Aquí guardamos la otra.
            </p>
            <p className="label-mono mt-8">
              Hecho en Lima · Casi sin fines de lucro · Open data
            </p>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
              <p className="label-mono mb-4">{col.title}</p>
              <ul className="space-y-2.5 text-[0.9375rem] text-ink">
                {col.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="hover:text-vermillion transition-colors"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-1 flex lg:justify-end">
            <p className="label-mono">© 2026 empliq</p>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-rule flex flex-col sm:flex-row gap-3 justify-between text-[0.75rem] text-ink-muted">
          <p>
            empliq es un proyecto abierto, sin fines de lucro, financiado por aportes voluntarios
            de quienes creen en la transparencia laboral.
          </p>
          <p className="font-mono">empliq.io</p>
        </div>
      </div>
    </footer>
  );
}
