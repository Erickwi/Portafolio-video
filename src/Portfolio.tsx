import { type CSSProperties } from "react";
import { Scene, TextReveal, Progress, StickyHeader } from "react-kino";
import { HeroPanel } from "./components/portfolio/HeroPanel";
import { ProjectsPanel } from "./components/portfolio/ProjectsPanel";
import { TechMarquee } from "./components/portfolio/TechMarquee";
import ContactPanel from "./components/portfolio/ContactPanel";

interface PortfolioProps {
  name: string;
  role: string;
  bio: string;
  accentColor?: string;
  projects?: Array<{ title: string; description: string; year?: string | number; tags?: string[]; video?: string; tiktokProfile?: string; tiktokVideos?: string[] }>;
  contactEmail?: string;
  navItems?: Array<{ label: string; href?: string }>;
  showScrollHint?: boolean;
}

export function Portfolio({
  name,
  role,
  bio,
  accentColor = "#e74c3c",
  projects = [],
  contactEmail,
  navItems,
  showScrollHint = true,
}: PortfolioProps) {
  const baseStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    fontFamily: "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial",
    color: "#ffffff",
    background: "#0a0a0a",
  };

  const sectionCenter: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "0 24px",
    textAlign: "center",
  };

  return (
    <div style={baseStyle}>
      <Progress color={accentColor} position="top" />

      <StickyHeader
        threshold={40}
        background="rgba(10, 10, 10, 0.72)"
        blur
        style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {navItems && navItems.length > 0 && (
              <nav style={{ display: "flex", gap: 20 }}>
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href ?? "#"}
                    style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </StickyHeader>

      <HeroPanel name={name} role={role} accentColor={accentColor} showScrollHint={showScrollHint} />

      <Scene duration="200vh">
        <div style={sectionCenter}>
          <div style={{ maxWidth: 750, fontSize: "20px" }}>
            <TextReveal mode="word" at={0.05} span={0.85} color="#ffffff" dimColor="rgba(255,255,255,0.1)">
              {bio}
            </TextReveal>
          </div>
        </div>
      </Scene>

      <TechMarquee />
      <ProjectsPanel projects={projects} accentColor={accentColor} />
      <ContactPanel contactEmail={contactEmail} />
    </div>
  );
}

export default Portfolio;
