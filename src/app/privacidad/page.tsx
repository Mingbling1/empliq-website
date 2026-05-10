import type { Metadata } from "next";
import { LegalDocument } from "@/components/editorial/LegalDocument";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y protección de datos personales de empliq, conforme a la Ley 29733 de Protección de Datos Personales del Perú.",
};

export default function PrivacidadPage() {
  return (
    <LegalDocument
      folio="L · 02"
      eyebrow="Tratamiento de datos personales"
      title="Política de Privacidad"
      lede="Cumplimos con la Ley N° 29733 — Ley de Protección de Datos Personales del Perú — y su Reglamento aprobado por Decreto Supremo N° 003-2013-JUS. Tu privacidad es fundamental."
    >
      <section>
        <h2>Responsable del Tratamiento</h2>
        <p>
          empliq es la plataforma responsable del tratamiento de tus datos
          personales. Para cualquier consulta relacionada con la protección de
          tus datos, puedes contactarnos en{" "}
          <a href="mailto:privacidad@empliq.io">privacidad@empliq.io</a>.
        </p>
      </section>

      <section>
        <h2>Datos que Recopilamos</h2>

        <h3>Datos de registro (Google OAuth)</h3>
        <ul>
          <li>Nombre completo proporcionado por Google.</li>
          <li>Dirección de correo electrónico.</li>
          <li>Foto de perfil de Google (opcional).</li>
        </ul>

        <h3>Datos aportados voluntariamente</h3>
        <ul>
          <li>Información salarial (monto, moneda, periodo).</li>
          <li>Reseñas de empresas (calificación, opiniones).</li>
          <li>Cargo o posición laboral.</li>
          <li>Años de experiencia.</li>
        </ul>
        <p className="pull-aside">
          <strong>Importante:</strong> los datos salariales y reseñas se publican
          de forma completamente anónima. No se vincula públicamente tu identidad
          con el contenido que aportas. Esto está garantizado por diseño en
          nuestra arquitectura técnica.
        </p>

        <h3>Datos técnicos</h3>
        <ul>
          <li>Dirección IP (para seguridad y prevención de abuso).</li>
          <li>Tipo de navegador y dispositivo.</li>
          <li>Páginas visitadas y tiempo de navegación.</li>
        </ul>
      </section>

      <section>
        <h2>Finalidad del Tratamiento</h2>
        <p>
          Conforme al artículo 5 de la Ley 29733, tus datos se tratan para las
          siguientes finalidades:
        </p>
        <ul>
          <li><strong>Prestación del servicio:</strong> permitirte acceder y usar las funcionalidades de empliq.</li>
          <li><strong>Anonimización:</strong> desvincular tu identidad de los datos salariales y reseñas que aportas.</li>
          <li><strong>Seguridad:</strong> prevenir fraude, abuso y accesos no autorizados.</li>
          <li><strong>Mejora del servicio:</strong> analizar patrones de uso para mejorar la experiencia.</li>
          <li><strong>Comunicaciones:</strong> enviar notificaciones sobre tu cuenta (si las activas).</li>
        </ul>
      </section>

      <section>
        <h2>Base Legal del Tratamiento</h2>
        <p>El tratamiento de tus datos se basa en:</p>
        <ul>
          <li>
            <strong>Consentimiento (Art. 13.5, Ley 29733):</strong> al crear tu cuenta y
            aceptar estos términos, otorgas consentimiento libre, informado, expreso e inequívoco.
          </li>
          <li>
            <strong>Ejecución contractual:</strong> necesario para la prestación del servicio
            que solicitas al registrarte.
          </li>
          <li>
            <strong>Interés legítimo:</strong> para la seguridad de la plataforma y prevención de abuso.
          </li>
        </ul>
      </section>

      <section>
        <h2>Anonimización de Datos</h2>
        <p>empliq implementa un sistema de anonimización por diseño:</p>
        <ul>
          <li>Los datos salariales se almacenan sin vinculación directa a tu cuenta de usuario.</li>
          <li>Las reseñas se publican sin mostrar tu nombre ni correo electrónico.</li>
          <li>
            No es posible para otros usuarios, empresas ni terceros identificar
            al autor de una reseña o dato salarial.
          </li>
          <li>
            Este diseño cumple con el principio de minimización de datos
            establecido en la Ley 29733.
          </li>
        </ul>
      </section>

      <section>
        <h2>Derechos ARCO</h2>
        <p>
          Conforme a los artículos 18-27 de la Ley 29733, tienes los siguientes
          derechos sobre tus datos personales:
        </p>
        <ul>
          <li><strong>Acceso:</strong> solicitar información sobre qué datos tuyos tenemos.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
          <li><strong>Cancelación:</strong> solicitar la eliminación de tus datos.</li>
          <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos para fines específicos.</li>
        </ul>
        <p>
          Para ejercer estos derechos, envía un correo a{" "}
          <a href="mailto:privacidad@empliq.io">privacidad@empliq.io</a> con tu
          solicitud. Responderemos en un plazo máximo de 10 días hábiles.
        </p>
      </section>

      <section>
        <h2>Almacenamiento y Seguridad</h2>
        <ul>
          <li>Tus datos se almacenan en servidores seguros con cifrado en tránsito (TLS) y en reposo.</li>
          <li>Utilizamos autenticación OAuth 2.0 a través de Google, sin almacenar contraseñas.</li>
          <li>El acceso a la base de datos está restringido y protegido por firewalls.</li>
          <li>Realizamos respaldos periódicos y monitoreo de seguridad.</li>
        </ul>
      </section>

      <section>
        <h2>Transferencia Internacional de Datos</h2>
        <p>
          Tus datos pueden ser procesados en servidores ubicados fuera del Perú
          (infraestructura en la nube). En estos casos, garantizamos un nivel de
          protección equivalente al exigido por la Ley 29733 y cumplimos con lo
          establecido en el artículo 15 de dicha ley sobre flujo transfronterizo
          de datos personales.
        </p>
      </section>

      <section>
        <h2>Cookies y Tecnologías Similares</h2>
        <p>empliq utiliza cookies esenciales para:</p>
        <ul>
          <li><strong>Autenticación:</strong> mantener tu sesión activa.</li>
          <li><strong>Preferencias:</strong> recordar tu configuración (moneda, idioma).</li>
        </ul>
        <p>
          No utilizamos cookies de terceros con fines publicitarios ni de
          seguimiento (tracking). No compartimos datos con redes publicitarias.
        </p>
      </section>

      <section>
        <h2>Menores de Edad</h2>
        <p>
          empliq no está dirigido a menores de 18 años. No recopilamos
          intencionalmente datos de menores. Si detectamos que un menor ha
          proporcionado datos, procederemos a eliminarlos.
        </p>
      </section>

      <section>
        <h2>Retención de Datos</h2>
        <ul>
          <li>
            <strong>Cuenta activa:</strong> conservamos tus datos mientras
            mantengas tu cuenta.
          </li>
          <li>
            <strong>Eliminación de cuenta:</strong> al solicitar la eliminación
            de tu cuenta, borraremos tus datos personales en un plazo de 30 días.
            Los datos anonimizados (salarios, reseñas) permanecerán en la
            plataforma ya que no son identificables.
          </li>
          <li>
            <strong>Obligación legal:</strong> algunos datos pueden conservarse
            por plazos adicionales si la ley lo requiere.
          </li>
        </ul>
      </section>

      <section>
        <h2>Autoridad de Protección de Datos</h2>
        <p>
          Si consideras que tus derechos han sido vulnerados, puedes presentar
          una reclamación ante la Autoridad Nacional de Protección de Datos
          Personales (ANPDP), adscrita al Ministerio de Justicia y Derechos
          Humanos del Perú.
        </p>
        <p>
          Dirección: Scipión Llona 350, Miraflores, Lima 15074, Perú.
          <br />
          Web:{" "}
          <a
            href="https://www.gob.pe/anpd"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.gob.pe/anpd
          </a>
        </p>
      </section>

      <section>
        <h2>Modificaciones</h2>
        <p>
          Nos reservamos el derecho de actualizar esta política. Notificaremos
          cambios significativos a través de la Plataforma o por correo
          electrónico. La versión vigente siempre estará disponible en esta
          página.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>
          Para cualquier consulta sobre esta política de privacidad:{" "}
          <a href="mailto:privacidad@empliq.io">privacidad@empliq.io</a>.
        </p>
      </section>
    </LegalDocument>
  );
}
