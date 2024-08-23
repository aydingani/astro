import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { getLanguage } from "./utils/languageUtils";

const zodiacSigns = {
  aries: { ru: "Овен", en: "Aries" },
  taurus: { ru: "Телец", en: "Taurus" },
  gemini: { ru: "Близнецы", en: "Gemini" },
  cancer: { ru: "Рак", en: "Cancer" },
  leo: { ru: "Лев", en: "Leo" },
  virgo: { ru: "Дева", en: "Virgo" },
  libra: { ru: "Весы", en: "Libra" },
  scorpio: { ru: "Скорпион", en: "Scorpio" },
  sagittarius: { ru: "Стрелец", en: "Sagittarius" },
  capricorn: { ru: "Козерог", en: "Capricorn" },
  aquarius: { ru: "Водолей", en: "Aquarius" },
  pisces: { ru: "Рыбы", en: "Pisces" },
};

const HoroscopePage = () => {
  const { sign } = useParams();
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getLanguage());

  const handlers = useSwipeable({
    onSwipedRight: () => navigate(-1),
    trackMouse: true,
  });

  useEffect(() => {
    const detectLanguage = () => {
      const userLanguage =
        window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
      return userLanguage === "ru" ? "ru" : "en";
    };

    setLanguage(detectLanguage());

    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.BackButton.show();

      tg.BackButton.onClick(() => {
        navigate(-1);
      });

      const getHoroscope = async () => {
        try {
          const res = await fetch("https://poker247tech.ru/get_horoscope/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sign: sign,
              language: language === "ru" ? "original" : "translated",
              period: "today",
            }),
          });

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await res.json();
          setResponse(data.horoscope || "No horoscope found");
        } catch (error) {
          console.error("Error fetching horoscope:", error);
          setResponse(`Error: ${error.message}`);
        }
      };

      getHoroscope();

      return () => {
        tg.BackButton.hide();
        tg.BackButton.offClick();
      };
    } else {
      console.error("Telegram WebApp SDK is not loaded.");
    }
  }, [sign, language, navigate]);

  return (
    <div {...handlers} style={{ touchAction: "pan-y" }}>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        {language === "ru" ? zodiacSigns[sign]?.ru : zodiacSigns[sign]?.en}{" "}
        {language === "ru" ? "Гороскоп" : "Horoscope"}
      </h1>
      {response && (
        <h4
          style={{
            marginTop: "20px",
            textAlign: "center",
            width: "85%",
            margin: "0 auto",
          }}
        >
          {response}
        </h4>
      )}
    </div>
  );
};

export default HoroscopePage;
