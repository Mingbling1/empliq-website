import Link from "next/link";
import { Wordmark } from "./Wordmark";

const NAV = [
  { href: "/buscar", label: "Buscar" },
  { href: "/compartir", label: "Compartir" },
  { href: "/manifiesto", label: "Manifiesto" },
];

export function EditorialHeader() {
  return (
    <header className="relative z-20 border-b border-rule-soft bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-5 flex items-center justify-between gap-8">
        <Wordmark className="text-[1.125rem]" />

        <nav aria-label="Principal" className="hidden md:flex items-center gap-7 text-[0.875rem] font-medium text-ink-soft">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline label-mono">Lima · 2026</span>
          <Link
            href="/login"
            className="text-[0.875rem] font-medium text-ink hover:text-vermillion transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
