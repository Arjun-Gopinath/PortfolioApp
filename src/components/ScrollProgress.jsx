import { useScrollPosition } from "../hooks/useScrollPosition";

const ScrollProgress = () => {
  const scrollY = useScrollPosition();
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-sky-400 z-[100]"
      style={{
        width: `${progress}%`,
        boxShadow: "0 0 8px rgba(56,189,248,0.6)",
        transition: "width 0.1s linear",
      }}
    />
  );
};

export default ScrollProgress;
