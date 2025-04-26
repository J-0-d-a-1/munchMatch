import TopNavigation from "./components/TopNavigation";

import axios from "axios";

import { useEffect } from "react";

import "./App.css";
import Footer from "./components/Footer";
import Category from "./components/Category";
import MenuCard from "./components/MenuCard";

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
      <Category />
      <h1>MunchMatch</h1>
      <MenuCard />
      <Footer />
    </div>
  );
}

export default App;
