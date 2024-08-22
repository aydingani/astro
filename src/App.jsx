import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  GiAries,
  GiTaurus,
  GiGemini,
  GiCancer,
  GiLeo,
  GiVirgo,
  GiLibra,
  GiScorpio,
  GiSagittarius,
  GiCapricorn,
  GiAquarius,
  GiPisces,
} from "react-icons/gi";

const zodiacSigns = [
  { sign: "aries", icon: <GiAries /> },
  { sign: "taurus", icon: <GiTaurus /> },
  { sign: "gemini", icon: <GiGemini /> },
  { sign: "cancer", icon: <GiCancer /> },
  { sign: "leo", icon: <GiLeo /> },
  { sign: "virgo", icon: <GiVirgo /> },
  { sign: "libra", icon: <GiLibra /> },
  { sign: "scorpio", icon: <GiScorpio /> },
  { sign: "sagittarius", icon: <GiSagittarius /> },
  { sign: "capricorn", icon: <GiCapricorn /> },
  { sign: "aquarius", icon: <GiAquarius /> },
  { sign: "pisces", icon: <GiPisces /> },
];

const detectLanguage = () => {
  const userLanguage =
    window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
  return userLanguage === "ru" ? "ru" : "en";
};

const MainPage = () => {
  const navigate = useNavigate();
  const language = detectLanguage();
  const today = new Date().toLocaleDateString(
    language === "ru" ? "ru-RU" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleButtonClick = (sign) => {
    navigate(`/horoscope/${sign}`);
  };

  const buttonText =
    language === "ru" ? "Гороскоп на сегодня" : "Horoscope for Today";

  return (
    <div>
      <h1>{buttonText}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {zodiacSigns.map((zodiac) => (
          <button
            key={zodiac.sign}
            onClick={() => handleButtonClick(zodiac.sign)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {zodiac.sign.charAt(0).toUpperCase() + zodiac.sign.slice(1)} |{" "}
            {today} |{zodiac.icon}{" "}
          </button>
        ))}
      </div>
    </div>
  );
};

const HoroscopePage = () => {
  const { sign } = useParams();
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

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

      // Set up the back button event listener
      tg.BackButton.onClick(() => {
        navigate(-1); // Navigate back to the previous page
      });

      // Fetch horoscope
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
        tg.BackButton.hide(); // Hide the back button when component unmounts
        tg.BackButton.offClick(); // Remove the click event listener
      };
    } else {
      console.error("Telegram WebApp SDK is not loaded.");
    }
  }, [sign, language, navigate]);

  return (
    <div>
      {/* <button
        onClick={() => navigate(-1)}
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        {language === "ru" ? "Назад" : "Back"}
      </button> */}
      <h1>
        {sign.charAt(0).toUpperCase() + sign.slice(1)}{" "}
        {language === "ru" ? "Гороскоп" : "Horoscope"}
      </h1>
      {response && <p style={{ marginTop: "20px" }}>{response}</p>}
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/horoscope/:sign" element={<HoroscopePage />} />
    </Routes>
  </Router>
);

export default App;
