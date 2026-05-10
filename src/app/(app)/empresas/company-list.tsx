"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Building2, Search, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { api, type Company, type PaginatedResponse } from "@/lib/api"

const PAGE_SIZE = 21

function formatEmployeeCount(count: number | null): string {
  if (!count) return "—"
  if (count >= 10000) return `${Math.round(count / 1000)}k+`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return count.toString()
}

export function CompanyList() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") ?? ""
  const [search, setSearch] = useState(initialSearch)
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch)
  const [page, setPage] = useState(1)
  const [result, setResult] = useState<PaginatedResponse<Company> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1) // Reset to page 1 on new search
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Fetch companies
  const fetchCompanies = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.companies.getAll({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch || undefined,
      })
      setResult(data)
    } catch (err) {
      setError("Error al cargar empresas")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, debouncedSearch])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies])

  const companies = result?.data || []
  const totalPages = result?.totalPages || 0
  const total = result?.total || 0

  return (
    <div className="space-y-8">
      {/* Search & meta */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" strokeWidth={1.5} />
          <Input
            placeholder="Buscar empresa, industria o RUC"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-paper-deep/50 border border-rule-soft rounded-none focus-visible:ring-0 focus-visible:border-ink font-serif"
          />
        </div>
        <p className="label-mono shrink-0">
          {loading ? "Cargando…" : `${total.toLocaleString("es-PE")} empresa${total !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Loading state — skeleton cards */}
      {loading && companies.length === 0 && (
        <div className="grid gap-px bg-rule-soft border border-rule-soft sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-paper p-5">
              <div className="flex items-start gap-3">
                <Skeleton className="h-12 w-12 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-3 w-full mt-3" />
              <Skeleton className="h-3 w-2/3 mt-1.5" />
              <div className="mt-4 flex gap-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-16">
          <p className="text-sm text-destructive">{error}</p>
          <button
            onClick={fetchCompanies}
            className="mt-2 text-sm text-muted-foreground hover:text-foreground underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Company Grid */}
      {!error && companies.length > 0 && (
        <div className="grid gap-px bg-rule-soft border border-rule-soft sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/empresas/${company.slug}`}
              className="group bg-paper p-5 hover:bg-paper-deep/60 transition-colors overflow-hidden flex flex-col"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="h-12 w-12 border border-rule-soft bg-paper-deep flex items-center justify-center shrink-0 overflow-hidden">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 className="h-5 w-5 text-ink-muted" strokeWidth={1.5} />
                  )}
                </div>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <h3 className="font-medium text-[0.95rem] text-ink truncate group-hover:text-vermillion transition-colors">
                    {company.name}
                  </h3>
                  {company.industry && (
                    <p className="label-mono mt-0.5 truncate normal-case tracking-normal !text-ink-muted">
                      {company.industry}
                    </p>
                  )}
                </div>
              </div>

              {company.description && (
                <p className="font-serif text-sm text-ink-soft mt-3 line-clamp-2 break-words">
                  {company.description}
                </p>
              )}

              <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-ink-muted min-w-0">
                {company.location && (
                  <span className="flex items-center gap-1 min-w-0 truncate">
                    <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                    <span className="truncate">{company.location}</span>
                  </span>
                )}
                {company.employeeCount && (
                  <span className="flex items-center gap-1 shrink-0">
                    <Users className="h-3 w-3" strokeWidth={1.5} />
                    {formatEmployeeCount(company.employeeCount)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && companies.length === 0 && (
        <div className="text-center py-16">
          <Building2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="font-medium text-muted-foreground">
            No se encontraron empresas
          </h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-muted-foreground px-3">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
