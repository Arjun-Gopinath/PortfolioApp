import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaMotorcycle, FaReact } from "react-icons/fa";
import { SiCrunchyroll } from "react-icons/si";
import { MdSportsSoccer } from "react-icons/md";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-950 to-gray-900 text-white px-4 overflow-hidden"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("hero.title")}</h1>
      <img
        src="images/logo.png"
        alt="AG Logo"
        className="w-8 h-8 md:w-70 md:h-70 object-contain animate-slowspin"
      />
      <p className="text-lg md:text-2xl max-w-xl text-gray-300">
        {t("hero.subtitle")}
      </p>

      <div className="mt-10 animate-bounce">
        <span className="text-sm uppercase tracking-widest text-gray-400">
          {t("hero.scroll")}
        </span>
        <div className="mt-2 w-6 h-6 border-2 border-white rounded-full mx-auto"></div>
      </div>
    </section>
  );
};

export default Hero;
