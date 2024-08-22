import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

const HoroscopePage = () => {
  const { sign } = useParams();
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

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
      <h1>
        {sign.charAt(0).toUpperCase() + sign.slice(1)}{" "}
        {language === "ru" ? "Гороскоп" : "Horoscope"}
      </h1>
      {response && <p style={{ marginTop: "20px" }}>{response}</p>}
    </div>
  );
};

export default HoroscopePage;
