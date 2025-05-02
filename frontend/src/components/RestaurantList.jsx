import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import "../../styles/dashboard.scss";
import { Link } from "react-router-dom";

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
        <FaEdit className="icon" onClick={() => onEdit(restaurant.id)} />
        <MdDelete
          className="icon"
          onClick={() => {
            setRestaurantToDelete(restaurant);
            setShowModal(true);
          }}
        />
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
