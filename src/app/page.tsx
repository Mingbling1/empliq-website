import { EditorialHeader } from "@/components/editorial/EditorialHeader";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { EditorialStats } from "@/components/editorial/EditorialStats";
import { HowItWorks } from "@/components/editorial/HowItWorks";
import { TestimonialsSection } from "@/components/editorial/TestimonialsSection";
import { SalaryDistributionCard } from "@/components/editorial/SalaryDistributionCard";
import { IndustryStrip } from "@/components/editorial/IndustryStrip";
import { ManifestoBlock } from "@/components/editorial/ManifestoBlock";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";
import { CookieBanner } from "@/components/CookieConsent";
import { getPlatformStats } from "@/lib/api-server";

const FALLBACK_STATS = {
  companies: 85000,
  reviews: 0,
  salaries: 0,
  benefits: 0,
  positions: 0,
  updatedAt: new Date().toISOString(),
};

export default async function Home() {
  const stats = (await getPlatformStats()) ?? FALLBACK_STATS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "empliq",
    url: "https://empliq.io",
    description:
      "Red anónima de profesionales peruanos. Sueldos reales, reseñas honestas y la verdad sobre cómo se trabaja en cada empresa del Perú.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PEN",
    },
    creator: {
      "@type": "Organization",
      name: "empliq",
      url: "https://empliq.io",
    },
    aggregateRating:
      stats.reviews > 0
        ? {
            "@type": "AggregateRating",
            ratingCount: stats.reviews,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    ...(stats.companies > 0 && {
      additionalProperty: [
        { "@type": "PropertyValue", name: "Total Companies", value: stats.companies },
        { "@type": "PropertyValue", name: "Total Salary Reports", value: stats.salaries },
        { "@type": "PropertyValue", name: "Total Reviews", value: stats.reviews },
      ],
    }),
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EditorialHeader />
      <main>
        <EditorialHero companies={stats.companies} />
        <EditorialStats
          companies={stats.companies}
          salaries={stats.salaries}
          reviews={stats.reviews}
          benefits={stats.benefits}
          updatedAt={stats.updatedAt}
        />
        <HowItWorks />
        <TestimonialsSection />
        <SalaryDistributionCard />
        <IndustryStrip />
        <ManifestoBlock />
      </main>
      <EditorialFooter />
      <CookieBanner />
    </div>
  );
}
