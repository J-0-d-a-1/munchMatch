import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function MatchedModal(props) {
  const { handleCloseModal, dish } = props;

  const [restaurant, setRestaurant] = useState(null);

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
          {restaurant ? (
            <p>
              from <span>{restaurant.name}</span>
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
            variant="primary"
            onClick={() => handleMenuList(dish.restaurant_id)}
          >
            See Menu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MatchedModal;
