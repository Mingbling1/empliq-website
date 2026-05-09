import Link from "next/link";
import { cn } from "@/lib/utils";

type WordmarkVariant = "lockup" | "monogram" | "stacked" | "inverted";

interface WordmarkProps {
  variant?: WordmarkVariant;
  className?: string;
  href?: string | null;
}

export function Wordmark({ variant = "lockup", className, href = "/" }: WordmarkProps) {
  const inner = <WordmarkGlyph variant={variant} />;
  if (href === null) return <span className={cn("inline-flex items-center", className)}>{inner}</span>;
  return (
    <Link href={href} className={cn("inline-flex items-center transition-opacity hover:opacity-70", className)} aria-label="empliq — inicio">
      {inner}
    </Link>
  );
}

function WordmarkGlyph({ variant }: { variant: WordmarkVariant }) {
  if (variant === "monogram") {
    return (
      <span className="font-wordmark text-[1.5em] font-bold tracking-tight leading-none">
        e
      </span>
    );
  }
  if (variant === "stacked") {
    return (
      <span className="font-wordmark font-bold tracking-tight leading-[0.9] flex flex-col items-start text-[1em]">
        <span>empl</span>
        <span>iq</span>
      </span>
    );
  }
  if (variant === "inverted") {
    return (
      <span className="font-wordmark font-bold tracking-tight bg-ink text-paper px-2 py-1 leading-none">
        empliq
      </span>
    );
  }
  return (
    <span className="font-wordmark font-bold tracking-tight leading-none text-[1.125em]">
      empliq
    </span>
  );
}
