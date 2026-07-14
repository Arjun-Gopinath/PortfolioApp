import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CINEMATIC_EASE } from "../motion";

const SESSION_KEY = "ag-intro-shown";

// A film "countdown leader": 3 → 2 → 1, then the AG logo projected in.
const LoadingScreen = () => {
  const reduceMotion = useReducedMotion();

  // Session-gate: play the full intro once per session, skip thereafter.
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });
  // "3" | "2" | "1" | "logo"
  const [phase, setPhase] = useState("3");
  const timers = useRef([]);

  useEffect(() => {
    if (done) return;

    const schedule = (fn, ms) => timers.current.push(setTimeout(fn, ms));

    if (reduceMotion) {
      // No countdown for reduced motion — show the logo briefly, then leave.
      setPhase("logo");
      schedule(finish, 700);
    } else {
      schedule(() => setPhase("2"), 450);
      schedule(() => setPhase("1"), 900);
      schedule(() => setPhase("logo"), 1350);
      schedule(finish, 1950);
    }

    // Hard cap so the intro can never trap the page.
    schedule(finish, 3000);

    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setDone(true);
  };

  const isCount = phase === "3" || phase === "2" || phase === "1";

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: CINEMATIC_EASE }}
          className="fixed inset-0 z-[200] bg-gray-950 flex flex-col items-center justify-center gap-10"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {/* Countdown leader ring */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="countdown-ring" />
            {!reduceMotion && <div className="countdown-sweep" />}
            <div className="countdown-cross absolute inset-0" aria-hidden="true" />

            <AnimatePresence mode="wait">
              {isCount ? (
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, scale: 1.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.3, ease: CINEMATIC_EASE }}
                  className="text-gold relative z-10 select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "5rem", lineHeight: 1 }}
                >
                  {phase}
                </motion.span>
              ) : (
                <motion.img
                  key="logo"
                  src="/images/logo.svg"
                  alt="AG"
                  className="w-16 h-16 relative z-10"
                  initial={{ opacity: 0 }}
                  // Brief projector flicker as the logo "hits the screen".
                  animate={{ opacity: reduceMotion ? 1 : [0, 1, 0.5, 1, 0.8, 1] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* Football easter egg — rolls once through the ring on first count. */}
            {!reduceMotion && phase === "3" && (
              <motion.div
                initial={{ x: "-14rem", rotate: 0, opacity: 0 }}
                animate={{ x: "14rem", rotate: 540, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.85, ease: "easeInOut" }}
                className="absolute text-2xl"
                aria-hidden="true"
              >
                ⚽
              </motion.div>
            )}
          </div>

          <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase select-none">
            {phase === "logo" ? "Now Showing" : "Feature Presentation"}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
