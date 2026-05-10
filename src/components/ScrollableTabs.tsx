"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tab {
  label: string
  href: string
  isActive: boolean
}

interface ScrollableTabsProps {
  tabs: Tab[]
}

export function ScrollableTabs({ tabs }: ScrollableTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 2)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScroll()
    el.addEventListener("scroll", checkScroll, { passive: true })
    const observer = new ResizeObserver(checkScroll)
    observer.observe(el)

    return () => {
      el.removeEventListener("scroll", checkScroll)
      observer.disconnect()
    }
  }, [checkScroll])

  // Scroll active tab into view on mount
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const activeTab = el.querySelector("[data-active=true]") as HTMLElement | null
    if (activeTab) {
      activeTab.scrollIntoView({ inline: "center", behavior: "instant", block: "nearest" })
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = el.clientWidth * 0.6
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  const showArrows = canScrollLeft || canScrollRight

  return (
    <div className="relative flex items-center">
      {showArrows && (
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={cn(
            "absolute left-0 z-10 flex items-center justify-center w-7 h-7 bg-paper border border-rule transition-all",
            canScrollLeft
              ? "text-ink hover:bg-paper-deep cursor-pointer"
              : "text-ink-muted/30 cursor-default opacity-0 pointer-events-none"
          )}
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      )}

      <div
        ref={scrollRef}
        className={cn(
          "flex gap-0 overflow-x-auto scrollbar-none",
          showArrows && "mx-8"
        )}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            data-active={tab.isActive}
            className={cn(
              "relative px-1 py-3 mr-6 lg:mr-8 text-sm whitespace-nowrap transition-colors shrink-0",
              tab.isActive
                ? "text-ink font-medium after:absolute after:-bottom-px after:left-0 after:right-0 after:h-px after:bg-ink"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {showArrows && (
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={cn(
            "absolute right-0 z-10 flex items-center justify-center w-7 h-7 bg-paper border border-rule transition-all",
            canScrollRight
              ? "text-ink hover:bg-paper-deep cursor-pointer"
              : "text-ink-muted/30 cursor-default opacity-0 pointer-events-none"
          )}
          aria-label="Desplazar a la derecha"
        >
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
