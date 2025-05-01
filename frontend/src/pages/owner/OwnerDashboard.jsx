import axios from "axios";
import { useState, useEffect } from "react";
import RestaurantList from "../../components/RestaurantList";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const OwnerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
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

  return (
    <>
      <div>
        <h1>User_name Dashboard</h1>
      </div>
      <Button onClick={handleAddRestaurant}>Add Restaurant</Button>
      <table>
        <tbody>
          <RestaurantList
            restaurants={restaurants}
            onDelete={handleDeleteRestaurant}
          />
        </tbody>
      </table>
    </>
  );
};

export default OwnerDashboard;
