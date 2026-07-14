import { useScrollPosition } from "../hooks/useScrollPosition";

// Playhead — the "film" scrubs from sky-blue toward amber as it reaches the
// end credits, with a small glowing head at the leading edge.
const ScrollProgress = () => {
  const scrollY = useScrollPosition();
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
      <div
        className="relative h-full"
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      >
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, #38bdf8 0%, #f5b942 100%)",
          }}
        />
        {/* Playhead */}
        <span
          className="absolute top-1/2 right-0 w-2 h-2 rounded-full -translate-y-1/2"
          style={{
            background: "#f5b942",
            boxShadow: "0 0 8px 1px rgba(245,185,66,0.8)",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;
