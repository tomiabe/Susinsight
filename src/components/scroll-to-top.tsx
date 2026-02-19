"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = Number(process.env.NEXT_PUBLIC_SCROLL_TOP_THRESHOLD || "650");
      setVisible(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 rounded-full bg-brand-dark text-white p-3 hover:bg-brand-primary transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95 group"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
