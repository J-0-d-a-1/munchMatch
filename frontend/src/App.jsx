import TopNavigation from "./components/TopNavigation";

import axios from "axios";

import { useEffect } from "react";

import "./App.css";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/restaurants")
      .then((res) => console.log("✅ Data from backend:", res.data))
      .catch((err) => console.error("❌ Backend connection failed:", err));
  }, []);

  return (
    <div className="App">
      <TopNavigation />
      <h1>MunchMatch</h1>
      <p>Testing backend connection in console...</p>
      <Footer />
    </div>
  );
}

export default App;
