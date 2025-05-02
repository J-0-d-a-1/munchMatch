import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function MatchedModal(props) {
  const { handleCloseModal, dish, currentUser } = props;

  const [restaurant, setRestaurant] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const navigation = useNavigate();

  // Fetch user's favorite restaurant ids
  useEffect(() => {
    if (!currentUser?.id) return;

    axios
      .get("/api/favorites")
      .then((res) => {
        if (res.length === 0) return;
        const favRestaurantIds = res.data.map((fav) => fav.id);
        setFavoriteIds(favRestaurantIds);
      })
      .catch((err) => console.error("Error fetching favorites:", err))
      .finally(() => setFavoritesLoaded(true));
  }, [currentUser]);

  const isFavorite = favoriteIds.includes(dish.restaurant_id);

  // toggle favorite
  const toggleFavorite = async () => {
    if (!currentUser) {
      alert("Please log in to like this restaurant");
      return;
    }

    if (!favoritesLoaded) {
      alert("Favorites are still loading. Please wait.");
      return;
    }

    const restaurant_id = dish.restaurant_id;

    try {
      if (!isFavorite) {
        // POST /api/favorites
        await axios.post("/api/favorites", {
          restaurant_id,
        });

        setFavoriteIds((prev) => [...prev, restaurant_id]);
      } else {
        // DELETE /api/favorites/:restaurant_id
        await axios.delete(`/api/favorites/${restaurant_id}`);
        setFavoriteIds((prev) => prev.filter((id) => id !== restaurant_id));
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  // fetch the restaurant that has the dish
  useEffect(() => {
    axios
      .get(`/api/restaurants/${dish.restaurant_id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err));
  }, [dish.restaurant_id]);

  // navigate to the menu
  const handleMenuList = (restaurant_id) => {
    navigation(`/restaurants/${restaurant_id}`);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Matched!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Img
            src={dish.photo_url}
            style={{ width: "100%", height: "50vh" }}
          />
          <Modal.Title>{dish.name}</Modal.Title>
          <p>{dish.description}</p>
          {restaurant ? (
            <p>
              <span>{restaurant.name}</span>
            </p>
          ) : (
            <p>Loading restaurant...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
          {currentUser && (
            <Button variant={"success"} onClick={toggleFavorite}>
              {isFavorite && "Liked"}
              {!isFavorite && `Like ${restaurant ? restaurant.name : "..."}`}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => handleMenuList(dish.restaurant_id)}
          >
            More menu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MatchedModal;
