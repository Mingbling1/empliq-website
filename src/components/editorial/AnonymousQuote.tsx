import { cn } from "@/lib/utils";

export interface AnonymousQuoteData {
  handle: string;
  role: string;
  industry: string;
  city: string;
  quote: string;
  ratings: {
    trato: number;
    salario: number;
    honestidad: number;
    carga?: number;
  };
  flag?: string | null;
}

interface Props {
  data: AnonymousQuoteData;
  className?: string;
}

export function AnonymousQuote({ data, className }: Props) {
  const { handle, role, industry, city, quote, ratings, flag } = data;

  return (
    <article
      className={cn(
        "flex flex-col bg-paper border-t border-ink pt-6",
        className,
      )}
    >
      <header className="label-mono mb-5 flex items-center gap-2 flex-wrap">
        <span className="text-ink">{handle}</span>
        <span className="text-rule" aria-hidden>·</span>
        <span>{role}</span>
        <span className="text-rule" aria-hidden>·</span>
        <span>{industry}</span>
        <span className="text-rule" aria-hidden>·</span>
        <span>{city}</span>
      </header>

      <blockquote className="pull-quote text-ink text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-snug flex-1">
        “{quote}”
      </blockquote>

      <footer className="mt-6 flex flex-col gap-3 text-[0.75rem] font-mono">
        <RatingsRow r={ratings} />
        {flag && (
          <span className="inline-flex w-fit items-center gap-2 bg-vermillion-soft text-vermillion-deep px-2 py-1 uppercase tracking-widest text-[0.6875rem]">
            <span aria-hidden>⚑</span>
            {flag}
          </span>
        )}
      </footer>
    </article>
  );
}

function RatingsRow({ r }: { r: AnonymousQuoteData["ratings"] }) {
  const items: { key: string; label: string; value: number }[] = [
    { key: "trato",      label: "Trato",      value: r.trato },
    { key: "salario",    label: "Salario",    value: r.salario },
    { key: "honestidad", label: "Honestidad", value: r.honestidad },
  ];
  if (r.carga !== undefined) items.push({ key: "carga", label: "Carga", value: r.carga });

  return (
    <ul className="grid grid-cols-3 gap-x-2 gap-y-2 sm:flex sm:flex-wrap sm:gap-5">
      {items.map(({ key, label, value }) => {
        const critical = value <= 4;
        return (
          <li
            key={key}
            className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 min-w-0"
          >
            <span className="text-ink-muted uppercase tracking-widest text-[0.65rem] sm:text-[0.75rem] truncate">
              {label}
            </span>
            <span
              className={cn(
                "tabular-nums font-medium whitespace-nowrap",
                critical ? "text-vermillion" : "text-ink",
              )}
            >
              {value}/10
            </span>
          </li>
        );
      })}
    </ul>
  );
}
