import { memo, useRef, useEffect } from "react";

interface Props {
  icons?: string[];
  height?: number;
}

export const TechMarquee = memo(function TechMarquee({ icons, height = 56 }: Props) {
  const defaultIcons = icons ?? [
    "Edición Vertical", "Sony Vegas", "DaVinci Resolve", "CapCut",
  ];
  const items = [...defaultIcons, ...defaultIcons, ...defaultIcons, ...defaultIcons];

  return (
    <div
      style={{
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        padding: "18px 0",
        paddingBottom: 98,
      }}>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <h4 style={{ margin: 0, color: "#ffffff", fontSize: "2.125rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.95, fontWeight: 600 }}>
          Herramientas
        </h4>
      </div>
      <MarqueeAuto speed={40}>
        {items.map((name, i) => (
          <span
            key={i}
            style={{
              height,
              lineHeight: `${height}px`,
              marginRight: 32,
              display: "inline-block",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
              letterSpacing: "0.05em",
            }}>
            {name}
          </span>
        ))}
      </MarqueeAuto>
    </div>
  );
});

function MarqueeAuto({ speed = 40, children }: { speed?: number; children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const half = el.scrollWidth / 2;
    const duration = half / speed;

    const anim = el.animate(
      [
        { transform: "translateX(0)" },
        { transform: `translateX(-${half}px)` },
      ],
      { duration: duration * 1000, iterations: Infinity, easing: "linear" }
    );
    animRef.current = anim;

    return () => anim.cancel();
  }, [speed]);

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{ display: "flex", width: "max-content" }}>
        {children}
      </div>
    </div>
  );
}

export default TechMarquee;
