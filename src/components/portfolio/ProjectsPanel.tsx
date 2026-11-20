import { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectVideo } from "../../data/projects";
import { useIsMobile } from "../../hooks/useBreakpoint";
import "./ProjectsPanel.css";

const Scene = lazy(() => import("react-kino").then((m) => ({ default: m.Scene })));

interface Project {
  title: string;
  description: string;
  image?: string;
  video?: string;
  videos?: ProjectVideo[];
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

function getProjectVideos(project: Project): ProjectVideo[] {
  if (project.videos && project.videos.length > 0) return project.videos;
  if (project.video) return [{ src: project.video }];
  return [];
}

function getPublicUrl(src: string): string {
  const clean = src.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${encodeURI(clean)}`;
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "";
  const total = Math.round(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function TikTokEmbed({ url, compact = false }: { url: string; compact?: boolean }) {
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
        padding: compact ? "7px 12px" : "10px 18px",
        color: "rgba(255,255,255,0.8)",
        fontSize: compact ? "0.78rem" : "0.85rem",
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

function VideoThumb({
  video,
  accentColor,
  active,
  compact = false,
  onOpen,
}: {
  video: ProjectVideo;
  accentColor: string;
  active: boolean;
  compact?: boolean;
  onOpen: (video: ProjectVideo) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [duration, setDuration] = useState("");
  const src = getPublicUrl(video.src);

  const play = () => {
    setHovered(true);
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    void el.play().catch(() => {});
  };

  const stop = () => {
    setHovered(false);
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 1;
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      aria-label={`Reproducir ${video.label ?? "video"}`}
      style={{
        position: "relative",
        flex: "0 0 auto",
        height: compact ? "148px" : "clamp(156px, 26vh, 218px)",
        aspectRatio: "9 / 16",
        padding: 0,
        border: `1px solid ${hovered ? `${accentColor}99` : "rgba(255,255,255,0.12)"}`,
        borderRadius: 12,
        overflow: "hidden",
        background: "#111",
        cursor: "pointer",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 10px 30px ${accentColor}26` : "0 6px 18px rgba(0,0,0,0.35)",
        scrollSnapAlign: "start",
      }}>
      <video
        ref={videoRef}
        src={active ? src : undefined}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          const el = e.currentTarget;
          setDuration(formatDuration(el.duration));
          el.currentTime = Math.min(1, el.duration / 3);
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />

      <span
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.82) 100%)",
          pointerEvents: "none",
        }}
      />

      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: hovered ? accentColor : "rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0.85,
          transition: "opacity 0.25s, background 0.25s",
          pointerEvents: "none",
        }}>
        <span
          style={{
            width: 0,
            height: 0,
            borderTop: "7px solid transparent",
            borderBottom: "7px solid transparent",
            borderLeft: "11px solid #fff",
            marginLeft: 3,
          }}
        />
      </span>

      {duration && (
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "2px 6px",
            borderRadius: 5,
            background: "rgba(0,0,0,0.65)",
            color: "rgba(255,255,255,0.85)",
            fontSize: "0.65rem",
            fontVariantNumeric: "tabular-nums",
            pointerEvents: "none",
          }}>
          {duration}
        </span>
      )}

      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "10px 9px",
          color: "#fff",
          fontSize: "0.72rem",
          fontWeight: 500,
          lineHeight: 1.25,
          textAlign: "left",
          pointerEvents: "none",
        }}>
        {video.label ?? "Video"}
      </span>
    </button>
  );
}

