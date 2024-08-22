import { useNavigate } from "react-router-dom";
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
  { sign: "aries", icon: <GiAries />, ru: "Овен", en: "Aries" },
  { sign: "taurus", icon: <GiTaurus />, ru: "Телец", en: "Taurus" },
  { sign: "gemini", icon: <GiGemini />, ru: "Близнецы", en: "Gemini" },
  { sign: "cancer", icon: <GiCancer />, ru: "Рак", en: "Cancer" },
  { sign: "leo", icon: <GiLeo />, ru: "Лев", en: "Leo" },
  { sign: "virgo", icon: <GiVirgo />, ru: "Дева", en: "Virgo" },
  { sign: "libra", icon: <GiLibra />, ru: "Весы", en: "Libra" },
  { sign: "scorpio", icon: <GiScorpio />, ru: "Скорпион", en: "Scorpio" },
  {
    sign: "sagittarius",
    icon: <GiSagittarius />,
    ru: "Стрелец",
    en: "Sagittarius",
  },
  { sign: "capricorn", icon: <GiCapricorn />, ru: "Козерог", en: "Capricorn" },
  { sign: "aquarius", icon: <GiAquarius />, ru: "Водолей", en: "Aquarius" },
  { sign: "pisces", icon: <GiPisces />, ru: "Рыбы", en: "Pisces" },
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
            {language === "ru" ? zodiac.ru : zodiac.en} | {today} |{" "}
            {zodiac.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
