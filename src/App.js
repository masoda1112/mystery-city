import logo from './logo.svg';
import './App.css';
import Top from './pages/Top'
import Home from './pages/Home'
import Mysteries from './pages/Mysteries'
import Ranking from './pages/Ranking'
import Cards from './pages/Cards'

import { BrowserRouter, Switch, Routes, Route } from "react-router-dom";

function App() {
  // let intro = 'Learn React'
  return (
      <BrowserRouter>
          <Routes>
            {/* exactをつけると完全一致になります。Homeはexactをつけてあげます */}
            <Route exact path="/" Component={Top}/>
            <Route exact path="/home" Component={Home}/>
            <Route exact path="/mysteries" Component={Mysteries}/>
            <Route exact path="/cards" Component={Cards}/>
            <Route exact path="/ranking" Component={Ranking}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
