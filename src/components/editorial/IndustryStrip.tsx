/**
 * Strip discreta con sectores cubiertos. NO un LogoCloud genérico —
 * solo nombres tipográficos de los sectores con dato más rico.
 */

const SECTORS = [
  "Banca",
  "Retail",
  "Telecom",
  "Tecnología",
  "Minería",
  "Consumo masivo",
  "Educación",
  "Salud",
  "Logística",
  "Construcción",
  "Energía",
  "Pesca",
];

export function IndustryStrip() {
  return (
    <section aria-label="Sectores cubiertos" className="border-y border-rule bg-paper">
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-8 lg:py-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <p className="label-mono shrink-0">Cobertura sectorial</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:gap-x-8 text-[0.9375rem] text-ink">
          {SECTORS.map((s, i) => (
            <li key={s} className="font-serif italic flex items-center gap-6 lg:gap-8">
              {s}
              {i < SECTORS.length - 1 && <span aria-hidden className="text-rule">·</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
