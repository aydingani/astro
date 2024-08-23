export const getLanguage = () => {
  const storedLanguage = localStorage.getItem("language");
  if (storedLanguage) {
    return storedLanguage;
  }
  const userLanguage =
    window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
  return userLanguage === "ru" ? "ru" : "en";
};

export const setLanguage = (lang) => {
  localStorage.setItem("language", lang);
};
