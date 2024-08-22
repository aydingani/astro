// import { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";

// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import {
//   GiAries,
//   GiTaurus,
//   GiGemini,
//   GiCancer,
//   GiLeo,
//   GiVirgo,
//   GiLibra,
//   GiScorpio,
//   GiSagittarius,
//   GiCapricorn,
//   GiAquarius,
//   GiPisces,
// } from "react-icons/gi";

// const zodiacSigns = [
//   { sign: "aries", icon: <GiAries />, ru: "Овен", en: "Aries" },
//   { sign: "taurus", icon: <GiTaurus />, ru: "Телец", en: "Taurus" },
//   { sign: "gemini", icon: <GiGemini />, ru: "Близнецы", en: "Gemini" },
//   { sign: "cancer", icon: <GiCancer />, ru: "Рак", en: "Cancer" },
//   { sign: "leo", icon: <GiLeo />, ru: "Лев", en: "Leo" },
//   { sign: "virgo", icon: <GiVirgo />, ru: "Дева", en: "Virgo" },
//   { sign: "libra", icon: <GiLibra />, ru: "Весы", en: "Libra" },
//   { sign: "scorpio", icon: <GiScorpio />, ru: "Скорпион", en: "Scorpio" },
//   {
//     sign: "sagittarius",
//     icon: <GiSagittarius />,
//     ru: "Стрелец",
//     en: "Sagittarius",
//   },
//   { sign: "capricorn", icon: <GiCapricorn />, ru: "Козерог", en: "Capricorn" },
//   { sign: "aquarius", icon: <GiAquarius />, ru: "Водолей", en: "Aquarius" },
//   { sign: "pisces", icon: <GiPisces />, ru: "Рыбы", en: "Pisces" },
// ];

// const detectLanguage = () => {
//   const userLanguage =
//     window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
//   return userLanguage === "ru" ? "ru" : "en";
// };

// const MainPage = () => {
//   const navigate = useNavigate();
//   const language = detectLanguage();
//   const today = new Date().toLocaleDateString(
//     language === "ru" ? "ru-RU" : "en-US",
//     {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }
//   );

//   const handleButtonClick = (sign) => {
//     navigate(`/horoscope/${sign}`);
//   };

//   const buttonText =
//     language === "ru" ? "Гороскоп на сегодня" : "Horoscope for Today";

//   return (
//     <div>
//       <h1>{buttonText}</h1>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//         {zodiacSigns.map((zodiac) => (
//           <button
//             key={zodiac.sign}
//             onClick={() => handleButtonClick(zodiac.sign)}
//             style={{
//               padding: "10px 20px",
//               fontSize: "16px",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             {language === "ru" ? zodiac.ru : zodiac.en} | {today} |{" "}
//             {zodiac.icon}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// const HoroscopePage = () => {
//   const { sign } = useParams();
//   const [response, setResponse] = useState(null);
//   const navigate = useNavigate();
//   const [language, setLanguage] = useState("en");

//   const handlers = useSwipeable({
//     onSwipedRight: () => navigate(-1),
//     trackMouse: true,
//   });

//   useEffect(() => {
//     const detectLanguage = () => {
//       const userLanguage =
//         window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
//       return userLanguage === "ru" ? "ru" : "en";
//     };

//     setLanguage(detectLanguage());

//     if (window.Telegram && window.Telegram.WebApp) {
//       const tg = window.Telegram.WebApp;

//       tg.BackButton.show();

//       tg.BackButton.onClick(() => {
//         navigate(-1);
//       });

//       const getHoroscope = async () => {
//         try {
//           const res = await fetch("https://poker247tech.ru/get_horoscope/", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               sign: sign,
//               language: language === "ru" ? "original" : "translated",
//               period: "today",
//             }),
//           });

//           if (!res.ok) {
//             throw new Error("Network response was not ok");
//           }

//           const data = await res.json();
//           setResponse(data.horoscope || "No horoscope found");
//         } catch (error) {
//           console.error("Error fetching horoscope:", error);
//           setResponse(`Error: ${error.message}`);
//         }
//       };

//       getHoroscope();

//       return () => {
//         tg.BackButton.hide();
//         tg.BackButton.offClick();
//       };
//     } else {
//       console.error("Telegram WebApp SDK is not loaded.");
//     }
//   }, [sign, language, navigate]);

//   return (
//     <div {...handlers} style={{ touchAction: "pan-y" }}>
//       <h1>
//         {sign.charAt(0).toUpperCase() + sign.slice(1)}{" "}
//         {language === "ru" ? "Гороскоп" : "Horoscope"}
//       </h1>
//       {response && <p style={{ marginTop: "20px" }}>{response}</p>}
//     </div>
//   );
// };

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<MainPage />} />
//       <Route path="/horoscope/:sign" element={<HoroscopePage />} />
//     </Routes>
//   </Router>
// );

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import HoroscopePage from "./HoroscopePage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/horoscope/:sign" element={<HoroscopePage />} />
    </Routes>
  </Router>
);

export default App;
