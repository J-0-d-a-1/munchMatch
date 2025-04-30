import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const RestaurantList = ({ restaurants }) => {
  const parsedRestaurants = restaurants.map((restaurant) => (
    <>
      <tr key={restaurant.id}>
        <td>{restaurant.name}</td>
        <td>
          <FaEdit />
        </td>
        <td>
          <MdDelete />
        </td>
      </tr>
    </>
  ));

  return parsedRestaurants;
};

export default RestaurantList;
