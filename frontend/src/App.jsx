import './App.css'

import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("http://localhost:3000/api/restaurants")
      .then(res => console.log("✅ Data from backend:", res.data))
      .catch(err => console.error("❌ Backend connection failed:", err));
  }, []);

  return (
    <div className="App">
      <h1>MunchMatch</h1>
      <p>Testing backend connection in console...</p>
    </div>
  );
}

export default App;
