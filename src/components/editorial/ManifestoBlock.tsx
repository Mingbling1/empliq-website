import Link from "next/link";

export function ManifestoBlock() {
  return (
    <section aria-labelledby="manifesto-heading" className="bg-ink text-paper">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <header className="lg:col-span-4">
            <p className="label-mono text-paper/60 mb-3">06 · Manifiesto</p>
            <h2
              id="manifesto-heading"
              className="headline-display text-paper text-[clamp(2rem,4vw,3.5rem)] font-light"
            >
              Por qué <em className="italic font-normal">existimos.</em>
            </h2>
          </header>

          <div className="lg:col-span-8 space-y-8">
            <p className="font-serif text-[clamp(1.125rem,1.5vw,1.375rem)] leading-relaxed text-paper/85">
              En Perú, hablar de sueldo es tabú. Las empresas conocen el mercado.
              Los trabajadores no. La asimetría dura mientras la información dure
              encerrada en cada conversación de pasillo.
            </p>
            <p className="font-serif text-[clamp(1.125rem,1.5vw,1.375rem)] leading-relaxed text-paper/85">
              empliq invierte la asimetría sin obligar a nadie a romper el tabú.
              El dato circula. La persona queda protegida. Casi sin fines de
              lucro, sostenida por aportes de la comunidad.
            </p>
            <p className="font-serif italic text-[clamp(1.25rem,1.8vw,1.625rem)] leading-snug text-paper">
              Si todos sabemos lo que se paga, todos podemos negociar mejor. Si
              todos sabemos cómo se trata, nadie firma a ciegas.
            </p>

            <div className="pt-8 mt-8 border-t border-paper/15 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <Link
                href="/manifiesto"
                className="font-display italic text-[1.125rem] text-paper border-b border-paper/40 hover:border-vermillion hover:text-vermillion transition-colors w-fit"
              >
                Leer el manifiesto completo →
              </Link>
              <Link
                href="/compartir"
                className="inline-flex items-center justify-center bg-vermillion hover:bg-vermillion-deep text-paper px-6 py-3 font-medium text-[0.9375rem] tracking-tight transition-colors w-fit"
              >
                Compartir mi experiencia
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
