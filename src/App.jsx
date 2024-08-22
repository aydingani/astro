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
