"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { use } from "react"
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Star,
  Calendar,
  ExternalLink,
  Briefcase,
  ArrowLeft,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ScrollableTabs } from "@/components/ScrollableTabs"
import { CompanyProvider, useCompany } from "./company-context"

function renderStars(rating: number) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-ink text-ink"
              : "text-ink-muted/30"
          }`}
        />
      ))}
    </div>
  )
}

function CompanyHeader({ slug }: { slug: string }) {
  const { company, positions, reviews, benefits, loading, error } = useCompany()
  const pathname = usePathname()

  if (loading) {
    return (
      <div>
        <div className="mx-auto max-w-[92rem] px-6 lg:px-10 pt-6">
          <Skeleton className="h-3 w-40 bg-paper-deep" />
        </div>
        <div className="border-b border-rule">
          <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-10 lg:py-14">
            <div className="flex items-start gap-6">
              <Skeleton className="h-16 w-16 shrink-0 bg-paper-deep" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-10 w-64 bg-paper-deep" />
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-28 bg-paper-deep" />
                  <Skeleton className="h-3 w-24 bg-paper-deep" />
                  <Skeleton className="h-3 w-32 bg-paper-deep" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[92rem] px-6 lg:px-10 border-b border-rule-soft">
          <div className="flex gap-6 py-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20 bg-paper-deep" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !company) {
    const name = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")

    return (
      <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-16 text-center">
        <Building2 className="h-12 w-12 text-ink-muted/50 mx-auto mb-4" />
        <h2 className="font-display italic text-2xl text-ink">{name}</h2>
        <p className="font-serif text-ink-soft mt-2">
          {error || "Aún no tenemos información de esta empresa."}
        </p>
      </div>
    )
  }

  const basePath = `/empresas/${slug}`
  const tabs = [
    { label: "Resumen", href: basePath },
    { label: `Salarios (${positions.length})`, href: `${basePath}/salarios` },
    { label: `Reseñas (${reviews.length})`, href: `${basePath}/resenas` },
    { label: `Beneficios (${benefits.length})`, href: `${basePath}/beneficios` },
  ]

  return (
    <div>
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10 pt-6">
        <Link
          href="/empresas"
          className="inline-flex items-center gap-2 label-mono hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Directorio
        </Link>
      </div>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
          <p className="label-mono mb-4">A · 03 · Perfil de empresa</p>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="h-20 w-20 lg:h-24 lg:w-24 border border-rule bg-paper-deep flex items-center justify-center overflow-hidden">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Building2 className="h-9 w-9 text-ink-muted" strokeWidth={1.25} />
                )}
              </div>
            </div>

            <div className="lg:col-span-10 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="headline-display text-ink text-[clamp(1.875rem,4vw,3rem)] font-light">
                  {company.name}
                </h1>
                {company.isVerified && (
                  <Badge variant="secondary" className="bg-paper-deep text-ink-soft border border-rule rounded-none">
                    Verificada
                  </Badge>
                )}
              </div>

              <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-ink-soft font-serif">
                {company.industry && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} />
                    <dd>{company.industry}</dd>
                  </div>
                )}
                {company.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} />
                    <dd>{company.location}</dd>
                  </div>
                )}
                {company.employeeCount && (
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} />
                    <dd>{company.employeeCount.toLocaleString("es-PE")} empleados</dd>
                  </div>
                )}
                {company.foundedYear && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} />
                    <dd>Fundada {company.foundedYear}</dd>
                  </div>
                )}
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-ink transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} />
                    Sitio web
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </dl>

              {company.averageRating && (
                <div className="flex items-center gap-2 mt-4">
                  {renderStars(Math.round(company.averageRating))}
                  <span className="text-sm font-medium text-ink">
                    {company.averageRating.toFixed(1)}
                  </span>
                  <span className="label-mono">
                    ({company._count?.reviews || 0} reseñas)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10 border-b border-rule-soft">
        <ScrollableTabs
          tabs={tabs.map((tab) => ({
            ...tab,
            isActive:
              tab.href === basePath
                ? pathname === basePath
                : pathname.startsWith(tab.href),
          }))}
        />
      </div>
    </div>
  )
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default function CompanyLayout({ children, params }: LayoutProps) {
  const { slug } = use(params)

  return (
    <CompanyProvider slug={slug}>
      <CompanyHeader slug={slug} />
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        {children}
      </div>
    </CompanyProvider>
  )
}
