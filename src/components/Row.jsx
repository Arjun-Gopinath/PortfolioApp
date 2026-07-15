import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { titleCard, fadeOnly } from "../motion";

// A horizontally-scrollable "row" — the core streaming-catalog browsing
// primitive. Native CSS scroll-snap drives touch/trackpad scrolling; the
// chevrons are the explicit affordance for mouse/keyboard users.
const Row = ({ title, accent = "bg-sky-400", ariaLabel, children, className = "" }) => {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const reduceMotion = useReducedMotion();

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [children]);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 640) * dir;
    el.scrollBy({ left: amount, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={reduceMotion ? fadeOnly : titleCard}
      className={`relative ${className}`}
    >
      <div className="flex items-center justify-between gap-4 mb-4 px-1">
        <div className="flex items-center gap-3">
          <span className={`h-0.5 w-6 rounded-full shrink-0 ${accent}`} />
          <h3
            className="text-lg md:text-xl font-bold text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {title}
          </h3>
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            disabled={!canLeft}
            aria-label={`Scroll ${title} row left`}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-gray-400 hover:text-white hover:border-white/30 disabled:opacity-25 disabled:pointer-events-none transition-all duration-200"
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            disabled={!canRight}
            aria-label={`Scroll ${title} row right`}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-gray-400 hover:text-white hover:border-white/30 disabled:opacity-25 disabled:pointer-events-none transition-all duration-200"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="relative">
        {canLeft && <div className="row-fade-left" aria-hidden="true" />}
        {canRight && <div className="row-fade-right" aria-hidden="true" />}
        <div
          ref={scrollerRef}
          role="region"
          aria-label={ariaLabel || title}
          tabIndex={0}
          className="row-scroll flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 rounded-lg"
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Row;
