import react from "react"
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";


function App() {

  return(
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eats/stores/search/:keyword" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App
