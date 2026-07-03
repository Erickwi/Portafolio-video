import { lazy, memo, Suspense } from "react";

const Scene = lazy(() => import("react-kino").then((m) => ({ default: m.Scene })));

interface Project {
  title: string;
  description: string;
  image?: string;
  video?: string;
  year?: string | number;
  tiktokProfile?: string;
  tiktokVideos?: string[];
}

interface Props {
  projects: Project[];
  accentColor?: string;
}

function getVideoId(url: string): string {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : "";
}

function TikTokEmbed({ url }: { url: string }) {
  const videoId = getVideoId(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 8,
        padding: "10px 18px",
        color: "rgba(255,255,255,0.8)",
        fontSize: "0.85rem",
        textDecoration: "none",
        transition: "background 0.2s",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
      <i className="fab fa-tiktok" style={{ fontSize: "1.1rem" }} />
      <span>Ver video</span>
      <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>#{videoId.slice(-4)}</span>
    </a>
  );
}

export const ProjectsPanel = memo(function ProjectsPanel({ projects, accentColor = "#e74c3c" }: Props) {
  return (
    <>
      {projects.length > 0 && (
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Scene duration={`${Math.max(projects.length * 120, 400)}vh`}>
            {(progress) => {
              const n = projects.length;
              const active = Math.min(n - 1, Math.floor(progress * n));
              const fill = Math.min(100, n > 1 ? ((progress * n) / (n - 1)) * 100 : progress * 100);

              return (
                <section
                  id="experience"
                  style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: "clamp(180px, 18vh, 260px) clamp(16px, 4vw, 48px) 0",
                    scrollMarginTop: "clamp(180px, 18vh, 260px)",
                    maxWidth: 1080,
                    margin: "0 auto",
                  }}>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: 24,
                    }}>
                    Proyectos
                  </p>

                  <div style={{ display: "flex", gap: "clamp(20px, 4vw, 80px)" }}>
                    <div style={{ width: "clamp(100px, 22vw, 200px)", flexShrink: 0, position: "relative" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: "clamp(6px, 1.2vw, 10px)",
                          top: "clamp(6px, 1.2vw, 10px)",
                          bottom: "clamp(6px, 1.2vw, 10px)",
                          width: 2,
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 1,
                        }}>
                        <div
                          style={{
                            width: "100%",
                            height: `${fill}%`,
                            background: accentColor,
                            transition: "height 0.4s ease-out",
                            borderRadius: 1,
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: 300,
                        }}>
                        {projects.map((project, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "clamp(8px, 2vw, 18px)",
                              position: "relative",
                              zIndex: 1,
                              cursor: "default",
                            }}>
                            <div
                              style={{
                                width: "clamp(14px, 3vw, 22px)",
                                height: "clamp(14px, 3vw, 22px)",
                                borderRadius: "50%",
                                background: i <= active ? accentColor : "rgba(255,255,255,0.08)",
                                boxShadow: i === active ? `0 0 0 4px #0a0a0a, 0 0 20px ${accentColor}40` : "none",
                                transition: "all 0.4s",
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontSize: "clamp(11px, 1.8vw, 14px)",
                                fontWeight: i === active ? 600 : 400,
                                color: i <= active ? "#f5f5f7" : "rgba(255,255,255,0.25)",
                                transition: "all 0.4s",
                              }}>
                              {project.year ?? ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ flex: 1, position: "relative", minHeight: 400 }}>
                      {projects.map((project, i) => (
                        <div
                          key={i}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            opacity: i === active ? 1 : 0,
                            transform: `translateY(${i === active ? 0 : i > active ? 24 : -24}px)`,
                            transition: "opacity 0.5s, transform 0.5s",
                            pointerEvents: i === active ? "auto" : "none",
                          }}>
                          <div style={{ display: "flex", gap: "clamp(24px, 4vw, 48px)", alignItems: "flex-start" }}>
                            <div style={{ flex: "1 1 50%", minWidth: 0 }}>
                              <h3
                                style={{
                                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                                  fontWeight: 700,
                                  margin: "0 0 10px",
                                  color: "#f5f5f7",
                                }}>
                                {project.title}
                              </h3>
                              <p
                                style={{
                                  fontSize: "1rem",
                                  color: "rgba(255,255,255,0.5)",
                                  lineHeight: 1.6,
                                  margin: "0 0 16px",
                                }}>
                                {project.description}
                              </p>

                              {project.tiktokProfile && (
                                <a
                                  href={project.tiktokProfile}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    color: accentColor,
                                    fontSize: "0.9rem",
                                    textDecoration: "none",
                                    marginBottom: 16,
                                  }}>
                                  <i className="fab fa-tiktok" style={{ fontSize: "1.2rem" }} />
                                  <span style={{ borderBottom: `1px solid ${accentColor}40` }}>
                                    {project.tiktokProfile.replace("https://www.tiktok.com/", "")}
                                  </span>
                                </a>
                              )}

                              {project.tiktokVideos && project.tiktokVideos.length > 0 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                  {project.tiktokVideos.map((url, vi) => (
                                    <TikTokEmbed key={vi} url={url} />
                                  ))}
                                </div>
                              )}
                            </div>

                            {project.video && (
                              <div style={{ flex: "0 0 280px", minWidth: 0 }}>
                                <video
                                  controls
                                  style={{ width: "100%", borderRadius: 8, boxShadow: "0 6px 24px rgba(0,0,0,0.4)" }}>
                                  <source
                                    src={`${import.meta.env.BASE_URL}${project.video.replace(/^\//, "")}`}
                                    type="video/mp4"
                                  />
                                </video>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            }}
          </Scene>
        </Suspense>
      )}
    </>
  );
});

export default ProjectsPanel;
