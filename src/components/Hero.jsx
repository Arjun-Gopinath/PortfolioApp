import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const backgroundImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000); // switch every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center px-4 py-12 bg-center bg-cover bg-gradient-to-b from-gray-950 to-gray-900 duration-1000"
    >
      {/* Overlay for readability */}
      <div className="absolute inset-6 rounded-2xl z-0" />

      {/* Main content inside the padded, rounded container */}
      <div className="relative z-10 p-8 md:p-16 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl max-w-3xl">
        <img
          src="images/logo.png"
          alt="AG Logo"
          className="w-50 h-50 md:w-80 md:h-80 object-contain animate-slowspin mx-auto mb-4"
        />

        <p className="text-lg md:text-2xl text-gray-200">
          {t("hero.subtitle")}
        </p>

        <div className="mt-10 animate-bounce">
          <span className="text-sm uppercase tracking-widest text-gray-300">
            {t("hero.scroll")}
          </span>
          <div className="mt-2 w-6 h-6 border-2 border-white rounded-full mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
