"use client";

import { useEffect, useRef, useState } from "react";

type RevealVariant = "fade-up" | "fade" | "slide-left" | "slide-right" | "scale-in";

interface RevealOnViewProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  rootMargin?: string;
  repeat?: boolean;
  className?: string;
  /** Renderiza como section (default) o div */
  as?: "section" | "div";
}

export function RevealOnView({
  children,
  variant = "fade-up",
  delay = 0,
  rootMargin = "0px 0px -10% 0px",
  repeat = false,
  className = "",
  as = "section",
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) obs.disconnect();
          } else if (repeat) {
            setVisible(false);
          }
        }
      },
      { rootMargin, threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [repeat, rootMargin]);

  const sharedProps = {
    ref: ref as React.Ref<HTMLDivElement>,
    "data-reveal": variant,
    "data-visible": visible ? "true" : "false",
    style: { ["--reveal-delay" as string]: `${delay}ms` } as React.CSSProperties,
    className: `reveal ${className}`.trim(),
  };

  return as === "section" ? (
    <section {...sharedProps}>{children}</section>
  ) : (
    <div {...sharedProps}>{children}</div>
  );
}
