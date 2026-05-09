const STEPS = [
  {
    n: "01",
    title: "Buscas la empresa",
    body: "85,000 empresas peruanas con RUC activo. Filtra por industria, tamaño, ciudad o puesto. Sin paywall.",
  },
  {
    n: "02",
    title: "Lees lo que otros vivieron",
    body: "Sueldos reales por puesto y antigüedad. Reseñas honestas sobre trato, cultura y procesos de entrevista. Cada testimonio firmado por un alias anónimo permanente.",
  },
  {
    n: "03",
    title: "Compartes tu experiencia",
    body: "Login con Google solo para reducir bots. Tu identidad jamás se publica. Lo que dejas se suma al banco común y ayuda al próximo postulante.",
  },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="bg-paper">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <header className="lg:col-span-4">
            <p className="label-mono mb-3">03 · Cómo funciona</p>
            <h2
              id="how-heading"
              className="headline-display text-ink text-[clamp(2rem,4vw,3.5rem)] font-light"
            >
              Tres movimientos. <em className="italic font-normal">Cero exposición.</em>
            </h2>
            <p className="font-serif text-[1.0625rem] text-ink-soft leading-relaxed mt-6 max-w-[36ch]">
              empliq no vende currículums ni pasa tus datos a empresas. La
              plataforma vive de aportes de la comunidad, no de pauta corporativa.
            </p>
          </header>

          <ol className="lg:col-span-8 space-y-10 lg:space-y-12">
            {STEPS.map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 lg:gap-10 border-t border-rule pt-8 lg:pt-10 first:border-t-0 first:pt-0">
                <span className="font-mono text-[0.875rem] text-vermillion tracking-widest pt-1">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.375rem,2vw,1.875rem)] font-normal text-ink leading-tight">
                    {s.title}
                  </h3>
                  <p className="font-serif text-[1.0625rem] text-ink-soft leading-relaxed mt-3 max-w-[55ch]">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
