import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import "../../styles/dashboard.scss";

const RestaurantList = ({ restaurants, onDelete, onEdit, categories }) => {
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
    <tr key={restaurant.id}>
      <td>{restaurant.name}</td>
      <td>
        <FaEdit className="icon" onClick={() => onEdit(restaurant.id)} />
      </td>
      <td>
        <MdDelete
          className="icon"
          onClick={() => {
            setRestaurantToDelete(restaurant);
            setShowModal(true);
          }}
        />
      </td>
    </tr>
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
