import Image from "next/image";
import { SearchInline } from "./SearchInline";

interface EditorialHeroProps {
  companies: number;
}

export function EditorialHero({ companies }: EditorialHeroProps) {
  return (
    <section
      aria-labelledby="hero-headline"
      className="relative overflow-hidden bg-ink text-paper"
    >
      {/* Foto documental B&W de Lima al amanecer */}
      <div className="absolute inset-0">
        <Image
          src="/hero/lima-dawn-commute-2400.webp"
          alt="Avenida Abancay al amanecer, Lima — trabajadores cruzando frente al Cerro San Cristóbal"
          fill
          priority
          fetchPriority="high"
          quality={88}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAANABYDASIAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAAEDB//EACUQAAEDAwIFBQAAAAAAAAAAAAECAwQABRESIRMUMTJxgZGhsf/EABYBAQEBAAAAAAAAAAAAAAAAAAEAAv/EABcRAAMBAAAAAAAAAAAAAAAAAAABAhP/2gAMAwEAAhEDEQA/ANvWlvbslxuhZacS4UNoBVthk5O3+1elKVyajVSlf//Z"
          className="object-cover object-[center_60%]"
        />
        {/* Gradient para legibilidad del copy */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/55 to-ink/85"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent"
        />
      </div>

      {/* Contenido del hero */}
      <div className="relative mx-auto max-w-[92rem] px-6 lg:px-10 pt-14 lg:pt-24 pb-20 lg:pb-28">
        {/* Top metadata strip */}
        <div className="flex items-center justify-between text-paper/70 mb-12 lg:mb-20">
          <span className="label-mono text-paper/80">
            01 · Edición Lima 2026
          </span>
          <span className="label-mono text-paper/80 hidden sm:inline">
            empliq.io · transparencia laboral peruana
          </span>
        </div>

        {/* Headline display narrativo */}
        <h1
          id="hero-headline"
          className="headline-display text-paper max-w-[28ch] text-[clamp(2.5rem,7.2vw,6rem)] font-light"
        >
          Cada empresa peruana tiene su <em className="not-italic font-normal">versión oficial.</em>
          <br />
          <span className="italic font-normal">Aquí guardamos la otra.</span>
        </h1>

        {/* Subhead */}
        <p className="font-serif text-paper/80 text-[clamp(1.05rem,1.5vw,1.375rem)] leading-relaxed max-w-[58ch] mt-8 lg:mt-10">
          Una red anónima de profesionales peruanos que comparten lo que ganan,
          cómo trabajan y qué esperar de cada empresa. Tu voz protegida, tu
          identidad jamás revelada.
        </p>

        {/* Buscador inline */}
        <div className="mt-10 lg:mt-12 max-w-[44rem]">
          <SearchInline
            placeholder="Buscar empresa peruana, puesto o sector"
            ariaLabel="Buscar empresa, puesto o sector"
          />
          <p className="label-mono mt-4 text-paper/60">
            <span className="text-paper">{formatPeruvianNumber(companies)}</span>{" "}
            empresas indexadas · 100% anónimo · login con Google
          </p>
        </div>

        {/* Foot del hero — strapline editorial */}
        <div className="mt-16 lg:mt-24 flex items-end justify-between gap-4 border-t border-paper/15 pt-5 text-paper/60">
          <span className="label-mono text-paper/70">
            Avenida Abancay · Cerro San Cristóbal · 06:14
          </span>
          <span className="label-mono text-paper/50 hidden md:inline">
            Sigue desplazándote ↓
          </span>
        </div>
      </div>
    </section>
  );
}

function formatPeruvianNumber(n: number): string {
  return n.toLocaleString("es-PE");
}
