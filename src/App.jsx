import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Analyze from "./pages/Analyze/Analyze.jsx";
import Results from "./pages/Results/Results.jsx";
import Demographics from "./pages/Demographics/Demographics.jsx";
import Camera from "./pages/Camera/Camera.jsx";

const App = () => {
  return <Router>
     <Navbar/>
     <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/login" element={<Login />} />
     <Route path="/analyze" element={<Analyze />} />
     <Route path="results" element={<Results />} />
     <Route path="/demographics" element={<Demographics />} />
     <Route path="camera" element={<Camera />} />
     </Routes>

  </Router>;
};

export default App;
