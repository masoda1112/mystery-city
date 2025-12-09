import './App.css'
import Answer from './pages/Answer'
import Correct from './pages/Correct'
import About from './pages/About'
import HowTo from './pages/HowTo'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 説明ページ */}
        <Route path="/about" element={<About />} />
        <Route path="/howto" element={<HowTo />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* 正解ページ */}
        <Route path="/correct" element={<Correct />} />

        {/* すべての問題URL → Answerに飛ばす */}
        <Route path="*" element={<Answer />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
