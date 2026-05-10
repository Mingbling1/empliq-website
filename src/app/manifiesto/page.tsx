import type { Metadata } from "next";
import { LegalDocument } from "@/components/editorial/LegalDocument";

export const metadata: Metadata = {
  title: "Manifiesto",
  description:
    "Por qué empliq existe, qué creemos y cómo defendemos la transparencia laboral peruana sin exponer a quienes la sostienen.",
};

export default function ManifiestoPage() {
  return (
    <LegalDocument
      folio="M · 01"
      eyebrow="Manifiesto editorial"
      title="La otra versión, escrita por quienes la viven."
      lede="empliq nace porque la información laboral del Perú está rota: contratos vagos, sueldos en sobres, promesas en entrevistas que nadie cumple. Esto es lo que creemos."
    >
      <section>
        <h2>El silencio cuesta</h2>
        <p>
          En el Perú, hablar de cuánto ganas sigue siendo tabú. Ese silencio no
          protege al trabajador: protege al sistema que paga distinto a quien
          tiene apellido, carrera o rosca. Cuando nadie comparte la cifra, todos
          aceptamos la primera oferta, agradecidos.
        </p>
        <p>
          empliq existe para romper ese silencio sin pedirle el cuello a nadie.
        </p>
      </section>

      <section>
        <h2>Anonimato como herramienta política</h2>
        <p>
          La transparencia sin protección es trampa. Aquí, ningún sueldo, reseña
          ni reporte se vincula públicamente con tu cuenta. La identidad se
          desacopla del contenido por diseño técnico — no por buena voluntad ni
          por política revisable.
        </p>
        <ul>
          <li>Sin nombres reales asociados al contenido.</li>
          <li>Sin metadatos que permitan triangular al autor.</li>
          <li>Sin contratos con empresas que pidan revelar a quién quejarse.</li>
        </ul>
      </section>

      <section>
        <h2>Datos verificados, no virales</h2>
        <p>
          No premiamos el comentario más enojado ni el más viral. Premiamos al
          dato útil: el sueldo con periodo claro, la reseña con detalle
          verificable, el beneficio que la empresa publicita y el que esconde.
          La comunidad valida; nosotros moderamos sin tomar partido.
        </p>
      </section>

      <section>
        <h2>Cero pauta, cero paywall, cero venta</h2>
        <p>
          Las empresas no pueden comprar su perfil aquí. No vendemos datos a
          headhunters. No insertamos publicidad encubierta dentro de las
          reseñas. Nos sostienen aportes voluntarios de quienes creen que la
          transparencia laboral es un bien público.
        </p>
      </section>

      <section>
        <h2>Lo que documentamos, queda</h2>
        <p>
          Una empresa puede cambiar de nombre, de dueño, de fachada. Pero el
          archivo permanece. Cada testimonio firmado por un alias anónimo
          permanente construye un registro histórico al que cualquier postulante
          puede acudir antes de firmar.
        </p>
      </section>

      <section>
        <h2>Open data, código abierto</h2>
        <p>
          El código de empliq es abierto bajo licencia MIT. Los agregados
          estadísticos están disponibles para investigadores, periodistas y
          oficinas públicas que quieran cruzarlos con SUNAT, MTPE o INEI. La
          transparencia que pedimos a las empresas también nos la aplicamos a
          nosotros.
        </p>
      </section>

      <section>
        <h2>Esto recién empieza</h2>
        <p>
          Lima 2026 es la edición 01. Vienen ediciones por región, por sector,
          por escala salarial. Cada peruano que comparta una cifra mueve la
          aguja un milímetro. Multiplicado por 85,000 empresas, eso es un país
          distinto.
        </p>
        <p className="pull-aside">
          <strong>Si trabajaste, sabes.</strong> empliq es el lugar donde lo que
          sabes deja de ser tu carga privada y empieza a ser información útil
          para alguien más.
        </p>
      </section>
    </LegalDocument>
  );
}