function VideoRail({
  videos,
  accentColor,
  active,
  compact,
  onOpen,
}: {
  videos: ProjectVideo[];
  accentColor: string;
  active: boolean;
  compact: boolean;
  onOpen: (video: ProjectVideo) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState, videos.length]);

  const scrollRail = (direction: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(180, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const arrowStyle = (side: "left" | "right") => ({
    position: "absolute" as const,
    [side]: -8,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 3,
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(10,10,10,0.9)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#f5f5f7",
    fontSize: "1.35rem",
    lineHeight: 1,
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    boxShadow: "0 4px 14px rgba(0,0,0,0.45)",
  });

  return (
    <div style={{ position: "relative", minWidth: 0 }}>
      <div
        ref={railRef}
        className="video-rail"
        onScroll={updateScrollState}
        style={{
          display: "flex",
          gap: 12,
          width: "100%",
          minWidth: 0,
          overflowX: "auto",
          padding: "4px 2px 10px",
          scrollSnapType: "x proximity",
        }}>
        {videos.map((video, vi) => (
          <VideoThumb
            key={`${video.src}-${vi}`}
            video={video}
            accentColor={accentColor}
            active={active}
            compact={compact}
            onOpen={onOpen}
          />
        ))}
      </div>

      {canScrollLeft && (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 10,
              width: 42,
              background: "linear-gradient(90deg, #0a0a0a 6%, rgba(10,10,10,0))",
              pointerEvents: "none",
              borderRadius: "12px 0 0 12px",
            }}
          />
          <button
            type="button"
            aria-label="Ver videos anteriores"
            onClick={() => scrollRail(-1)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${accentColor}99`;
              e.currentTarget.style.color = accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
              e.currentTarget.style.color = "#f5f5f7";
            }}
            style={arrowStyle("left")}>
            ‹
          </button>
        </>
      )}

      {canScrollRight && (
        <>
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 10,
              width: 42,
              background: "linear-gradient(270deg, #0a0a0a 6%, rgba(10,10,10,0))",
              pointerEvents: "none",
              borderRadius: "0 12px 12px 0",
            }}
          />
          <button
            type="button"
            aria-label="Ver más videos"
            onClick={() => scrollRail(1)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${accentColor}99`;
              e.currentTarget.style.color = accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
              e.currentTarget.style.color = "#f5f5f7";
            }}
            style={arrowStyle("right")}>
            ›
          </button>
        </>
      )}
    </div>
  );
}

function VideoLightbox({
  video,
  accentColor,
  onClose,
}: {
  video: ProjectVideo;
  accentColor: string;
  onClose: () => void;
}) {
  const src = getPublicUrl(video.src);
  const [ratio, setRatio] = useState(9 / 16);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.label ?? "Vista previa del video"}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 4vw, 40px)",
      }}>
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          maxWidth: "100%",
          maxHeight: "100%",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            width: "100%",
            justifyContent: "space-between",
            color: "#f5f5f7",
          }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{video.label ?? "Video"}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              style={{
                color: accentColor,
                fontSize: "0.8rem",
                textDecoration: "none",
                borderBottom: `1px solid ${accentColor}66`,
              }}>
              Abrir video
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar vista previa"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1.1rem",
                lineHeight: 1,
              }}>
              ×
            </button>
          </div>
        </div>

        <video
          key={src}
          src={src}
          controls
          autoPlay
          playsInline
          onLoadedMetadata={(event) => {
            const el = event.currentTarget;
            if (el.videoWidth > 0 && el.videoHeight > 0) {
              setRatio(el.videoWidth / el.videoHeight);
            }
          }}
          style={{
            width: `min(92vw, ${(78 * ratio).toFixed(1)}vh)`,
            aspectRatio: `${ratio}`,
            maxHeight: "78vh",
            objectFit: "contain",
            borderRadius: 12,
            background: "#000",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          }}
        />
      </div>
    </div>,
    document.body,
  );
}

