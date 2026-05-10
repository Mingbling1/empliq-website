"use client"

import Link from "next/link"
import {
  MapPin,
  ChevronRight,
  Star,
  Phone,
  Briefcase,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCompany } from "./company-context"

function formatSalary(amount: number): string {
  return `S/ ${amount.toLocaleString("es-PE")}`
}

function renderStars(rating: number) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-ink text-ink" : "text-ink-muted/30"
          }`}
          strokeWidth={1.25}
        />
      ))}
    </div>
  )
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return "Hoy"
  if (diff === 1) return "Ayer"
  if (diff < 30) return `Hace ${diff} días`
  if (diff < 365) return `Hace ${Math.floor(diff / 30)} meses`
  return `Hace ${Math.floor(diff / 365)} años`
}

interface SectionHeaderProps {
  folio: string
  title: string
  href?: string
  hrefLabel?: string
}
function SectionHeader({ folio, title, href, hrefLabel }: SectionHeaderProps) {
  return (
    <header className="border-b border-ink pb-3 mb-5">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="label-mono">{folio}</span>
        {href && (
          <Link
            href={href}
            className="label-mono hover:text-ink transition-colors inline-flex items-center gap-1"
          >
            {hrefLabel ?? "Ver todos"}
            <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      <h2
        className="font-display italic text-[clamp(1.25rem,2vw,1.625rem)] text-ink leading-tight"
        style={{ overflowWrap: "anywhere", wordBreak: "break-word", hyphens: "auto" }}
      >
        {title}
      </h2>
    </header>
  )
}

export function CompanyOverview({ slug }: { slug: string }) {
  const { company, positions, reviews, benefits } = useCompany()

  if (!company) return null

  const metadata = (company.metadata || {}) as Record<string, any>
  const direccion = metadata.direccion as string | undefined
  const telefonos = metadata.telefonos as string[] | undefined
  const ejecutivos = metadata.ejecutivos as
    | Array<{ cargo: string; desde: string; nombre: string }>
    | undefined
  const tipoEmpresa = metadata.tipo_empresa as string | undefined
  const condicion = metadata.condicion as string | undefined
  const estado = metadata.estado as string | undefined
  const razonSocial = metadata.razon_social as string | undefined

  const basePath = `/empresas/${slug}`

  return (
    <div className="grid grid-cols-1 gap-10 lg:gap-14 lg:grid-cols-3">
      {/* Main editorial column */}
      <div className="lg:col-span-2 min-w-0 space-y-12 lg:space-y-14">
        {company.description && (
          <section>
            <SectionHeader folio="01" title={`Acerca de ${company.name}`} />
            <p className="font-serif text-[1.05rem] text-ink-soft leading-relaxed max-w-[60ch]">
              {company.description}
            </p>
          </section>
        )}

        <section>
          <SectionHeader
            folio="02"
            title="Salarios más reportados"
            href={`${basePath}/salarios`}
          />
          {positions.length > 0 ? (
            <ul className="divide-y divide-rule-soft border-y border-rule-soft">
              {positions.slice(0, 5).map((pos) => (
                <li
                  key={pos.id}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-6 py-4 items-center"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-[0.95rem] text-ink truncate">
                      {pos.title}
                    </p>
                    {pos.level && (
                      <p className="label-mono mt-0.5 normal-case tracking-normal !text-ink-muted">
                        {pos.level}
                      </p>
                    )}
                  </div>
                  {pos.salaryStats && (
                    <div className="text-left sm:text-right shrink-0">
                      <p className="font-mono tabular-nums text-base text-ink">
                        {formatSalary(pos.salaryStats.median)}
                        <span className="label-mono normal-case tracking-normal ml-1">
                          /mes
                        </span>
                      </p>
                      <p className="label-mono mt-1">
                        {formatSalary(pos.salaryStats.min)} ·{" "}
                        {formatSalary(pos.salaryStats.max)}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-serif italic text-ink-muted">
              Aún sin sueldos reportados. Sé el primero.
            </p>
          )}
        </section>

        <section>
          <SectionHeader
            folio="03"
            title="Reseñas recientes"
            href={`${basePath}/resenas`}
            hrefLabel="Ver todas"
          />
          {reviews.length > 0 ? (
            <ul className="space-y-6">
              {reviews.slice(0, 2).map((review) => (
                <li
                  key={review.id}
                  className="border-l-2 border-rule pl-5 py-1"
                >
                  <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      {renderStars(review.rating)}
                      {review.isCurrentEmployee && (
                        <span className="label-mono">Empleado actual</span>
                      )}
                    </div>
                    <span className="label-mono">{timeAgo(review.createdAt)}</span>
                  </div>
                  {review.title && (
                    <h4 className="font-display italic text-lg text-ink mb-2">
                      “{review.title}”
                    </h4>
                  )}
                  {review.pros && (
                    <p className="font-serif text-[0.95rem] text-ink-soft mb-1">
                      <span className="label-mono mr-2">Pros</span>
                      {review.pros}
                    </p>
                  )}
                  {review.cons && (
                    <p className="font-serif text-[0.95rem] text-ink-soft">
                      <span className="label-mono mr-2">Contras</span>
                      {review.cons}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-serif italic text-ink-muted">
              Aún no hay reseñas. Sé el primero en compartir tu experiencia.
            </p>
          )}
        </section>

        {ejecutivos && ejecutivos.length > 0 && (
          <section>
            <SectionHeader folio="04" title="Representantes legales" />
            <ul className="divide-y divide-rule-soft border-y border-rule-soft">
              {ejecutivos.slice(0, 6).map((ej, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 py-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-[0.95rem] text-ink capitalize truncate">
                      {ej.nombre.toLowerCase()}
                    </p>
                    <p className="label-mono normal-case tracking-normal !text-ink-muted mt-0.5 capitalize">
                      {ej.cargo.toLowerCase()}
                    </p>
                  </div>
                  <span className="label-mono shrink-0">
                    Desde {ej.desde}
                  </span>
                </li>
              ))}
              {ejecutivos.length > 6 && (
                <li className="py-3 text-center">
                  <p className="label-mono">
                    +{ejecutivos.length - 6} más representantes
                  </p>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>

      {/* Sidebar editorial — datos clave + dirección + tels + beneficios */}
      <aside className="min-w-0 space-y-8">
        <div className="border border-rule">
          <header className="border-b border-rule px-5 py-3 bg-paper-deep/40">
            <p className="label-mono">Datos clave · Ficha SUNAT</p>
          </header>
          <dl className="divide-y divide-rule-soft">
            {razonSocial && (
              <DataRow label="Razón social" value={razonSocial} />
            )}
            <DataRow
              label="RUC"
              value={
                <span className="font-mono tabular-nums text-[0.8125rem]">
                  {company.ruc || "—"}
                </span>
              }
            />
            <DataRow label="Industria" value={company.industry || "—"} />
            <DataRow
              label="Empleados"
              value={
                company.employeeCount
                  ? company.employeeCount.toLocaleString("es-PE")
                  : "—"
              }
              valueClass="font-mono tabular-nums"
            />
            <DataRow
              label="Fundación"
              value={company.foundedYear || "—"}
              valueClass="font-mono tabular-nums"
            />
            <DataRow label="Ubicación" value={company.location || "—"} />
            {tipoEmpresa && <DataRow label="Tipo" value={tipoEmpresa} />}
            {condicion && (
              <DataRow
                label="Condición"
                value={
                  <Badge
                    variant="secondary"
                    className="rounded-none bg-paper-deep border border-rule text-ink-soft text-[10px]"
                  >
                    {condicion}
                  </Badge>
                }
              />
            )}
            {estado && (
              <DataRow
                label="Estado"
                value={
                  <Badge
                    variant="secondary"
                    className="rounded-none bg-paper-deep border border-rule text-ink-soft text-[10px]"
                  >
                    {estado}
                  </Badge>
                }
              />
            )}
          </dl>
        </div>

        {direccion && (
          <SidebarBlock icon={MapPin} title="Dirección">
            <p className="font-serif text-sm text-ink-soft leading-relaxed">
              {direccion}
            </p>
          </SidebarBlock>
        )}

        {telefonos && telefonos.length > 0 && (
          <SidebarBlock icon={Phone} title="Teléfonos">
            <ul className="space-y-1">
              {telefonos.map((tel, i) => (
                <li
                  key={i}
                  className="font-mono tabular-nums text-sm text-ink-soft"
                >
                  {tel}
                </li>
              ))}
            </ul>
          </SidebarBlock>
        )}

        {benefits.length > 0 && (
          <SidebarBlock icon={Briefcase} title="Beneficios">
            <div className="flex flex-wrap gap-2">
              {benefits.slice(0, 8).map((benefit) => (
                <Badge
                  key={benefit.id}
                  variant="secondary"
                  className="rounded-none bg-paper-deep border border-rule-soft text-ink text-[11px] font-normal"
                >
                  {benefit.name}
                </Badge>
              ))}
              {benefits.length > 8 && (
                <Link
                  href={`${basePath}/beneficios`}
                  className="label-mono hover:text-ink transition-colors self-center"
                >
                  +{benefits.length - 8} más
                </Link>
              )}
            </div>
          </SidebarBlock>
        )}
      </aside>
    </div>
  )
}

function DataRow({
  label,
  value,
  valueClass = "",
}: {
  label: string
  value: React.ReactNode
  valueClass?: string
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 px-5 py-3 items-baseline">
      <dt className="label-mono shrink-0">{label}</dt>
      <dd
        className={`text-right text-sm text-ink min-w-0 break-words ${valueClass}`}
      >
        {value}
      </dd>
    </div>
  )
}

function SidebarBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-rule p-5">
      <h3 className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
        <span className="label-mono">{title}</span>
      </h3>
      {children}
    </div>
  )
}
