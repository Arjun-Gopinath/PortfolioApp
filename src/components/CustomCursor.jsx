import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const RING_SPRING = { stiffness: 300, damping: 30, mass: 0.4 };
const DOT_SPRING = { stiffness: 800, damping: 40, mass: 0.2 };

// A decorative cursor-follower ring + dot — the native OS cursor stays
// visible throughout, this is an additive layer only. Desktop fine-pointer
// only, off entirely under reduced motion.
const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, RING_SPRING);
  const ringY = useSpring(y, RING_SPRING);
  const dotX = useSpring(x, DOT_SPRING);
  const dotY = useSpring(y, DOT_SPRING);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      setHovering(!!e.target.closest?.("a, button, [role='group'], input, textarea"));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[300] rounded-full border border-white mix-blend-difference pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translate: "-50% -50%",
          width: hovering ? 48 : 26,
          height: hovering ? 48 : 26,
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[300] rounded-full bg-white mix-blend-difference pointer-events-none"
        style={{ x: dotX, y: dotY, translate: "-50% -50%", width: 6, height: 6 }}
      />
    </>
  );
};

export default CustomCursor;
