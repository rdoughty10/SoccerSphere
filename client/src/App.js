import React from "react";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import DashboardContainer from "./components/DashboardContainer";
import NavigBar from "./components/navBar/navBar";
import About from "./pages/about";
import Home from './pages/landing2';

import "./App.scss";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
      <NavigBar />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pages/about' element={<About />} />
          <Route path='/components/DashboardContainer/DashboardContainer' element={<DashboardContainer />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App