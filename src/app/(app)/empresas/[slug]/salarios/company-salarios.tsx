"use client"

import { DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCompany } from "../company-context"
import { SalaryForm } from "@/components/SalaryForm"

function formatSalary(amount: number): string {
  return `S/ ${amount.toLocaleString("es-PE")}`
}

export function CompanySalarios() {
  const { company, positions, refetch } = useCompany()

  return (
    <div className="space-y-6">
      {/* Salary Form */}
      {company && (
        <SalaryForm
          companyId={company.id}
          companyName={company.name}
          positions={positions}
          onSuccess={refetch}
        />
      )}

      <div>
        <div className="hidden sm:grid grid-cols-5 gap-4 px-3 py-2 label-mono border-b border-rule">
          <span className="col-span-2">Puesto</span>
          <span className="text-right">Mediana</span>
          <span className="text-right">Rango</span>
          <span className="text-right">Reportes</span>
        </div>
        <div className="divide-y divide-rule-soft border-b border-rule-soft">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 px-3 py-4 hover:bg-paper-deep/40 transition-colors items-center"
            >
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-ink">{pos.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {pos.level && (
                    <Badge
                      variant="outline"
                      className="rounded-none bg-transparent border-rule-soft text-[10px] text-ink-muted"
                    >
                      {pos.level}
                    </Badge>
                  )}
                </div>
              </div>
              {pos.salaryStats ? (
                <>
                  <p className="font-mono tabular-nums text-sm text-ink sm:text-right">
                    {formatSalary(pos.salaryStats.median)}
                  </p>
                  <p className="font-mono tabular-nums text-xs text-ink-muted sm:text-right">
                    {formatSalary(pos.salaryStats.min)} ·{" "}
                    {formatSalary(pos.salaryStats.max)}
                  </p>
                  <p className="label-mono sm:text-right">
                    {pos.salaryStats.count} reportes
                  </p>
                </>
              ) : (
                <p className="col-span-3 label-mono italic sm:text-right">
                  Sin datos aún
                </p>
              )}
            </div>
          ))}
        </div>
        {positions.length === 0 && (
          <div className="text-center py-16 border-t border-rule-soft">
            <DollarSign className="h-9 w-9 text-ink-muted/40 mx-auto mb-3" strokeWidth={1.25} />
            <p className="font-serif italic text-ink-muted">
              Aún no hay salarios reportados para esta empresa.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
