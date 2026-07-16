import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const PULL_SPRING = { stiffness: 150, damping: 15, mass: 0.2 };

// Wraps a button/link so it pulls toward the cursor within its bounds,
// then springs back on leave — desktop, fine-pointer only.
const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isFinePointer =
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, PULL_SPRING);
  const springY = useSpring(y, PULL_SPRING);

  if (reduceMotion || !isFinePointer) {
    return <span className={className}>{children}</span>;
  }

  const handlePointerMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

export default Magnetic;
