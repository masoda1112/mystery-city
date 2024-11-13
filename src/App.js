import './App.css'
import Top from './pages/Top'
import Home from './pages/Home'
import Mysteries from './pages/Mysteries'
import Ranking from './pages/Ranking'
import Cards from './pages/Cards'
import ProtectedRoute from './components/ProtectedRoute'

import { BrowserRouter, Switch, Routes, Route } from "react-router-dom";

function App() {
  // let intro = 'Learn React'
  return (
      <BrowserRouter>
          <Routes>
            <Route exact path="/" Component={Top}/>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/mysteries" element={<ProtectedRoute><Mysteries /></ProtectedRoute>} />
            <Route path="/cards" element={<ProtectedRoute><Cards /></ProtectedRoute>} />
            <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;