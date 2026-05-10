import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Github, Twitter } from "lucide-react";
import { EditorialHeader } from "@/components/editorial/EditorialHeader";
import { EditorialFooter } from "@/components/editorial/EditorialFooter";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cómo escribirle a empliq según el motivo: legal, prensa, datos, soporte o reportes de seguridad.",
};

const CHANNELS = [
  {
    folio: "01",
    title: "Soporte y comunidad",
    body: "Dudas sobre tu cuenta, cómo aportar o cómo se mueve la plataforma.",
    email: "hola@empliq.io",
  },
  {
    folio: "02",
    title: "Prensa y medios",
    body: "Solicitudes de entrevistas, datos para reportajes, vocería editorial.",
    email: "prensa@empliq.io",
  },
  {
    folio: "03",
    title: "Datos abiertos e investigación",
    body: "Cruces a medida para academia, periodismo de datos u oficinas públicas.",
    email: "datos@empliq.io",
  },
  {
    folio: "04",
    title: "Privacidad y derechos ARCO",
    body: "Acceso, rectificación, cancelación u oposición sobre tus datos personales.",
    email: "privacidad@empliq.io",
  },
  {
    folio: "05",
    title: "Asuntos legales",
    body: "Términos de servicio, propiedad intelectual, requerimientos formales.",
    email: "legal@empliq.io",
  },
  {
    folio: "06",
    title: "Reportes de seguridad",
    body: "Vulnerabilidades, fugas o cualquier hallazgo que rompa el anonimato.",
    email: "seguridad@empliq.io",
  },
];

export default function ContactoPage() {
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
                <p className="label-mono mb-3">C · 02 · Canales editoriales</p>
                <h1 className="headline-display text-ink text-[clamp(2.25rem,5vw,4rem)] font-light max-w-[22ch]">
                  Cada motivo tiene su <em className="not-italic font-normal">buzón</em>.
                </h1>
                <p className="font-serif italic text-ink-soft text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed mt-5 max-w-[60ch]">
                  empliq es un proyecto pequeño con prioridades claras. Escribe
                  al canal que corresponda para que tu mensaje llegue a quien
                  puede responder.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[92rem] px-6 lg:px-10 py-12 lg:py-20">
          <ul className="border-t border-rule">
            {CHANNELS.map((c) => (
              <li
                key={c.email}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-b border-rule items-baseline"
              >
                <p className="label-mono md:col-span-1">{c.folio}</p>
                <div className="md:col-span-5">
                  <h2 className="font-display italic text-2xl text-ink leading-tight">
                    {c.title}
                  </h2>
                  <p className="font-serif text-ink-soft mt-2 leading-relaxed">
                    {c.body}
                  </p>
                </div>
                <div className="md:col-span-6 md:text-right">
                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex items-center gap-2 font-mono text-base text-ink hover:text-vermillion transition-colors"
                  >
                    <Mail className="size-4" strokeWidth={1.5} />
                    {c.email}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-16 lg:mt-20 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between border-t border-rule pt-10">
            <p className="font-serif italic text-ink-soft max-w-[42ch]">
              Equipo distribuido en Lima · Respondemos en español o inglés ·
              48 horas hábiles promedio.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/empliq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-ink-soft hover:text-ink transition-colors"
              >
                <Github className="size-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://twitter.com/empliq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-ink-soft hover:text-ink transition-colors"
              >
                <Twitter className="size-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <EditorialFooter />
    </div>
  );
}
