import './App.css'
import Top from './pages/Top'
import Home from './pages/Home'
import Answer from './pages/Answer'
import Ranking from './pages/Ranking'
import Card from './pages/Card'
import ProtectedRoute from './components/ProtectedRoute'

import { BrowserRouter, Switch, Routes, Route } from "react-router-dom";

function App() {
  // let intro = 'Learn React'
  return (
      <BrowserRouter>
          <Routes>
            <Route exact path="/" Component={Top}/>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/answer" element={<ProtectedRoute><Answer /></ProtectedRoute>} />
            <Route path="/card" element={<ProtectedRoute><Card /></ProtectedRoute>} />
            <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
