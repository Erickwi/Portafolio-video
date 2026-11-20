interface Props {
  contactEmail?: string;
}

function getMailHref(email?: string): string {
  if (!email) return "mailto:editor@example.com";
  if (email.toLowerCase().endsWith("@gmail.com")) {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  }
  return `mailto:${email}`;
}

export function ContactPanel({ contactEmail }: Props) {
  const mailHref = getMailHref(contactEmail);

  return (
    <div
      id="contact"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "60px 24px",
        textAlign: "center",
        scrollMarginTop: 48,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(2rem, 6vw, 4rem)",
          color: "#fff",
          fontWeight: 700,
          textShadow: "0px 0px 40px var(--main-decor-color)",
        }}
      >
        Contacto
      </h2>
      <div
        style={{
          width: 120,
          height: 6,
          background: "var(--main-decor-color)",
          borderRadius: 4,
          margin: "18px 0",
        }}
      />

      <p
        style={{
          maxWidth: 920,
          color: "rgba(255,255,255,0.85)",
          margin: "0 0 18px",
          fontSize: "1.05rem",
        }}
      >
        ¿Tienes un proyecto en mente? Hablemos y hagamos realidad tu visión
        audiovisual.
      </p>

      <div
        style={{
          display: "flex",
          gap: 34,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <a
          href="https://www.instagram.com/erick_.ramirez/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#fff", fontSize: 44 }}
          title="@erick_.ramirez"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.tiktok.com/@erick_.ramirez"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#fff", fontSize: 44 }}
          title="@erick_.ramirez"
        >
          <i className="fab fa-tiktok"></i>
        </a>
        <a
          href={mailHref}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#fff",
            fontSize: 44,
            display: "inline-flex",
            alignItems: "center",
          }}
          title="Enviar correo"
          aria-label={`Enviar correo a ${contactEmail ?? "editor@example.com"}`}
        >
          <i className="fa fa-envelope"></i>
        </a>
      </div>

      <a
        href={mailHref}
        target="_blank"
        rel="noreferrer"
        style={{
          marginTop: 20,
          color: "var(--main-decor-color)",
          fontSize: "0.95rem",
          textDecoration: "none",
          borderBottom: "1px solid rgba(231, 76, 60, 0.4)",
        }}
      ></a>
    </div>
  );
}

export default ContactPanel;
