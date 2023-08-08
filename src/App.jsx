import "./App.css";
import Home from "./Components/Pages/Home/Home";
import Header from "./Components/Semantic Comps/Header";
import Navbar from "./Components/Semantic Comps/Navbar";

function App() {
  return (
    <>
      <Header />
      <main>
        <Navbar />
        <Home />
      </main>
    </>
  );
}

export default App;
