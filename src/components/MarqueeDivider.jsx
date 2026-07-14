const MarqueeDivider = ({ items, direction = "left", className = "" }) => {
  const track = items.join(" ✦ ") + " ✦ ";
  const doubled = track + track;

  return (
    <div
      className={`w-full overflow-hidden border-y border-white/8 bg-gray-950 ${className}`}
      aria-hidden="true"
    >
      {/* Theater marquee bulbs — chase shimmer along the top edge */}
      <div className="marquee-bulbs" />

      <div className="py-2.5">
        <div
          className={`flex whitespace-nowrap ${
            direction === "right" ? "animate-marquee-reverse" : "animate-marquee"
          }`}
        >
          <span className="text-[10px] uppercase tracking-[0.18em] text-sky-400/60 font-medium select-none">
            {doubled}
          </span>
        </div>
      </div>

      {/* Bulbs along the bottom edge */}
      <div className="marquee-bulbs" />
    </div>
  );
};

export default MarqueeDivider;
