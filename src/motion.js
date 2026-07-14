// Shared cinematic motion vocabulary.
// One signature easing + a small set of durations/stagger constants so every
// section animates with the same "film" rhythm instead of ad-hoc inline values.

// Signature ease — the same curve already used by the loading-screen exit.
export const CINEMATIC_EASE = [0.76, 0, 0.24, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  cinematic: 0.8,
};

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
};

// A title-card reveal: content rises with a clip-path mask, like a film title.
export const titleCard = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.cinematic, ease: CINEMATIC_EASE },
  },
};

// A staggered container for choreographed reveals.
export const staggerContainer = (stagger = STAGGER.base, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

// A single item inside a staggerContainer.
export const riseItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: CINEMATIC_EASE },
  },
};

// Reduced-motion equivalents: fade only, no travel.
export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base } },
};
