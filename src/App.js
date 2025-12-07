import './App.css'
import Answer from './pages/Answer'
import Correct from './pages/Correct'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/correct" element={<Correct />} />
          <Route path="*" element={<Answer />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
