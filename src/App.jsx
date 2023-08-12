import { useEffect } from "react";
import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Video from "./Components/Pages/Video/Video";
import Header from "./Components/Semantic Comps/Header";
import Navbar from "./Components/Semantic Comps/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import { setMenu } from "../redux/Slice";

function App() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setMenu(true);
      return;
    }
  }, []);
  return (
    <>
      <Header />
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
