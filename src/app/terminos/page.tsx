import type { Metadata } from "next";
import { LegalDocument } from "@/components/editorial/LegalDocument";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description:
    "Términos y condiciones de uso de la plataforma empliq. Conoce tus derechos y obligaciones como usuario.",
};

export default function TerminosPage() {
  return (
    <LegalDocument
      folio="L · 01"
      eyebrow="Documento normativo"
      title="Términos de Servicio"
      lede="El acuerdo que regula tu uso de empliq. Escrito en lenguaje claro, conforme al Código Civil peruano y a la Ley 29571 de Protección al Consumidor."
    >
      <section>
        <h2>Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar empliq (&laquo;la Plataforma&raquo;), aceptas
          quedar vinculado por estos Términos de Servicio. Si no estás de
          acuerdo con alguno de estos términos, no debes utilizar la Plataforma.
        </p>
        <p>
          empliq es una plataforma de transparencia laboral que opera bajo las
          leyes de la República del Perú. Estos términos se rigen por la
          legislación peruana vigente, incluyendo el Código Civil, la Ley de
          Protección al Consumidor (Ley 29571) y la Ley de Protección de Datos
          Personales (Ley 29733).
        </p>
      </section>

      <section>
        <h2>Descripción del Servicio</h2>
        <p>empliq proporciona una plataforma donde los usuarios pueden:</p>
        <ul>
          <li>Consultar información salarial reportada anónimamente por otros usuarios.</li>
          <li>Leer y escribir reseñas sobre empresas peruanas.</li>
          <li>Explorar beneficios laborales reportados por empleados.</li>
          <li>Acceder a información pública de empresas registradas ante SUNAT.</li>
        </ul>
        <p>
          La información disponible en empliq es proporcionada por usuarios de
          forma voluntaria y anónima. empliq no garantiza la exactitud, veracidad
          o completitud de dicha información.
        </p>
      </section>

      <section>
        <h2>Registro y Cuenta de Usuario</h2>
        <p>
          Para acceder a ciertas funcionalidades, debes crear una cuenta utilizando
          el método de autenticación disponible (Google OAuth). Al registrarte:
        </p>
        <ul>
          <li>Garantizas que la información proporcionada es verídica.</li>
          <li>Eres responsable de mantener la confidencialidad de tu cuenta.</li>
          <li>Aceptas notificar inmediatamente cualquier uso no autorizado de tu cuenta.</li>
          <li>Debes ser mayor de 18 años para utilizar la Plataforma.</li>
        </ul>
      </section>

      <section>
        <h2>Contenido del Usuario</h2>
        <p>
          Al publicar contenido en empliq (reseñas, datos salariales, opiniones), declaras que:
        </p>
        <ul>
          <li>El contenido se basa en tu experiencia laboral real y directa.</li>
          <li>No incluyes información falsa, difamatoria o malintencionada.</li>
          <li>No violas acuerdos de confidencialidad (NDA) ni secretos comerciales.</li>
          <li>No publicas datos personales de terceros sin su consentimiento.</li>
          <li>
            Otorgas a empliq una licencia no exclusiva, mundial y gratuita para
            usar, mostrar y distribuir dicho contenido en la Plataforma.
          </li>
        </ul>
        <p>
          empliq se reserva el derecho de moderar, editar o eliminar contenido que
          viole estos términos o que sea reportado por otros usuarios.
        </p>
      </section>

      <section>
        <h2>Uso Aceptable</h2>
        <p>Te comprometes a no:</p>
        <ul>
          <li>Utilizar la Plataforma para fines ilegales o no autorizados.</li>
          <li>Publicar contenido ofensivo, discriminatorio o que atente contra la dignidad de las personas.</li>
          <li>Intentar acceder a cuentas de otros usuarios o a sistemas internos de empliq.</li>
          <li>Realizar scraping, crawling o extracción masiva de datos sin autorización.</li>
          <li>Manipular calificaciones o publicar reseñas falsas.</li>
          <li>Utilizar la Plataforma para acosar, intimidar o difamar a personas o empresas.</li>
        </ul>
      </section>

      <section>
        <h2>Propiedad Intelectual</h2>
        <p>
          El diseño, código fuente, logotipos y marca &laquo;empliq&raquo; son
          propiedad de sus creadores. empliq es un proyecto de código abierto
          bajo licencia MIT en lo que respecta a su código fuente. El contenido
          generado por usuarios permanece como propiedad de sus autores, sujeto
          a la licencia de uso otorgada en la sección 04.
        </p>
      </section>

      <section>
        <h2>Información de Empresas</h2>
        <p>
          La información de empresas mostrada en empliq proviene de fuentes
          públicas (SUNAT, registros comerciales) y de reportes de usuarios. empliq:
        </p>
        <ul>
          <li>No se hace responsable por la exactitud de la información pública mostrada.</li>
          <li>No tiene relación contractual ni comercial con las empresas listadas.</li>
          <li>Respeta el derecho de las empresas a solicitar corrección de información incorrecta.</li>
        </ul>
      </section>

      <section>
        <h2>Limitación de Responsabilidad</h2>
        <p>
          empliq se proporciona &laquo;tal cual&raquo; y &laquo;según
          disponibilidad&raquo;. No garantizamos que:
        </p>
        <ul>
          <li>El servicio sea ininterrumpido, seguro o libre de errores.</li>
          <li>Los datos salariales reflejen con exactitud las condiciones del mercado laboral.</li>
          <li>Las reseñas representen la experiencia de todos los empleados de una empresa.</li>
        </ul>
        <p>
          En ningún caso empliq será responsable por daños directos, indirectos,
          incidentales o consecuentes derivados del uso de la Plataforma,
          conforme a lo establecido en el Código Civil peruano (artículos 1314-1332).
        </p>
      </section>

      <section>
        <h2>Resolución de Controversias</h2>
        <p>
          Cualquier controversia derivada de estos términos se resolverá de
          acuerdo con la legislación peruana. Las partes acuerdan someterse a
          la jurisdicción de los tribunales de Lima, Perú. Antes de iniciar
          cualquier procedimiento legal, las partes intentarán resolver el
          conflicto de manera amigable mediante comunicación directa.
        </p>
      </section>

      <section>
        <h2>Modificaciones</h2>
        <p>
          empliq se reserva el derecho de modificar estos términos en cualquier
          momento. Los cambios serán efectivos al ser publicados en esta página.
          El uso continuado de la Plataforma después de cualquier modificación
          constituye la aceptación de los nuevos términos.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>
          Para consultas sobre estos términos, puedes contactarnos en{" "}
          <a href="mailto:legal@empliq.io">legal@empliq.io</a>.
        </p>
      </section>
    </LegalDocument>
  );
}
