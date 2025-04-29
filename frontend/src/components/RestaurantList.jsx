const RestaurantList = ({ restaurants }) => {
  const parsedRestaurants = restaurants.map((restaurant) => (
    <p key={restaurant.id}>{restaurant.name}</p>
  ));

  return parsedRestaurants;
};

export default RestaurantList;
