import type { Metadata } from "next";
import { LegalDocument } from "@/components/editorial/LegalDocument";

export const metadata: Metadata = {
  title: "Política de Anonimato",
  description:
    "Cómo empliq garantiza, por diseño técnico, que tu identidad nunca pueda vincularse al contenido que aportas.",
};

export default function AnonimatoPage() {
  return (
    <LegalDocument
      folio="L · 03"
      eyebrow="Compromiso técnico"
      title="Política de Anonimato"
      lede="Tu nombre nunca está pegado a un sueldo, una reseña ni un beneficio. Esto no es una promesa: es una decisión de arquitectura."
    >
      <section>
        <h2>Qué garantizamos</h2>
        <ul>
          <li>Ninguna reseña, sueldo o beneficio muestra tu nombre real, foto ni correo.</li>
          <li>El contenido se publica con un alias anónimo permanente generado por nosotros.</li>
          <li>Ni otros usuarios, ni la empresa reseñada, ni terceros pueden mapear el alias a tu identidad.</li>
        </ul>
      </section>

      <section>
        <h2>Cómo lo hacemos</h2>
        <p>
          La cuenta (Google OAuth) y el contenido aportado se almacenan en
          tablas separadas. La pieza que une ambos es un identificador interno
          jamás expuesto al cliente, accesible solo en operaciones de
          moderación bajo registro auditable.
        </p>
        <ul>
          <li>El feed público consume vistas que excluyen el campo de unión.</li>
          <li>La API no devuelve la identidad del autor en ningún endpoint público.</li>
          <li>Los exportes de open data ya vienen agregados o k-anonimizados.</li>
        </ul>
      </section>

      <section>
        <h2>Qué no hacemos</h2>
        <ul>
          <li>No vendemos datos a empresas, headhunters ni agencias.</li>
          <li>No permitimos a una empresa solicitar la identidad de un reseñador.</li>
          <li>No usamos cookies de tracking publicitario ni redes de retargeting.</li>
          <li>No mostramos tu IP, dispositivo ni ubicación junto al contenido.</li>
        </ul>
      </section>

      <section>
        <h2>Cuándo podríamos romper el anonimato</h2>
        <p>
          Solo bajo orden judicial firme emitida por autoridad peruana
          competente, en investigación de delito grave (acoso, amenaza,
          calumnia probada). Cualquier solicitud no judicial — incluyendo
          requerimientos administrativos, comerciales o internacionales — es
          rechazada. Publicaremos un informe anual de transparencia con la
          cantidad de solicitudes recibidas y atendidas.
        </p>
      </section>

      <section>
        <h2>Si encuentras una falla</h2>
        <p>
          Si descubres una manera de vincular un alias con una identidad real,
          escríbenos a{" "}
          <a href="mailto:seguridad@empliq.io">seguridad@empliq.io</a>. Las
          fallas confirmadas se publican (sin detalles explotables) y se
          recompensan con un crédito en el repositorio.
        </p>
        <p className="pull-aside">
          <strong>Anonimato no es opacidad.</strong> Cada decisión que toma
          empliq sobre tus datos está documentada en este sitio y en el código
          público. Lo que ocultamos es tu identidad, no nuestras prácticas.
        </p>
      </section>
    </LegalDocument>
  );
}
