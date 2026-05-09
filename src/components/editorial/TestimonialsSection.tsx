import { AnonymousQuote, type AnonymousQuoteData } from "./AnonymousQuote";

const TESTIMONIES: AnonymousQuoteData[] = [
  {
    handle: "ANÓNIMO 4827",
    role: "Backend Senior",
    industry: "Banca",
    city: "Lima",
    quote:
      "Me prometieron utilidades en la oferta y nunca llegaron. Confirmé con cuatro ex compañeros: la práctica era sistemática.",
    ratings: { trato: 6, salario: 7, honestidad: 4 },
    flag: "Honestidad baja",
  },
  {
    handle: "ANÓNIMO 1290",
    role: "Marketing Manager",
    industry: "Retail",
    city: "Lima",
    quote:
      "El jefe directo es de los mejores que he tenido en doce años. La estructura tóxica viene tres niveles arriba, no de él.",
    ratings: { trato: 9, salario: 7, honestidad: 8 },
  },
  {
    handle: "ANÓNIMO 0044",
    role: "Analista de Datos",
    industry: "Telecomunicaciones",
    city: "Arequipa",
    quote:
      "Buen ambiente entre pares, sueldos por debajo del mercado pero compensación con flexibilidad real. Si vienes por la plata, no.",
    ratings: { trato: 8, salario: 5, honestidad: 7 },
  },
  {
    handle: "ANÓNIMO 6109",
    role: "Product Designer",
    industry: "Fintech",
    city: "Lima",
    quote:
      "Promueven discurso de cultura horizontal pero las decisiones reales se toman entre tres personas. La transparencia es marketing interno.",
    ratings: { trato: 7, salario: 8, honestidad: 3 },
    flag: "Discurso vs práctica",
  },
];

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testim-heading" className="border-y border-rule bg-paper-deep">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-20 lg:py-28">
        <header className="grid lg:grid-cols-12 gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <p className="label-mono mb-3">04 · Voces anónimas</p>
            <h2
              id="testim-heading"
              className="headline-display text-ink text-[clamp(2rem,4vw,3.5rem)] font-light max-w-[20ch]"
            >
              <em className="italic font-normal">Lo que ganan.</em>{" "}
              <em className="italic font-normal">Lo que callan.</em>
            </h2>
          </div>
          <p className="lg:col-span-5 font-serif italic text-[1.0625rem] text-ink-soft leading-relaxed lg:pt-3 max-w-[42ch]">
            Cada testimonio firmado por un alias permanente. Verificable
            cruzando puesto, industria y rangos salariales — pero nunca
            vinculable a una persona real.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12">
          {TESTIMONIES.map((t) => (
            <AnonymousQuote key={t.handle} data={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
