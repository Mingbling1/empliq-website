/**
 * Box-and-whisker mock para "cómo se ve un perfil salarial real" en empliq.
 * No conecta a la API todavía; muestra la UI de la respuesta para invitar a buscar.
 */

const SAMPLE = {
  role: "Backend Senior",
  industry: "Banca · Lima",
  range: { min: 6500, p25: 8200, median: 9800, p75: 11500, max: 14500 },
  shares: 87,
  updated: "Mayo 2026",
};

export function SalaryDistributionCard() {
  const { range } = SAMPLE;
  const total = range.max - range.min;
  const pos = (v: number) => ((v - range.min) / total) * 100;

  return (
    <section aria-labelledby="salary-heading" className="bg-paper">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <header className="lg:col-span-5">
            <p className="label-mono mb-3">05 · Perfil salarial</p>
            <h2
              id="salary-heading"
              className="headline-display text-ink text-[clamp(2rem,4vw,3.25rem)] font-light"
            >
              Cuánto pagan, <em className="italic font-normal">en serio.</em>
            </h2>
            <p className="font-serif text-[1.0625rem] text-ink-soft leading-relaxed mt-6 max-w-[40ch]">
              Cada distribución se calcula sobre los reportes verificados de la
              comunidad. Sin promediar con datos de LinkedIn, sin inflar con
              ofertas que nadie aceptó. La mediana es la mediana.
            </p>
            <p className="font-mono text-[0.8125rem] text-ink-muted mt-6">
              Muestra: {SAMPLE.shares} reportes · {SAMPLE.updated}
            </p>
          </header>

          <div className="lg:col-span-7">
            <div className="border border-rule bg-paper-deep p-6 lg:p-10">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display italic text-[1.5rem] text-ink">
                  {SAMPLE.role}
                </h3>
                <span className="label-mono">{SAMPLE.industry}</span>
              </div>
              <p className="label-mono mb-10 text-ink-muted">
                Distribución mensual · soles peruanos
              </p>

              {/* Box-and-whisker pure ink, mediana en bermellón */}
              <div className="relative h-20" role="img" aria-label={`Rango salarial de ${formatPEN(range.min)} a ${formatPEN(range.max)} con mediana de ${formatPEN(range.median)}`}>
                {/* Whisker line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-ink -translate-y-1/2" />
                {/* Min tick */}
                <Tick at={pos(range.min)} label={formatPEN(range.min)} sub="mín" align="left" />
                {/* Max tick */}
                <Tick at={pos(range.max)} label={formatPEN(range.max)} sub="máx" align="right" />
                {/* Box p25→p75 */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-10 border-2 border-ink bg-paper"
                  style={{ left: `${pos(range.p25)}%`, width: `${pos(range.p75) - pos(range.p25)}%` }}
                  aria-hidden
                />
                {/* P25 / P75 labels */}
                <Tick at={pos(range.p25)} label={formatPEN(range.p25)} sub="p25" align="center" subtle />
                <Tick at={pos(range.p75)} label={formatPEN(range.p75)} sub="p75" align="center" subtle />
                {/* Median dot vermillion */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 rounded-full bg-vermillion ring-4 ring-paper"
                  style={{ left: `${pos(range.median)}%` }}
                  aria-hidden
                />
                <div
                  className="absolute top-full mt-1 -translate-x-1/2 text-center"
                  style={{ left: `${pos(range.median)}%` }}
                >
                  <span className="font-mono text-[0.8125rem] tabular-nums text-vermillion font-medium">
                    {formatPEN(range.median)}
                  </span>
                  <span className="block label-mono text-vermillion">mediana</span>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-rule grid grid-cols-3 gap-4 text-[0.8125rem]">
                <Stat label="Bono típico" value="0.5–2 sueldos" />
                <Stat label="Utilidades" value="Sí (90%)" />
                <Stat label="Trabajo remoto" value="Híbrido 2:3" />
              </div>
            </div>

            <p className="label-mono mt-4 text-ink-muted">
              ↪ Búsqueda real disponible para todos los puestos publicados
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tick({
  at,
  label,
  sub,
  align,
  subtle = false,
}: {
  at: number;
  label: string;
  sub: string;
  align: "left" | "right" | "center";
  subtle?: boolean;
}) {
  const translate =
    align === "left" ? "translate-x-0" : align === "right" ? "-translate-x-full" : "-translate-x-1/2";
  return (
    <div
      className={`absolute top-full mt-1 ${translate} ${subtle ? "opacity-60" : ""}`}
      style={{ left: `${at}%` }}
    >
      <span className="font-mono text-[0.75rem] tabular-nums text-ink block whitespace-nowrap">
        {label}
      </span>
      <span className="label-mono block">{sub}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="label-mono block">{label}</span>
      <span className="font-mono text-ink mt-1 block">{value}</span>
    </div>
  );
}

function formatPEN(n: number): string {
  return `S/ ${n.toLocaleString("es-PE")}`;
}
