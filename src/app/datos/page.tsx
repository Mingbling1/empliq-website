import type { Metadata } from "next";
import { LegalDocument } from "@/components/editorial/LegalDocument";

export const metadata: Metadata = {
  title: "Datos Abiertos",
  description:
    "Cómo empliq publica sus datos agregados, qué incluyen y cómo descargarlos para investigación, periodismo o uso cívico.",
};

export default function DatosPage() {
  return (
    <LegalDocument
      folio="D · 01"
      eyebrow="Open data — Edición Lima 2026"
      title="Lo que la comunidad reporta, vuelve al país."
      lede="Los aportes de empliq se publican en formato agregado y abierto. Disponibles para investigadores, periodistas y oficinas públicas. Sin trámite, sin costo, sin permiso."
    >
      <section>
        <h2>Qué se publica</h2>
        <ul>
          <li>Distribución salarial por puesto, sector y región (mediana, p25, p75, n).</li>
          <li>Calificaciones agregadas por empresa (trato, cultura, honestidad).</li>
          <li>Catálogo de beneficios reportados por empresa.</li>
          <li>Series temporales: cómo evoluciona cada métrica trimestre a trimestre.</li>
        </ul>
      </section>

      <section>
        <h2>Qué nunca se publica</h2>
        <ul>
          <li>Reportes individuales atados a un alias o cuenta.</li>
          <li>Texto crudo de reseñas (solo se exponen métricas y categorías).</li>
          <li>Información que pueda permitir reidentificar al autor (k &lt; 5).</li>
        </ul>
      </section>

      <section>
        <h2>Cómo se anonimiza</h2>
        <p>
          Aplicamos k-anonimato sobre cada cruce: ninguna celda con menos de
          cinco aportes únicos sale al export público. Los puestos con muestras
          pequeñas se agrupan en su categoría madre antes de exponerlos.
        </p>
        <p>
          Los datos sensibles que aún no alcanzan el umbral se marcan{" "}
          <strong>n &lt; 5</strong> y se mantienen privados hasta acumular
          suficiente volumen.
        </p>
      </section>

      <section>
        <h2>Licencia y atribución</h2>
        <p>
          Los datos abiertos se publican bajo licencia Creative Commons{" "}
          <strong>CC BY-SA 4.0</strong>. Puedes reutilizarlos, redistribuirlos
          y construir productos sobre ellos siempre que cites a empliq y
          mantengas la misma licencia en derivados.
        </p>
      </section>

      <section>
        <h2>Descargas</h2>
        <p>
          Los exports CSV/Parquet se publicarán cada trimestre en este sitio
          junto con un changelog firmado y un resumen metodológico. La primera
          versión pública (Lima 2026 Q3) se libera al cierre de esta edición.
        </p>
        <p className="pull-aside">
          <strong>¿Necesitas un cruce específico?</strong> Si trabajas en
          investigación académica, periodismo de datos u oficina pública,
          escríbenos a{" "}
          <a href="mailto:datos@empliq.io">datos@empliq.io</a> con tu pregunta
          de investigación. Hacemos cruces a medida sin costo bajo acuerdo de
          uso responsable.
        </p>
      </section>

      <section>
        <h2>Código y reproducibilidad</h2>
        <p>
          El código que genera los exports está abierto bajo licencia MIT. La
          metodología de agregación y el control de k-anonimato son auditables
          en el repositorio. Cualquier crítica metodológica se discute en
          público.
        </p>
      </section>
    </LegalDocument>
  );
}
