import axios from "axios";
import { useState, useEffect } from "react";
import RestaurantList from "../../components/RestaurantList";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const OwnerDashboard = ({ categories }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleAddRestaurant = () => navigate("/user/restaurants/new");

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

  const handleEditClick = (restaurant) => {
    setEditingRestaurant(restaurant);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingRestaurant(null);
  };

  const handleUpdateRestaurant = async (restaurant_id, updatedData) => {
    try {
      const response = await axios.put(
        `/api/restaurants/${restaurant_id}`,
        updatedData
      );
      setRestaurants((prev) =>
        prev.map((restaurant) =>
          restaurant.id === restaurant_id
            ? { ...restaurant, ...response.data }
            : restaurant
        )
      );
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const handleUpdateDish = async (dish_id, updatedDish) => {
    try {
      await axios.put(`/api/dishes/${dish_id}`, updatedDish);
    } catch (error) {
      console.error("Error updating dish:", error);
    }
  };

  const handleAddDish = async (restaurant_id, newDish) => {
    try {
      await axios.post(`/api/restaurants/${restaurant_id}/dishes`, newDish);
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };

  const handleDeleteDish = async (dish_id) => {
    try {
      await axios.delete(`/api/dishes/${dish_id}`);
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  return (
    <>
      <div>
        <h1>User_name Dashboard</h1>
      </div>
      <Button onClick={handleAddRestaurant}>Add Restaurant</Button>
      <table>
        <tbody>
          <RestaurantList
            categories={categories}
            restaurants={restaurants}
            onDelete={handleDeleteRestaurant}
            onEditClick={handleEditClick}
            showEditModal={showEditModal}
            onHideEditModal={handleCloseEditModal}
            editingRestaurant={editingRestaurant}
            onUpdateRestaurant={handleUpdateRestaurant}
            onUpdateDish={handleUpdateDish}
            onAddDish={handleAddDish}
            onDeleteDish={handleDeleteDish}
          />
        </tbody>
      </table>
    </>
  );
};

export default OwnerDashboard;
