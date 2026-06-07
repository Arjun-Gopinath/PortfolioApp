import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);
  const capRef = useRef(null);

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();

    const finish = () => {
      setProgress(100);
      setTimeout(() => setDone(true), 350);
    };

    const tick = (now) => {
      const p = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(p);
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    capRef.current = setTimeout(finish, 3000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(capRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-gray-950 flex flex-col items-center justify-center gap-8"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <motion.img
            src="/images/logo.svg"
            alt="AG"
            className="w-14 h-14"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="w-44 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
          </div>

          <p className="text-xs text-gray-600 tracking-widest uppercase select-none">
            {progress < 100 ? "Loading" : "Ready"}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
