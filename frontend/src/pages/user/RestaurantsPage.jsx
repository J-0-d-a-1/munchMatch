import axios from "axios";
import { useState, useEffect } from "react";
import Category from "../../components/Category";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RestaurantsPage({
  categories,
  selectedCategory,
  handleCategorySelect,
  onSelectCategory,
}) {
  // GET /api/restaurants/all
  const [allRestaurants, setAllRestaurants] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (restaurant_id) => {
    navigate(`/restaurants/${restaurant_id}`);
  };

  useEffect(() => {
    if (!selectedCategory) {
      // fetching all restaurants
      axios
        .get("/api/restaurants/all")
        .then((res) => {
          setAllRestaurants(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      // fetching selectedCategory restaurants
      axios
        .get(`/api/restaurants/filterby/${selectedCategory}`)
        .then((res) => {
          setAllRestaurants(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCategory]);

  return (
    <>
      <h1>Restaurants page</h1>
      <Category
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />
      <section>
        {allRestaurants.map((restaurant) => {
          return (
            <Card key={restaurant.id} className="fav-card">
              <Card.Img
                variant="top"
                src={restaurant.logo_url}
                style={{ maxHeight: "10rem" }}
              />
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>{restaurant.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleButtonClick(restaurant.id)}
                >
                  See menu
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </section>
    </>
  );
}

export default RestaurantsPage;
