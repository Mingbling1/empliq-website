"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

const NAV = [
  { href: "/empresas", label: "Buscar" },
  { href: "/salarios", label: "Salarios" },
  { href: "/manifiesto", label: "Manifiesto" },
];

interface EditorialHeaderProps {
  /**
   * Si true, el header arranca transparente sobre el hero y se solidifica al hacer scroll.
   * En páginas internas (legales, etc.) se deja en modo sólido permanente.
   */
  overHero?: boolean;
}

export function EditorialHeader({ overHero = true }: EditorialHeaderProps) {
  const [scrolled, setScrolled] = useState(!overHero);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => {
      // Solidificar antes de salir del hero (al cruzar ~70% del viewport).
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const isLight = overHero && !scrolled;

  return (
    <header
      data-state={scrolled ? "solid" : "transparent"}
      className={[
        "fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,border-color,color] duration-500 ease-out",
        isLight
          ? "bg-transparent border-b border-paper/0 text-paper"
          : "bg-paper/95 backdrop-blur-md border-b border-rule-soft text-ink",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-4 lg:py-5 flex items-center justify-between gap-8">
        <Wordmark className="text-[1.125rem]" />

        <nav
          aria-label="Principal"
          className={[
            "hidden md:flex items-center gap-7 text-[0.875rem] font-medium transition-colors",
            isLight ? "text-paper/85" : "text-ink-soft",
          ].join(" ")}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "transition-colors",
                isLight ? "hover:text-paper" : "hover:text-ink",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span
            className={[
              "hidden sm:inline label-mono transition-colors",
              isLight ? "!text-paper/70" : "",
            ].join(" ")}
          >
            Lima · 2026
          </span>
          <Link
            href="/login"
            className={[
              "text-[0.875rem] font-medium transition-colors",
              isLight ? "text-paper hover:text-vermillion-soft" : "text-ink hover:text-vermillion",
            ].join(" ")}
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
