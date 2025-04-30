import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditRestaurantModal from "./EditrestaurantModal";
import "../../styles/dashboard.scss";

const RestaurantList = ({
  categories,
  restaurants,
  onDelete,
  onEditClick,
  showEditModal,
  onHideEditModal,
  editingRestaurant,
  onUpdateRestaurant,
  onUpdateDish,
  onAddDish,
  onDeleteDish,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (restaurantToDelete) {
      onDelete(restaurantToDelete.id);
      setShowModal(false);
      setRestaurantToDelete(null);
    }
  };

  return (
    <>
      {restaurants.map((restaurant) => (
        <tr key={restaurant.id}>
          <td>{restaurant.name}</td>
          <td>
            <FaEdit className="icon" onClick={() => onEditClick(restaurant)} />
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
      ))}
      <DeleteConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        restaurantName={restaurantToDelete?.name || ""}
      />
      {editingRestaurant && (
        <EditRestaurantModal
          categories={categories}
          show={showEditModal}
          onHide={onHideEditModal}
          restaurant={editingRestaurant}
          onUpdateRestaurant={onUpdateRestaurant}
          onUpdateDish={onUpdateDish}
          onAddDish={onAddDish}
          onDeleteDish={onDeleteDish}
        />
      )}
    </>
  );
};

export default RestaurantList;
