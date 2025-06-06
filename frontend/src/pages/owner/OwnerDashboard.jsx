import axios from "axios";
import { useState, useEffect } from "react";
import RestaurantList from "../../components/RestaurantList";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import EditRestaurantModal from "../../components/EditRestaurantModal";
import "../../../styles/dashboard.scss";

const OwnerDashboard = ({ categories }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/api/restaurants");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleDeleteRestaurant = async (restaurant_id) => {
    try {
      await axios.delete(`/api/restaurants/${restaurant_id}`);
      setRestaurants(
        restaurants.filter((restaurant) => restaurant.id !== restaurant_id)
      );
      setSelectedRestaurantId(null);
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleAddRestaurant = () => navigate("/user/restaurants/new");

  const handleEditRestaurant = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedRestaurantId(null);
  };

  const handleRestaurantUpdated = (updatedRestaurant) => {
    // Update the restaurants state with the updated restaurant
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
      )
    );
  };

  const handleDishesUpdated = (updatedDishes) => {
    console.log("Dishes updated:", updatedDishes);
  };

  return (
    <>
      <div className="dashboard-container">
        <h1>My Restaurants</h1>
        <Button onClick={handleAddRestaurant}>Add Restaurant</Button>
        <div className="restaurants-container">
          <RestaurantList
            restaurants={restaurants}
            onDelete={handleDeleteRestaurant}
            onEdit={handleEditRestaurant}
          />
        </div>
        <EditRestaurantModal
          show={showEditModal}
          onHide={handleCloseEditModal}
          restaurantIdToEdit={selectedRestaurantId}
          categories={categories} //to display categories in drop down menu
          onRestaurantUpdated={handleRestaurantUpdated}
          onDishesUpdated={handleDishesUpdated}
        />
      </div>
    </>
  );
};

export default OwnerDashboard;
