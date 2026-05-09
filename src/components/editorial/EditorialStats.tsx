interface EditorialStatsProps {
  companies: number;
  salaries: number;
  reviews: number;
  benefits: number;
  updatedAt: string;
}

const ITEMS = [
  { key: "companies", label: "Empresas peruanas indexadas", note: "RUC activo · scrapeo SUNAT" },
  { key: "salaries",  label: "Sueldos compartidos",         note: "Verificados por la comunidad" },
  { key: "reviews",   label: "Reseñas anónimas",            note: "Trato · cultura · honestidad" },
  { key: "benefits",  label: "Beneficios reportados",       note: "Lo que ofrecen y lo que esconden" },
] as const;

export function EditorialStats({ companies, salaries, reviews, benefits, updatedAt }: EditorialStatsProps) {
  const values: Record<string, number> = { companies, salaries, reviews, benefits };
  return (
    <section aria-labelledby="stats-heading" className="border-y border-rule bg-paper">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mb-8 lg:mb-12">
          <div className="max-w-[40rem]">
            <p className="label-mono mb-2">02 · La plataforma en números</p>
            <h2 id="stats-heading" className="font-display italic text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
              Lo que la comunidad ya destapó.
            </h2>
          </div>
          <p className="label-mono text-ink-muted">
            Actualizado{" "}
            <time dateTime={updatedAt}>{new Date(updatedAt).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</time>
          </p>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-rule border-t border-rule">
          {ITEMS.map((item) => (
            <div key={item.key} className="px-0 lg:px-6 py-6 lg:py-8 first:pl-0 last:pr-0">
              <dd className="font-mono text-[clamp(1.875rem,4vw,3.25rem)] tabular-nums leading-none text-ink tracking-tight">
                {values[item.key].toLocaleString("es-PE")}
              </dd>
              <dt className="mt-3 text-[0.9375rem] font-medium text-ink leading-snug">
                {item.label}
              </dt>
              <p className="mt-1.5 text-[0.8125rem] text-ink-muted leading-snug">
                {item.note}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
