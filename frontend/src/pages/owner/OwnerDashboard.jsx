import axios from "axios";
import React, { useState, useEffect } from "react";
import RestaurantList from "../../components/RestaurantList";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const OwnerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  // const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [editingRestaurantId, setEditingRestaurantId] = useState(null);
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

  const handleCreateRestaurant = async (newRestaurantData) => {
    try {
      const response = await axios.post("/api/restaurants", newRestaurantData);
      setRestaurants([...restaurants, response.data]);
      setShowRestaurantForm(false);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  const handleUpdateRestaurant = async (id, updatedRestaurantData) => {
    try {
      const response = await axios.put(
        `/api/restaurants/${id}`,
        updatedRestaurantData
      );
      setRestaurants(
        restaurants.map((restaurant) =>
          restaurant.id === id
            ? { ...restaurant, ...response.data }
            : restaurant
        )
      );
      setEditingRestaurantId(null);
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`/api/restaurants/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
      setSelectedRestaurantId(null);
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleSelectRestaurant = (id) => {
    setSelectedRestaurantId(id);
  };

  const selectedRestaurant = restaurants.find(
    (r) => r.id === selectedRestaurantId
  );

  const handleAddRestaurant = () => navigate("/user/restaurants/new");

  return (
    <>
      <div>
        <h1>User_name Dashboard</h1>
      </div>
      <Button onClick={handleAddRestaurant}>Add Restaurant</Button>
      <table>
        <tbody>
          <RestaurantList restaurants={restaurants} />
        </tbody>
      </table>
    </>
  );
};

export default OwnerDashboard;
