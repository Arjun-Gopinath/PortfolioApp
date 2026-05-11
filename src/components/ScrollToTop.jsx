import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useScrollPosition } from "../hooks/useScrollPosition";

const ScrollToTop = () => {
  const scrollY = useScrollPosition();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {scrollY > 400 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 w-10 h-10 rounded-full bg-sky-600/80 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg transition-colors duration-200"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
