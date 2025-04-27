import './App.css'
import TopNavigation from "./components/TopNavigation";
import Footer from "./components/Footer";
import Category from "./components/Category";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

// Page components for regular users
import HomePage from './pages/user/HomePage';
import LoginPage from './pages/user/LoginPage';
import SignupPage from './pages/user/SignupPage';
import UserPage from './pages/user/UserPage';
import RestaurantMenuPage from './pages/user/RestaurantMenuPage';
import FavoritesPage from './pages/user/FavoritesPage';

// Page components for restaurant owners
import OwnerPage from './pages/owner/OwnerPage';
import RestaurantPage from './pages/owner/RestaurantPage';
import DishesPage from './pages/owner/DishesPage';
import DishPage from './pages/owner/DishPage';
import EditDishPage from './pages/owner/EditDishPage';
import AddDishPage from './pages/owner/AddDishPage';

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/restaurants")
      .then((res) => console.log("✅ Data from backend:", res.data))
      .catch((err) => console.error("❌ Backend connection failed:", err));
  }, []);

  return (
    <>
      <div className="App">
        <TopNavigation />
        <Category />
        <h1>MunchMatch</h1>
        <p>Testing backend connection in console...</p>
      </div>

      <Router>
        <Routes>
          {/* Common routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/restaurants/:restaurant_id" element={<RestaurantMenuPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          
          {/* Owner-only routes */}
          <Route path="/user/restaurants" element={<OwnerPage />} />
          <Route path="/user/restaurants/:restaurant_id" element={<RestaurantPage />} />
          <Route path="/user/restaurants/:restaurant_id/dishes" element={<DishesPage />} />
          <Route path="/user/restaurants/:restaurant_id/dishes/:dish_id" element={<DishPage />} />
          <Route path="/user/restaurants/:restaurant_id/dishes/:dish_id/edit" element={<EditDishPage />} />
          <Route path="/user/restaurants/:restaurant_id/dishes/new" element={<AddDishPage/>} />

        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
