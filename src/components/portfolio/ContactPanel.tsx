interface Props {
  contactEmail?: string;
}

export function ContactPanel({ contactEmail }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "60px 24px", textAlign: "center" }}>
      <h2 style={{ margin: 0, fontSize: "clamp(2rem, 6vw, 4rem)", color: "#fff", fontWeight: 700, textShadow: "0px 0px 40px var(--main-decor-color)" }}>
        Contacto
      </h2>
      <div style={{ width: 120, height: 6, background: "var(--main-decor-color)", borderRadius: 4, margin: "18px 0" }} />

      <p style={{ maxWidth: 920, color: "rgba(255,255,255,0.85)", margin: "0 0 18px", fontSize: "1.05rem" }}>
        ¿Tienes un proyecto en mente? Hablemos y hagamos realidad tu visión audiovisual.
      </p>

      <div style={{ display: "flex", gap: 34, justifyContent: "center", alignItems: "center", marginTop: 8 }}>
        <a href="https://www.instagram.com/erick_.ramirez/" target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: 44 }} title="@erick_.ramirez">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/@erick_.ramirez" target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: 44 }} title="@erick_.ramirez">
          <i className="fab fa-tiktok"></i>
        </a>
        {contactEmail ? (
          <a href={`mailto:${contactEmail}`} style={{ color: "#fff", fontSize: 44 }} title="Email">
            <i className="fa fa-envelope"></i>
          </a>
        ) : (
          <a href="mailto:editor@example.com" style={{ color: "#fff", fontSize: 44 }} title="Email">
            <i className="fa fa-envelope"></i>
          </a>
        )}
      </div>
    </div>
  );
}

export default ContactPanel;
