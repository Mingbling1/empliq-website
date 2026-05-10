"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, Briefcase, FileText, Search as SearchIcon, ArrowRight } from "lucide-react";
import { api, type Company, type JobCategory } from "@/lib/api";

type CategoryWithPositions = JobCategory & {
  topPositions: {
    title: string;
    slug: string;
    medianSalary: number;
    count: number;
    companies: number;
  }[];
};

interface LegalHit {
  title: string;
  href: string;
  excerpt: string;
}

const LEGAL_PAGES: LegalHit[] = [
  {
    title: "Términos y Condiciones de Servicio",
    href: "/terminos",
    excerpt:
      "Términos y condiciones de uso de empliq · Ley 29571 · Código Civil peruano · derechos y obligaciones.",
  },
  {
    title: "Política de Privacidad",
    href: "/privacidad",
    excerpt:
      "Protección de datos personales conforme a la Ley 29733. Cómo tratamos tu información.",
  },
];

const LEGAL_KEYWORDS: Record<string, string[]> = {
  "/terminos": [
    "terminos",
    "términos",
    "condiciones",
    "tyc",
    "terms",
    "servicio",
    "uso",
    "legal",
    "acuerdo",
    "ley 29571",
  ],
  "/privacidad": [
    "privacidad",
    "datos",
    "datos personales",
    "ley 29733",
    "cookies",
    "anonimato",
    "anonimo",
    "anónimo",
    "protección",
    "proteccion",
    "gdpr",
  ],
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function formatSalary(n: number): string {
  return `S/ ${n.toLocaleString("es-PE")}`;
}

interface Props {
  q: string;
}

export function BuscarResults({ q }: Props) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<CategoryWithPositions[]>([]);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (!q) {
      setCompanies([]);
      setCategories([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setErrored(false);

    Promise.allSettled([
      api.companies.getAll({ search: q, page: 1, limit: 8 }),
      api.categories.getWithPositions(),
    ]).then(([companiesRes, categoriesRes]) => {
      if (cancelled) return;
      let anyOk = false;
      if (companiesRes.status === "fulfilled") {
        anyOk = true;
        setCompanies(companiesRes.value.data);
      } else {
        setCompanies([]);
      }
      if (categoriesRes.status === "fulfilled") {
        anyOk = true;
        setCategories(categoriesRes.value);
      } else {
        setCategories([]);
      }
      setErrored(!anyOk);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [q]);

  const nq = normalize(q);

  const positionMatches = q
    ? categories
        .flatMap((cat) =>
          cat.topPositions
            .filter(
              (p) =>
                normalize(p.title).includes(nq) ||
                normalize(cat.name).includes(nq),
            )
            .map((p) => ({ ...p, categoryName: cat.name, categorySlug: cat.slug })),
        )
        .slice(0, 8)
    : [];

  const categoryMatches = q
    ? categories.filter(
        (c) =>
          normalize(c.name).includes(nq) ||
          (c.description ? normalize(c.description).includes(nq) : false),
      )
    : [];

  const legalMatches = q
    ? LEGAL_PAGES.filter((page) => {
        const keywords = LEGAL_KEYWORDS[page.href] ?? [];
        return (
          keywords.some((k) => nq.includes(normalize(k))) ||
          normalize(page.title).includes(nq) ||
          normalize(page.excerpt).includes(nq)
        );
      })
    : [];

  if (!q) {
    return (
      <div className="border border-dashed border-rule rounded-md py-16 text-center">
        <SearchIcon className="size-10 mx-auto text-ink-muted mb-4" strokeWidth={1.25} />
        <p className="font-serif italic text-ink-soft text-lg">
          Escribe en el buscador del header para empezar.
        </p>
        <p className="label-mono mt-3">empresas · puestos · sueldos · legales</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-md border border-rule-soft bg-paper-deep/40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const totalHits =
    companies.length +
    positionMatches.length +
    categoryMatches.length +
    legalMatches.length;

  if (totalHits === 0) {
    return (
      <div className="border border-rule rounded-md py-16 text-center">
        <SearchIcon className="size-10 mx-auto text-ink-muted mb-4" strokeWidth={1.25} />
        <h2 className="font-display italic text-2xl text-ink">
          Nada coincide con “{q}”.
        </h2>
        <p className="font-serif text-ink-soft mt-3 max-w-[44ch] mx-auto">
          {errored
            ? "Hubo un problema consultando el servicio. Intenta nuevamente en unos segundos."
            : "Prueba con el nombre exacto de una empresa, un puesto o algo como “términos” o “privacidad”."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["BCP", "Backend Senior", "Marketing", "Términos", "Privacidad"].map(
            (suggestion) => (
              <Link
                key={suggestion}
                href={`/buscar?q=${encodeURIComponent(suggestion)}`}
                className="text-xs label-mono px-3 py-1.5 border border-rule hover:border-ink hover:text-ink transition-colors"
              >
                {suggestion}
              </Link>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <p className="label-mono">
        {totalHits} resultado{totalHits !== 1 ? "s" : ""} agrupados
      </p>

      {companies.length > 0 && (
        <ResultGroup
          icon={Building2}
          title="Empresas"
          count={companies.length}
          viewAllHref={`/empresas?search=${encodeURIComponent(q)}`}
        >
          <ul className="divide-y divide-rule-soft">
            {companies.map((company) => (
              <li key={company.id}>
                <Link
                  href={`/empresas/${company.slug}`}
                  className="group flex items-start gap-4 py-4 transition-colors hover:bg-paper-deep/40 -mx-3 px-3 rounded-sm"
                >
                  <span className="size-11 shrink-0 rounded-md bg-paper-deep flex items-center justify-center overflow-hidden">
                    {company.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={company.logoUrl}
                        alt=""
                        className="size-full object-contain"
                      />
                    ) : (
                      <Building2 className="size-5 text-ink-muted" />
                    )}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-medium text-[0.95rem] text-ink truncate">
                      {company.name}
                    </span>
                    {company.industry && (
                      <span className="block text-xs text-ink-muted mt-0.5 truncate">
                        {company.industry}
                        {company.location ? ` · ${company.location}` : ""}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="size-4 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </ResultGroup>
      )}

      {(positionMatches.length > 0 || categoryMatches.length > 0) && (
        <ResultGroup
          icon={Briefcase}
          title="Salarios y puestos"
          count={positionMatches.length + categoryMatches.length}
          viewAllHref="/salarios"
        >
          {positionMatches.length > 0 && (
            <ul className="divide-y divide-rule-soft">
              {positionMatches.map((pos) => (
                <li key={`${pos.categorySlug}-${pos.slug}`}>
                  <Link
                    href={`/salarios#${pos.slug}`}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 sm:gap-6 items-center py-4 -mx-3 px-3 rounded-sm hover:bg-paper-deep/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[0.95rem] text-ink truncate">
                        {pos.title}
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {pos.categoryName}
                      </p>
                    </div>
                    <p className="text-sm font-mono tabular-nums text-ink sm:text-right">
                      {formatSalary(pos.medianSalary)}
                    </p>
                    <p className="label-mono sm:text-right">
                      {pos.count} reportes
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {categoryMatches.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {categoryMatches.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href="/salarios"
                    className="label-mono px-3 py-1.5 border border-rule hover:border-ink hover:text-ink transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ResultGroup>
      )}

      {legalMatches.length > 0 && (
        <ResultGroup
          icon={FileText}
          title="Información legal y guías"
          count={legalMatches.length}
        >
          <ul className="divide-y divide-rule-soft">
            {legalMatches.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="group flex items-start gap-4 py-4 -mx-3 px-3 rounded-sm hover:bg-paper-deep/40 transition-colors"
                >
                  <span className="size-11 shrink-0 rounded-md bg-paper-deep flex items-center justify-center">
                    <FileText className="size-5 text-ink-muted" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-medium text-[0.95rem] text-ink">
                      {page.title}
                    </span>
                    <span className="block text-xs text-ink-muted mt-0.5">
                      {page.excerpt}
                    </span>
                  </span>
                  <ArrowRight className="size-4 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </ResultGroup>
      )}
    </div>
  );
}

interface ResultGroupProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: number;
  viewAllHref?: string;
  children: React.ReactNode;
}

function ResultGroup({ icon: Icon, title, count, viewAllHref, children }: ResultGroupProps) {
  return (
    <section>
      <header className="flex items-baseline justify-between border-b border-ink pb-3 mb-4">
        <div className="flex items-center gap-3">
          <Icon className="size-4 text-ink-muted" />
          <h2 className="font-display italic text-xl text-ink">{title}</h2>
          <span className="label-mono">{count}</span>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="label-mono hover:text-ink transition-colors inline-flex items-center gap-1"
          >
            Ver todos
            <ArrowRight className="size-3" />
          </Link>
        )}
      </header>
      {children}
    </section>
  );
}
