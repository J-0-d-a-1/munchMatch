import "./App.css";
import TopNavigation from "./components/TopNavigation";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Authorization components
import { AuthProvider } from "./contexts/AuthContext";
import {
  OwnerRoute,
  PrivateRoute,
  PublicOnlyRoute,
} from "./components/authorization/ProtectedRoutes";

// Page components for regular users
import HomePage from "./pages/user/HomePage";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import UserPage from "./pages/user/UserPage";
import RestaurantMenuPage from "./pages/user/RestaurantMenuPage";
import FavoritesPage from "./pages/user/FavoritesPage";
import RestaurantsPage from "./pages/user/RestaurantsPage";

// Page components for restaurant owners
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import NewRestaurantPage from "./pages/owner/NewRestaurantPage";

function App() {
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurant, setRestaurant] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // get current user
  useEffect(() => {
    axios
      .get("api/sessions/current", { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data.user);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <TopNavigation />

          <div className="flex-grow-1">
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <HomePage
                    currentUser={currentUser}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    handleCategorySelect={handleCategorySelect}
                  />
                }
              />
              <Route
                path="/restaurants"
                element={
                  <RestaurantsPage
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    handleCategorySelect={handleCategorySelect}
                  />
                }
              />
              <Route
                path="/restaurants/:restaurant_id"
                element={
                  <RestaurantMenuPage
                    restaurant={restaurant}
                    setRestaurant={setRestaurant}
                  />
                }
              />

              {/* Auth routes - only accessible when NOT logged in */}
              <Route
                path="/login"
                element={
                  <PublicOnlyRoute>
                    <LoginPage />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicOnlyRoute>
                    <SignupPage />
                  </PublicOnlyRoute>
                }
              />

              {/* Protected routes - require login */}
              <Route
                path="/user"
                element={
                  <PrivateRoute>
                    <UserPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <PrivateRoute>
                    <FavoritesPage currentUser={currentUser} />
                  </PrivateRoute>
                }
              />

              {/* Owner-only routes */}
              <Route
                path="/user/restaurants"
                element={
                  <OwnerRoute>
                    <OwnerDashboard categories={categories} />
                  </OwnerRoute>
                }
              />
              <Route
                path="/user/restaurants/new"
                element={
                  <OwnerRoute>
                    <NewRestaurantPage categories={categories} />
                  </OwnerRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
