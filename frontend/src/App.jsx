import "./App.css";
import TopNavigation from "./components/TopNavigation";
import Footer from "./components/Footer";
import Category from "./components/Category";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Page components for regular users
import HomePage from "./pages/user/HomePage";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import UserPage from "./pages/user/UserPage";
import RestaurantMenuPage from "./pages/user/RestaurantMenuPage";
import FavoritesPage from "./pages/user/FavoritesPage";

// Page components for restaurant owners
import OwnerPage from "./pages/owner/OwnerPage";
import RestaurantPage from "./pages/owner/RestaurantPage";
import DishPage from "./pages/owner/DishPage";
import NewRestaurantPage from "./pages/owner/NewRestaurantPage";
import EditRestaurantPage from "./pages/owner/EditRestaurantPage";

function App() {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/restaurants")
  //     .then((res) => console.log("✅ Data from backend:", res.data))
  //     .catch((err) => console.error("❌ Backend connection failed:", err));
  // }, []);

  // Save current user login info
  const [user, setUser] = useState(null);
  // Check session when app loads
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/sessions/current", {
          withCredentials: true,
        });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };
    checkSession();
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <TopNavigation user={user} setUser={setUser} />
          <Category />
          <h1>MunchMatch</h1>
          <p>Testing backend connection in console...</p>
        </div>
        <Routes>
          {/* Common routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage user={user} setUser={setUser} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route
            path="/restaurants/:restaurant_id"
            element={<RestaurantMenuPage />}
          />
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* Owner-only routes */}
          <Route path="/user/restaurants" element={<OwnerPage />} />
          <Route
            path="/user/restaurants/:restaurant_id"
            element={<RestaurantPage />}
          />

          <Route
            path="/user/restaurants/:restaurant_id/dishes/:dish_id"
            element={<DishPage />}
          />

          <Route path="/user/restaurants/new" element={<NewRestaurantPage />} />

          <Route
            path="/user/restaurants/:restaurant_id/edit"
            element={<EditRestaurantPage />}
          />
        </Routes>
      </Router>
      {/* <Footer /> */}
    </>
  );
}

export default App;
