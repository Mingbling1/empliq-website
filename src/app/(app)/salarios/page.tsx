import { Suspense } from "react"
import { SalaryBrowser } from "./salary-browser"

const SITE_URL = "https://empliq.io"

export const metadata = {
  title: "Salarios en Perú por Categoría Profesional",
  description:
    "Explora salarios por categoría profesional en Perú. Datos salariales reportados por empleados reales, organizados por puesto, industria y experiencia.",
  alternates: {
    canonical: `${SITE_URL}/salarios`,
  },
  openGraph: {
    title: "Salarios en Perú por Categoría Profesional | Empliq",
    description:
      "Datos salariales de miles de empleados en Perú organizados por categoría profesional.",
    url: `${SITE_URL}/salarios`,
    type: "website" as const,
    siteName: "Empliq",
    locale: "es_PE",
  },
}

export default function SalariosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Salarios en Perú — Empliq",
    description: "Datos salariales organizados por categoría profesional en Perú.",
    url: `${SITE_URL}/salarios`,
    isPartOf: {
      "@type": "WebSite",
      name: "Empliq",
      url: SITE_URL,
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-rule">
        <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-10 lg:py-14">
          <p className="label-mono mb-3">A · 02 · Salarios reportados</p>
          <h1 className="headline-display text-ink text-[clamp(2rem,4vw,3.25rem)] font-light max-w-[24ch]">
            Cuánto pagan, <em className="not-italic font-normal">en serio.</em>
          </h1>
          <p className="font-serif italic text-ink-soft text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed mt-4 max-w-[60ch]">
            Rangos salariales por categoría profesional y puesto, reportados por
            empleados reales. Mediana, percentiles y tamaño de muestra.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-8 lg:py-12">
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 border border-rule-soft bg-paper-deep/50 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <SalaryBrowser />
        </Suspense>
      </div>
    </div>
  )
}
