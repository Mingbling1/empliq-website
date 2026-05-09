"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const PLACEHOLDER_CYCLE = [
  "Buscar empresa peruana, puesto o sector",
  "BCP, Backend Senior Lima",
  "Rappi, Marketing Manager",
  "Belcorp, Analista Senior",
  "Yape, Product Designer",
  "Interbank, Data Analyst",
];

interface Props {
  placeholder?: string;
  ariaLabel: string;
}

export function SearchInline({ placeholder, ariaLabel }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [phIndex, setPhIndex] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused || value) return;
    const id = setInterval(() => setPhIndex((i) => (i + 1) % PLACEHOLDER_CYCLE.length), 3200);
    return () => clearInterval(id);
  }, [focused, value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="group relative flex items-stretch border border-paper/30 bg-paper/[0.04] backdrop-blur-md focus-within:border-paper transition-colors"
    >
      <span className="flex items-center px-4 text-paper/60 group-focus-within:text-paper transition-colors" aria-hidden>
        <Search className="size-5" strokeWidth={1.5} />
      </span>
      <input
        ref={inputRef}
        type="search"
        aria-label={ariaLabel}
        placeholder={placeholder ?? PLACEHOLDER_CYCLE[phIndex]}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        className="flex-1 bg-transparent py-4 pr-3 text-[1rem] lg:text-[1.0625rem] text-paper placeholder:text-paper/55 outline-none caret-vermillion font-serif"
      />
      <button
        type="submit"
        className="px-5 lg:px-7 bg-vermillion text-paper font-medium text-[0.9375rem] tracking-tight hover:bg-vermillion-deep transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}
