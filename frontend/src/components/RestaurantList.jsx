import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import "../../styles/dashboard.scss";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const RestaurantList = ({ restaurants, onDelete, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (restaurantToDelete) {
      onDelete(restaurantToDelete.id);
      setShowModal(false);
      setRestaurantToDelete(null);
    }
  };

  const parsedRestaurants = restaurants.map((restaurant) => (
    <section key={restaurant.id} className="list-container">
      <div className="restaurant-link">
        <Link to={`/restaurants/${restaurant.id}`} className="restaurant-link">
          {restaurant.name}
        </Link>
      </div>
      <div className="icons_container">
        <Button variant="warning" onClick={() => onEdit(restaurant.id)}>
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setRestaurantToDelete(restaurant);
            setShowModal(true);
          }}
        >
          Delete
        </Button>
      </div>
    </section>
  ));

  return (
    <>
      {parsedRestaurants}
      <DeleteConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        restaurantName={restaurantToDelete?.name || ""}
      />
    </>
  );
};

export default RestaurantList;
