import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

// Page components for regular users
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CurrentUserPage from './pages/CurrentUserPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import FavoritesPage from './pages/FavoritesPage';

// Page components for restaurant owners
import OwnerPage from './pages/OwnerPage';
import RestaurantPage from './pages/RestaurantPage';
import DishesPage from './pages/DishesPage';
import DishPage from './pages/DishPage';
import EditDishPage from './pages/EditDishPage';
import AddDishPage from './pages/AddDishPage';


function App() {
  useEffect(() => {
    axios.get("http://localhost:3000/api/restaurants")
      .then(res => console.log("✅ Data from backend:", res.data))
      .catch(err => console.error("❌ Backend connection failed:", err));
  }, []);

  return (
    <>
      <div className="App">
        <h1>MunchMatch</h1>
        <p>Testing backend connection in console...</p>
      </div>

      <Router>
        <Routes>
          {/* Common routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/current_user" element={<CurrentUserPage />} />
          <Route path="/restaurants/:restaurant_id" element={<RestaurantMenuPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          
          {/* Owner-only routes */}
          <Route path="/owner/restaurants" element={<OwnerPage />} />
          <Route path="/owner/restaurants/:restaurant_id" element={<RestaurantPage />} />
          <Route path="/owner/restaurants/:restaurant_id/dishes" element={<DishesPage />} />
          <Route path="/owner/restaurants/:restaurant_id/dishes/:dish_id" element={<DishPage />} />
          <Route path="/owner/restaurants/:restaurant_id/dishes/:dish_id/edit" element={<EditDishPage />} />
          <Route path="/owner/restaurants/:restaurant_id/dishes/new" element={<AddDishPage/>} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
