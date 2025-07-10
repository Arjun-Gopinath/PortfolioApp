import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-950 to-gray-900 text-white px-4"
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4">{t("hero.title")}</h1>
      <p className="text-xl md:text-2xl max-w-lg">{t("hero.subtitle")}</p>

      <div className="mt-10 animate-bounce">
        <span className="text-sm uppercase tracking-widest">
          {t("hero.scroll")}
        </span>
        <div className="mt-2 w-6 h-6 border-2 border-white rounded-full mx-auto"></div>
      </div>
    </section>
  );
};

export default Hero;
