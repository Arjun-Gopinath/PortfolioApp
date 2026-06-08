import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const useCountUp = (target, duration = 1200) => {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  const start = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();

    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return [count, start];
};

const stats = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Built", value: 6, suffix: "" },
  { label: "Technologies", value: 30, suffix: "+" },
  { label: "Courses Completed", value: 9, suffix: "" },
];

const StatCard = ({ label, value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, start] = useCountUp(value);

  useEffect(() => {
    if (isInView) start();
  }, [isInView, start]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1.5 py-10 px-4"
    >
      <span className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 tabular-nums">
        {count}
        {suffix}
      </span>
      <span className="text-xs text-gray-500 text-center tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
};

const StatsBar = () => (
  <section
    className="bg-gray-950 border-y border-white/5"
    style={{ fontFamily: "Manrope, sans-serif", borderTop: "1px solid rgba(56,189,248,0.2)" }}
  >
    <div className="max-w-4xl mx-auto px-4 pt-3 pb-0 flex items-center justify-between">
      <span style={{ fontSize: "9px" }} className="uppercase tracking-[0.25em] text-sky-500/50 font-medium">
        ARJUN G ✦ FT 90+3
      </span>
      <span style={{ fontSize: "9px" }} className="uppercase tracking-[0.25em] text-gray-600">
        Career Stats
      </span>
    </div>
    <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  </section>
);

export default StatsBar;
