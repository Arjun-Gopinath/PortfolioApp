import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cardHover } from "../motion";

const TILT_SPRING = { stiffness: 300, damping: 25 };
const TILT_RANGE = 10; // max degrees of rotation each way

// Streaming-service "poster" card: title/subtitle/tags stay legible at rest,
// synopsis/bullets/links reveal in a bottom overlay on hover or keyboard
// focus. Used by Projects, Certifications, Experience (full) and Skills
// (compact, icon + name only).
const TitleCard = ({
  title,
  subtitle,
  synopsis,
  bullets,
  tags = [],
  tagClassName = () => "text-teal-300 bg-teal-500/10 border-teal-500/20",
  accent = "from-sky-400 to-blue-500",
  links = [],
  icon,
  compact = false,
  width,
  height,
  className = "",
}) => {
  const reduceMotion = useReducedMotion();
  const cardWidth = width || (compact ? "w-32 sm:w-36" : "w-64 sm:w-72");
  const cardHeight = height || (compact ? "h-24 sm:h-28" : "h-64 sm:h-72");
  const hasOverlay = !compact && (synopsis || (bullets && bullets.length > 0) || links.length > 0);

  // Pointer-tracked 3D tilt — full (non-compact) cards only, off under
  // reduced motion. Springs back to flat on pointer leave.
  const tiltEnabled = !compact && !reduceMotion;
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, TILT_SPRING);
  const springRotateY = useSpring(rotateY, TILT_SPRING);

  const handleTiltMove = (e) => {
    if (!tiltEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * TILT_RANGE);
    rotateX.set(-py * TILT_RANGE);
  };
  const handleTiltLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      variants={reduceMotion ? undefined : cardHover}
      initial="rest"
      whileHover={reduceMotion ? undefined : "active"}
      whileFocus={reduceMotion ? undefined : "active"}
      onPointerMove={handleTiltMove}
      onPointerLeave={handleTiltLeave}
      tabIndex={0}
      role="group"
      aria-label={title}
      style={
        tiltEnabled
          ? { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }
          : undefined
      }
      className={`group relative shrink-0 snap-start ${cardWidth} ${cardHeight} rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] backdrop-blur-lg shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 ${className}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accent}`} aria-hidden="true" />

      {compact ? (
        <div className="p-4 flex flex-col items-center justify-center gap-2 h-full text-center">
          {icon && <span className="text-2xl text-sky-300">{icon}</span>}
          <span className="text-sm font-medium text-white leading-snug">{title}</span>
        </div>
      ) : (
        <div className="p-5 h-full flex flex-col relative">
          {/* Poster rest-state treatment — accent wash + icon watermark, purely
              decorative, sits behind all content. */}
          <div
            className={`absolute inset-0 z-0 bg-gradient-to-br ${accent} opacity-[0.07]`}
            aria-hidden="true"
          />
          {icon && (
            <span
              className="absolute -bottom-3 -right-3 z-0 text-7xl text-white/[0.08] leading-none pointer-events-none"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}

          <div className="relative z-10 flex items-start gap-3 mb-3">
            {icon && <span className="text-2xl text-white/80 shrink-0">{icon}</span>}
            <div className="min-w-0">
              <h4 className="text-lg font-bold text-white leading-snug font-display">
                {title}
              </h4>
              {subtitle && <p className="text-xs text-gray-500 truncate mt-0.5">{subtitle}</p>}
            </div>
          </div>

          {tags.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-1.5">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className={`border px-2 py-0.5 rounded-full text-[10px] ${tagClassName(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {hasOverlay && (
            <div
              className={`titlecard-overlay-scroll absolute inset-x-0 bottom-0 z-20 max-h-[75%] overflow-y-auto bg-gray-950/95 border-t border-white/10 p-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 ${
                reduceMotion ? "" : "translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-[opacity,transform] duration-200"
              }`}
            >
              {synopsis && (
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{synopsis}</p>
              )}

              {bullets && bullets.length > 0 && (
                <ul className="space-y-1.5 mb-3 text-sm text-gray-400 leading-relaxed">
                  {bullets.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-sky-600/30 border border-white/10 hover:border-sky-500/40 px-2.5 py-1 rounded-full text-[11px] text-gray-200 hover:text-white transition-all duration-200"
                    >
                      {link.icon}
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TitleCard;
