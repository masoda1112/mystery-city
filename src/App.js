import './App.css'
import Answer from './pages/Answer'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Answer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
