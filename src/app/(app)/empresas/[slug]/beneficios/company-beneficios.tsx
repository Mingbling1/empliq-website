"use client"

import { Heart } from "lucide-react"
import { useCompany } from "../company-context"
import { BenefitForm } from "@/components/BenefitForm"

export function CompanyBeneficios() {
  const { company, benefits, refetch } = useCompany()

  const benefitsByCategory = benefits.reduce(
    (acc, benefit) => {
      const cat = benefit.category || "Otros"
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(benefit)
      return acc
    },
    {} as Record<string, typeof benefits>
  )

  return (
    <div className="space-y-6">
      {/* Benefit Form */}
      {company && (
        <BenefitForm
          companyId={company.id}
          companyName={company.name}
          onSuccess={refetch}
        />
      )}

      {Object.keys(benefitsByCategory).length > 0 ? (
        <div className="space-y-10">
          {Object.entries(benefitsByCategory).map(([category, items]) => (
            <section key={category}>
              <header className="flex items-center gap-2 border-b border-ink pb-3 mb-5">
                <Heart className="h-4 w-4 text-vermillion" strokeWidth={1.5} />
                <h3 className="font-display italic text-xl text-ink">{category}</h3>
                <span className="label-mono ml-auto">{items.length}</span>
              </header>
              <div className="grid gap-px bg-rule-soft border border-rule-soft sm:grid-cols-2">
                {items.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="bg-paper p-5 hover:bg-paper-deep/40 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-ink">{benefit.name}</h4>
                    {benefit.description && (
                      <p className="font-serif text-sm text-ink-soft mt-1.5 leading-relaxed">
                        {benefit.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-rule">
          <Heart className="h-9 w-9 text-ink-muted/40 mx-auto mb-3" strokeWidth={1.25} />
          <p className="font-serif italic text-ink-muted">
            Aún no hay beneficios registrados para esta empresa.
          </p>
        </div>
      )}
    </div>
  )
}
