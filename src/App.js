import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import { UserInfo } from "./pages/userInfo";
import { NutritionBreakdown } from "./pages/nutritionBreakdown";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/nutritionBreakdown" element={<NutritionBreakdown />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
