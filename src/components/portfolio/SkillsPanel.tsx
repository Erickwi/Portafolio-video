import { useRef, useEffect } from "react";

interface Props {
  skills: string[];
  marqueeItems?: string[];
}

export function SkillsPanel({ skills, marqueeItems }: Props) {
  const ticker = marqueeItems ?? skills;
  const items = [...ticker, ...ticker, ...ticker, ...ticker];

  return (
    <>
      {ticker.length > 0 && (
        <div style={{
          borderTop: "0.5px solid rgba(255,255,255,0.08)",
          borderBottom: "0.5px solid rgba(255,255,255,0.08)",
          padding: "20px 0",
        }}>
          <MarqueeAuto speed={30}>
            {items.map((item, i) => (
              <span key={i} style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                marginRight: 24,
              }}>
                {item}
              </span>
            ))}
          </MarqueeAuto>
        </div>
      )}
    </>
  );
}

function MarqueeAuto({ speed = 30, children }: { speed?: number; children: React.ReactNode }) {
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

export default SkillsPanel;
