import { memo, useEffect, useState } from "react";
import { Scene, Parallax } from "react-kino";

interface Props {
  name: string;
  role: string;
  accentColor?: string;
  showScrollHint?: boolean;
}

export const HeroPanel = memo(function HeroPanel({ name, role, accentColor = "#e74c3c", showScrollHint = true }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)", borderTopColor: accentColor, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <Scene duration="150vh">
      {(progress) => (
        <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
          <Parallax speed={0.3}>
            <div
              style={{
                position: "absolute",
                inset: "-10%",
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </Parallax>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              padding: "0 24px",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}>
            <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, margin: 0 }}>{name}</h1>
            <p
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: accentColor, marginTop: 12, fontWeight: 500 }}>
              {role}
            </p>

            {showScrollHint && (
              <div
                style={{
                  position: "absolute",
                  bottom: 40,
                  opacity: Math.max(0, 1 - progress * 5),
                  fontSize: "1.5rem",
                  color: "rgba(255,255,255,0.4)",
                }}>
                &#8595;
              </div>
            )}
          </div>
        </div>
      )}
    </Scene>
  );
});
