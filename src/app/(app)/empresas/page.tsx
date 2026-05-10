import { Suspense } from "react"
import { CompanyList } from "./company-list"

const SITE_URL = "https://empliq.io"

export const metadata = {
  title: "Empresas en Perú — Salarios, Reseñas y Beneficios",
  description:
    "Directorio de empresas peruanas con salarios, reseñas y beneficios reportados por empleados reales. Busca por nombre, industria o RUC.",
  alternates: {
    canonical: `${SITE_URL}/empresas`,
  },
  openGraph: {
    title: "Empresas en Perú — Salarios, Reseñas y Beneficios | Empliq",
    description:
      "Directorio de empresas peruanas con salarios, reseñas y beneficios reportados por empleados reales.",
    url: `${SITE_URL}/empresas`,
    type: "website" as const,
    siteName: "Empliq",
    locale: "es_PE",
  },
}

export default function EmpresasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Directorio de Empresas — Empliq",
    description: "Directorio de empresas peruanas con información salarial y reseñas de empleados.",
    url: `${SITE_URL}/empresas`,
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

      {/* Editorial section header */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
          <p className="label-mono mb-3">A · 01 · Directorio peruano</p>
          <h1 className="headline-display text-ink text-[clamp(2rem,4vw,3.25rem)] font-light max-w-[24ch]">
            Empresas con <em className="not-italic font-normal">RUC activo</em>{" "}
            y voz documentada.
          </h1>
          <p className="font-serif italic text-ink-soft text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed mt-4 max-w-[60ch]">
            Filtra por nombre, industria o RUC. Cada perfil muestra salarios,
            beneficios y reseñas reportados por empleados reales.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        <Suspense
          fallback={
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 border border-rule-soft bg-paper-deep/50 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <CompanyList />
        </Suspense>
      </div>
    </div>
  )
}
