import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Analyze from "./pages/Analyze/Analyze.jsx";

const App = () => {
  return <Router>
     <Navbar/>
     <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/login" element={<Login />} />
     <Route path="/analyze" element={<Analyze />} />
     </Routes>

  </Router>;
};

export default App;
