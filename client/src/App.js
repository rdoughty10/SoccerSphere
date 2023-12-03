import React from "react";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import DashboardContainer from "./components/EventDashboard/DashboardContainer";
import TeamsDashboardContainer from "./components/TeamsDashboard/TeamsDashboardContainer";
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
          <Route path='/components/EventDashboard/DashboardContainer/DashboardContainer' element={<DashboardContainer />} />
          <Route path='/components/TeamsDashboard/TeamsDashboardContainer/TeamsDashboardContainer' element={<TeamsDashboardContainer />} />

      </Routes>
    </Router>
    </div>
  )
}

export default App