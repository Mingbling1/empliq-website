import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditorialHeader } from "./EditorialHeader";
import { EditorialFooter } from "./EditorialFooter";

interface LegalDocumentProps {
  /** Folio editorial (eg. "L · 01") */
  folio: string;
  /** Subtítulo monoespaciado bajo el folio */
  eyebrow: string;
  /** Título principal del documento */
  title: string;
  /** Frase de apoyo en serif, opcional */
  lede?: string;
  /** ISO date para mostrar última actualización */
  updatedAt?: string;
  children: React.ReactNode;
}

export function LegalDocument({
  folio,
  eyebrow,
  title,
  lede,
  updatedAt,
  children,
}: LegalDocumentProps) {
  const date = updatedAt ? new Date(updatedAt) : new Date();
  const dateLabel = date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <EditorialHeader overHero={false} />
      <main className="flex-1 pt-24 lg:pt-28">
        {/* Cabecera del documento */}
        <header className="border-b border-rule">
          <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-10 lg:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 label-mono hover:text-ink transition-colors"
            >
              <ArrowLeft className="size-3" />
              Volver al inicio
            </Link>

            <div className="mt-8 lg:mt-12 grid lg:grid-cols-12 gap-6 lg:gap-10 items-end">
              <div className="lg:col-span-9">
                <p className="label-mono mb-3">
                  {folio} · {eyebrow}
                </p>
                <h1 className="headline-display text-ink text-[clamp(2.25rem,5vw,4rem)] font-light max-w-[22ch]">
                  {title}
                </h1>
                {lede && (
                  <p className="font-serif italic text-ink-soft text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed mt-5 max-w-[60ch]">
                    {lede}
                  </p>
                )}
              </div>
              <div className="lg:col-span-3 lg:text-right">
                <p className="label-mono">Última actualización</p>
                <time
                  dateTime={date.toISOString()}
                  className="font-mono text-sm text-ink mt-1 inline-block"
                >
                  {dateLabel}
                </time>
              </div>
            </div>
          </div>
        </header>

        {/* Cuerpo del documento — columna editorial */}
        <article className="mx-auto max-w-[44rem] px-6 lg:px-0 py-12 lg:py-20 legal-prose">
          {children}
        </article>
      </main>
      <EditorialFooter />
    </div>
  );
}
