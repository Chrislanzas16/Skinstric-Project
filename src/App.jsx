import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";

const App = () => {
  return <Router>
     <Navbar/>
     <Routes>
     <Route path="/" element={<Home />} />
     </Routes>

  </Router>;
};

export default App;
