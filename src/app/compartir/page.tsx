import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Lock, Building2, DollarSign, MessageSquare } from "lucide-react";
import { EditorialHeader } from "@/components/editorial/EditorialHeader";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";

export const metadata: Metadata = {
  title: "Comparte lo que sabes",
  description:
    "Suma tu sueldo, reseña o beneficio al archivo público. 100% anónimo, login con Google. Tres minutos para mover la aguja.",
};

const STEPS = [
  {
    icon: Building2,
    eyebrow: "01 · Encuentra",
    title: "la empresa peruana",
    body: "Busca por nombre o RUC. Si no aparece, agrégala. SUNAT confirma que existe.",
    href: "/empresas",
    cta: "Ir al directorio",
  },
  {
    icon: DollarSign,
    eyebrow: "02 · Comparte",
    title: "tu sueldo, reseña o beneficio",
    body: "Reporte por puesto, periodo y experiencia. Reseña por trato, cultura y honestidad. Cada dato suma al promedio.",
    href: "/login",
    cta: "Iniciar sesión",
  },
  {
    icon: MessageSquare,
    eyebrow: "03 · Quédate",
    title: "siendo invisible",
    body: "Tu alias permanente firma el aporte. Ni tu empresa, ni tus colegas, ni nosotros podemos mapearlo a tu nombre.",
    href: "/anonimato",
    cta: "Cómo funciona",
  },
];

export default function CompartirPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <EditorialHeader overHero={false} />
      <main className="flex-1 pt-24 lg:pt-28">
        <header className="border-b border-rule">
          <div className="mx-auto max-w-[92rem] px-6 lg:px-10 py-12 lg:py-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 label-mono hover:text-ink transition-colors"
            >
              <ArrowLeft className="size-3" />
              Volver al inicio
            </Link>

            <div className="mt-8 grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-9">
                <p className="label-mono mb-3">C · 01 · Aporta al archivo</p>
                <h1 className="headline-display text-ink text-[clamp(2.25rem,5vw,4rem)] font-light max-w-[22ch]">
                  Tu cifra mueve la <em className="not-italic font-normal">aguja del país</em>.
                </h1>
                <p className="font-serif italic text-ink-soft text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed mt-5 max-w-[60ch]">
                  Tres minutos para reportar lo que ganas, lo que aguantas o lo
                  que te prometieron. Tu identidad jamás aparece. Tu cifra sí.
                </p>
              </div>
              <div className="lg:col-span-3 lg:text-right flex lg:justify-end items-center gap-2 text-ink-muted">
                <Lock className="size-4" />
                <span className="label-mono">100% anónimo · login con Google</span>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[92rem] px-6 lg:px-10 py-12 lg:py-20">
          <ol className="grid gap-px bg-rule sm:grid-cols-3 border border-rule">
            {STEPS.map(({ icon: Icon, eyebrow, title, body, href, cta }) => (
              <li
                key={eyebrow}
                className="bg-paper p-6 lg:p-8 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <Icon className="size-5 text-ink-muted" strokeWidth={1.5} />
                  <span className="label-mono">{eyebrow}</span>
                </div>
                <h2 className="font-display italic text-2xl text-ink leading-tight">
                  {title}
                </h2>
                <p className="font-serif text-ink-soft leading-relaxed flex-1">
                  {body}
                </p>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-vermillion transition-colors mt-2"
                >
                  {cta}
                  <ArrowRight className="size-3.5" />
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-16 lg:mt-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start border-t border-rule pt-12">
            <div>
              <p className="label-mono mb-3">¿Por qué aportar?</p>
              <h3 className="font-display italic text-3xl text-ink leading-tight">
                Lo que tú ya sabes le falta a quien recién postula.
              </h3>
            </div>
            <p className="font-serif text-ink-soft text-lg leading-relaxed">
              Una sola cifra honesta — tu sueldo de hace dos años, la reseña que
              nunca escribiste, el beneficio que nunca usaste — puede evitar
              que un peruano firme un contrato que no le conviene. Multiplicado
              por miles, es otro mercado laboral.
            </p>
          </div>

          <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-ink p-6 lg:p-8">
            <div>
              <p className="label-mono mb-1">Listo para empezar</p>
              <p className="font-serif text-xl text-ink">
                Inicia sesión con Google. Tu identidad jamás se publica.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-vermillion text-paper font-medium hover:bg-vermillion-deep transition-colors"
            >
              Iniciar sesión
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </div>
  );
}
