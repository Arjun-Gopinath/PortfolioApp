import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "ag-intro-shown";

const BOOT_LOGS = [
  "BIOS Date 09/13/26 18:42:01 Ver: 08.00.16",
  "CPU: Intel(R) Core(TM) @ 3.20GHz, 8 Cores",
  "Mounting /dev/nvme0n1p2 on /portfolio ... [OK]",
  "Loading user profile: ag-developer ... [OK]",
  "Initializing CLI runtime environment ... [OK]",
  "Starting system terminal daemon ... [DONE]",
];

const LoadingScreen = () => {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "true";
  });

  const [visibleLogs, setVisibleLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const timers = useRef([]);

  const finish = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setDone(true);
  };

  useEffect(() => {
    if (done) return;

    if (reduceMotion) {
      finish();
      return;
    }

    const schedule = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
    };

    // Staggered log lines + progress counter
    BOOT_LOGS.forEach((line, idx) => {
      schedule(() => {
        setVisibleLogs((prev) => [...prev, line]);
        setProgress(Math.round(((idx + 1) / BOOT_LOGS.length) * 100));
      }, idx * 160);
    });

    // Exit transition after boot sequence completes (~1.3s total)
    schedule(finish, BOOT_LOGS.length * 160 + 350);

    // Hard fallback failsafe
    schedule(finish, 2500);

    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-[#030712] text-gray-300 font-mono p-6 sm:p-12 flex flex-col justify-between"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-b border-[#30363d] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-gray-400">system.boot</span>
            </div>
            <span>v2.4.0-release</span>
          </div>

          {/* Console Boot Logs */}
          <div className="max-w-2xl w-full my-auto space-y-2 text-xs sm:text-sm">
            {visibleLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#3fb950] select-none">&gt;</span>
                <span className="text-gray-300">{log}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-[#58a6ff]">
              <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Progress / Status Footer */}
          <div className="border-t border-[#30363d] pt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span>LOADING_CORE_MODULES</span>
              <span className="text-gray-300 font-semibold">{progress}%</span>
            </div>
            <button
              type="button"
              onClick={finish}
              className="text-gray-400 hover:text-white underline cursor-pointer"
            >
              [ESC / Skip]
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
