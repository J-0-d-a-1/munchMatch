import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

import useFavorites from "../hooks/useFavorites";

function MatchedModal(props) {
  const { handleCloseModal, dish, currentUser } = props;

  const [restaurant, setRestaurant] = useState(null);
  const navigation = useNavigate();

  const { favoriteIds, toggleFavorite } = useFavorites(currentUser);

  const isFavorite = favoriteIds.includes(dish.restaurant_id);

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

  const handleFavorite = () => {
    toggleFavorite(dish.restaurant_id);
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
            <Button variant={"success"} onClick={handleFavorite}>
              {isFavorite && "Liked"}
              {!isFavorite && `Like ${restaurant ? restaurant.name : "..."}`}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => handleMenuList(dish.restaurant_id)}
          >
            See menu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MatchedModal;