export const ProjectsPanel = memo(function ProjectsPanel({ projects, accentColor = "#e74c3c" }: Props) {
  const [openVideo, setOpenVideo] = useState<ProjectVideo | null>(null);
  const closeVideo = useCallback(() => setOpenVideo(null), []);
  const isMobile = useIsMobile();

  return (
    <>
      {projects.length > 0 && (
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Scene duration={`${Math.max(projects.length * 120, 400)}vh`}>
            {(progress) => {
              const n = projects.length;
              const active = Math.min(n - 1, Math.floor(progress * n));
              const fill = Math.min(100, n > 1 ? ((progress * n) / (n - 1)) * 100 : progress * 100);
              const railHeight = Math.max(300, n * 44);

              return (
                <section
                  id="experience"
                  style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: isMobile
                      ? "88px 18px 24px"
                      : "clamp(180px, 18vh, 260px) clamp(16px, 4vw, 48px) 0",
                    scrollMarginTop: isMobile ? 88 : "clamp(180px, 18vh, 260px)",
                    maxWidth: 1080,
                    margin: "0 auto",
                  }}>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "rgba(255,255,255,0.35)",
                      marginBottom: isMobile ? 16 : 24,
                    }}>
                    Proyectos
                  </p>

                  <div style={{ display: "flex", gap: isMobile ? 0 : "clamp(20px, 4vw, 80px)" }}>
                    <div
                      style={{
                        display: isMobile ? "none" : "block",
                        width: "clamp(100px, 22vw, 200px)",
                        flexShrink: 0,
                        position: "relative",
                      }}>
                      <div
                        style={{
                          position: "absolute",
                          left: "clamp(6px, 1.2vw, 10px)",
                          top: "clamp(6px, 1.2vw, 10px)",
                          height: railHeight - 20,
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
                          height: railHeight,
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

                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        minHeight: 400,
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr)",
                        alignItems: "start",
                      }}>
                      {projects.map((project, i) => {
                        const localVideos = getProjectVideos(project);

                        return (
                          <div
                            key={i}
                            style={{
                              gridArea: "1 / 1 / 2 / 2",
                              minWidth: 0,
                              opacity: i === active ? 1 : 0,
                              transform: `translateY(${i === active ? 0 : i > active ? 24 : -24}px)`,
                              transition: "opacity 0.5s, transform 0.5s",
                              pointerEvents: i === active ? "auto" : "none",
                              visibility: i === active ? "visible" : "hidden",
                            }}>
                            <div style={{ maxWidth: 720 }}>
                              {isMobile && project.year && (
                                <p
                                  style={{
                                    margin: "0 0 6px",
                                    fontSize: "0.72rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.12em",
                                    color: accentColor,
                                  }}>
                                  {project.year}
                                </p>
                              )}
                              <h3
                                style={{
                                  fontSize: isMobile ? "1.45rem" : "clamp(1.5rem, 3vw, 2.25rem)",
                                  fontWeight: 700,
                                  margin: "0 0 10px",
                                  color: "#f5f5f7",
                                  lineHeight: 1.2,
                                }}>
                                {project.title}
                              </h3>
                              <p
                                style={{
                                  fontSize: isMobile ? "0.88rem" : "1rem",
                                  color: "rgba(255,255,255,0.5)",
                                  lineHeight: isMobile ? 1.5 : 1.6,
                                  margin: isMobile ? "0 0 12px" : "0 0 16px",
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
                                    fontSize: isMobile ? "0.82rem" : "0.9rem",
                                    textDecoration: "none",
                                    marginBottom: isMobile ? 10 : 16,
                                  }}>
                                  <i className="fab fa-tiktok" style={{ fontSize: "1.2rem" }} />
                                  <span style={{ borderBottom: `1px solid ${accentColor}40` }}>
                                    {project.tiktokProfile.replace("https://www.tiktok.com/", "")}
                                  </span>
                                </a>
                              )}

                              {project.tiktokVideos && project.tiktokVideos.length > 0 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 8 : 10 }}>
                                  {project.tiktokVideos.map((url, vi) => (
                                    <TikTokEmbed key={vi} url={url} compact={isMobile} />
                                  ))}
                                </div>
                              )}
                            </div>

                            {localVideos.length > 0 && (
                              <div style={{ marginTop: isMobile ? 16 : 28 }}>
                                <p
                                  style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: 8,
                                    margin: "0 0 10px",
                                    fontSize: "0.72rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.16em",
                                    color: "rgba(255,255,255,0.35)",
                                  }}>
                                  Videos
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      minWidth: 18,
                                      height: 18,
                                      padding: "0 5px",
                                      borderRadius: 9,
                                      background: "rgba(255,255,255,0.08)",
                                      color: "rgba(255,255,255,0.5)",
                                      fontSize: "0.62rem",
                                      letterSpacing: 0,
                                    }}>
                                    {localVideos.length}
                                  </span>
                                  {!isMobile && (
                                    <span
                                      style={{
                                        fontSize: "0.66rem",
                                        letterSpacing: "0.04em",
                                        textTransform: "none",
                                        color: "rgba(255,255,255,0.25)",
                                      }}>
                                      Haz clic para ver la vista previa
                                    </span>
                                  )}
                                </p>
                                <VideoRail
                                  videos={localVideos}
                                  accentColor={accentColor}
                                  active={i === active}
                                  compact={isMobile}
                                  onOpen={setOpenVideo}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            }}
          </Scene>
        </Suspense>
      )}

      {openVideo && <VideoLightbox video={openVideo} accentColor={accentColor} onClose={closeVideo} />}
    </>
  );
});

export default ProjectsPanel;
