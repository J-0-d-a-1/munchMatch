import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function MatchedModal(props) {
  const { handleCloseModal, dish, currentUser } = props;

  const [restaurant, setRestaurant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const naviation = useNavigate();

  // fetch the restaurant that has the dish
  useEffect(() => {
    axios
      .get(`/api/restaurants/${dish.restaurant_id}`)
      .then((res) => setRestaurant(res.data))
      .catch((err) => console.error(err));
  }, [dish.restaurant_id]);

  const handleMenuList = (restaurant_id) => {
    naviation(`/restaurants/${restaurant_id}`);
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
          <Button
            variant={!isFavorite ? "outline-success" : "success"}
            onClick={handleFavorite}
          >
            {!isFavorite && `Save ${restaurant ? restaurant.name : "..."}`}
            {isFavorite && "Saved"}
          </Button>
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
