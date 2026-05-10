import type { Metadata } from "next";
import { Suspense } from "react";
import { EditorialHeader } from "@/components/editorial/EditorialHeader";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";
import { BuscarResults } from "./buscar-results";

export const metadata: Metadata = {
  title: "Buscar — Empresas, salarios y guías",
  description:
    "Busca empresas peruanas, puestos, categorías salariales o información legal de empliq.",
};

interface BuscarPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BuscarPage({ searchParams }: BuscarPageProps) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <EditorialHeader overHero={false} />
      <main className="flex-1 pt-24 lg:pt-28">
        <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-8 lg:py-12">
          <header className="border-b border-rule pb-6 mb-8">
            <p className="label-mono mb-2">Búsqueda · empliq</p>
            <h1 className="font-display italic text-[clamp(2rem,4vw,3rem)] leading-tight text-ink">
              {q ? (
                <>
                  Resultados para <span className="not-italic font-light">“{q}”</span>
                </>
              ) : (
                "¿Qué buscas hoy?"
              )}
            </h1>
            <p className="font-serif text-ink-soft text-[1.05rem] mt-3 max-w-[58ch]">
              Empresas, puestos y guías legales — todo lo que la comunidad
              peruana ya documentó.
            </p>
          </header>

          <Suspense
            fallback={
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 rounded-md border border-rule-soft bg-paper-deep/40 animate-pulse"
                  />
                ))}
              </div>
            }
          >
            <BuscarResults q={q} />
          </Suspense>
        </div>
      </main>
      <EditorialFooter />
    </div>
  );
}
