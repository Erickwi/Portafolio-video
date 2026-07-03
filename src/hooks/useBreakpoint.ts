import { useState, useEffect } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: Infinity,
};

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth < breakpoints.tablet) return "mobile";
    return "desktop";
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < breakpoints.mobile) {
        setBreakpoint("mobile");
      } else if (window.innerWidth < breakpoints.tablet) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

export function useIsMobile(): boolean {
  return useBreakpoint() === "mobile";
}

export function useIsTablet(): boolean {
  return useBreakpoint() === "tablet";
}
