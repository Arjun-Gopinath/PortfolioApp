import { useTranslation } from "react-i18next";

// Cinematic chapter overline — "ACT I", "ACT II", … in the amber accent.
// Cosmetic only; the label text is localized via footer/act keys.
const ActLabel = ({ act, className = "" }) => {
  const { t } = useTranslation();
  const word = t("act.label"); // "ACT" / "ACTO" / "ACTE"

  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-gold/80 font-semibold ${className}`}
      aria-hidden="true"
    >
      <span className="w-4 h-px bg-gold/50" />
      {word} {act}
    </span>
  );
};

export default ActLabel;
