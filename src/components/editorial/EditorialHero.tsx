import Image from "next/image";
import { SearchInline } from "./SearchInline";

interface EditorialHeroProps {
  companies: number;
}

export function EditorialHero({ companies }: EditorialHeroProps) {
  return (
    <section
      aria-labelledby="hero-headline"
      className="relative isolate overflow-hidden bg-ink text-paper min-h-[100svh] flex flex-col"
    >
      {/* Foto documental B&W de Lima al amanecer (cubre todo el viewport, incluido el header) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 hero-kenburns">
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
        </div>

        {/* Vignette amanecer — luz cálida desde el horizonte */}
        <div
          aria-hidden
          className="absolute inset-0 hero-dawn-glow mix-blend-soft-light"
        />

        {/* Halo de bermellón que respira sobre el cerro — punto focal */}
        <div
          aria-hidden
          className="absolute hero-vermillion-halo"
        />

        {/* Sweep de luz lenta cruzando la escena */}
        <div
          aria-hidden
          className="absolute inset-0 hero-light-sweep mix-blend-overlay pointer-events-none"
        />

        {/* Gradient principal para legibilidad del copy */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/55 to-ink/85"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent"
        />

        {/* Grain documental */}
        <div aria-hidden className="absolute inset-0 hero-grain pointer-events-none" />
      </div>

      {/* Contenido del hero — ocupa el viewport completo. Padding-top compensa el header fixed */}
      <div className="relative flex-1 mx-auto w-full max-w-[92rem] px-6 lg:px-10 pt-28 lg:pt-32 pb-12 lg:pb-16 flex flex-col">
        {/* Top metadata strip */}
        <div className="flex items-center justify-between text-paper/70 mb-10 lg:mb-14 hero-fade" style={{ animationDelay: "100ms" }}>
          <span className="label-mono !text-paper/80 inline-flex items-center gap-2">
            <span className="hero-pulse-dot" aria-hidden />
            01 · Edición Lima 2026
          </span>
          <span className="label-mono !text-paper/80 hidden sm:inline">
            empliq.io · transparencia laboral peruana
          </span>
        </div>

        {/* Headline display narrativo */}
        <h1
          id="hero-headline"
          className="headline-display text-paper max-w-[28ch] text-[clamp(2.5rem,7.2vw,6rem)] font-light hero-fade"
          style={{ animationDelay: "240ms" }}
        >
          Cada empresa peruana tiene su <em className="not-italic font-normal">versión oficial.</em>
          <br />
          <span className="italic font-normal hero-italic-glow">Aquí guardamos la otra.</span>
        </h1>

        {/* Subhead */}
        <p
          className="font-serif text-paper/85 text-[clamp(1.05rem,1.5vw,1.375rem)] leading-relaxed max-w-[58ch] mt-7 lg:mt-9 hero-fade"
          style={{ animationDelay: "420ms" }}
        >
          Una red anónima de profesionales peruanos que comparten lo que ganan,
          cómo trabajan y qué esperar de cada empresa. Tu voz protegida, tu
          identidad jamás revelada.
        </p>

        {/* Buscador inline */}
        <div className="mt-8 lg:mt-10 max-w-[44rem] hero-fade" style={{ animationDelay: "560ms" }}>
          <SearchInline
            placeholder="Buscar empresa peruana, puesto o sector"
            ariaLabel="Buscar empresa, puesto o sector"
          />
          <p className="label-mono mt-4 !text-paper/65">
            <span className="text-paper">{formatPeruvianNumber(companies)}</span>{" "}
            empresas indexadas · 100% anónimo · login con Google
          </p>
        </div>

        {/* Foot del hero — strapline editorial pegado al borde inferior del viewport */}
        <div
          className="mt-auto pt-8 flex items-end justify-between gap-4 border-t border-paper/15 text-paper/60 hero-fade"
          style={{ animationDelay: "720ms" }}
        >
          <span className="label-mono !text-paper/70">
            Avenida Abancay · Cerro San Cristóbal · 06:14
          </span>
          <span className="label-mono !text-paper/55 hidden md:inline-flex items-center gap-2">
            Sigue desplazándote
            <span className="hero-scroll-arrow" aria-hidden>↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function formatPeruvianNumber(n: number): string {
  return n.toLocaleString("es-PE");
}
